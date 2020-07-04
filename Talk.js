import React, { useState, useEffect } from 'react';
import { Keyboard, Platform, ActivityIndicator, StyleSheet, TextInput, Text, Dimensions, View, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { GiftedChat, Bubble, Composer, InputToolbar, Send } from 'react-native-gifted-chat';
import * as userInfoActions from './store/userinfo_action';
import * as colorInfoActions from './store/colors_action';
import { Dialogflow_V2 } from 'react-native-dialogflow-text';
import { dialogflowconfig } from './env';
import HeaderButton from './components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import moment from 'moment';
import { getData, getNews, getNewGiphy, getNewQuote, getWeather } from './apis';

const TalkScreen = props => {
    const userInfo = useSelector(state => state.userInfo.userinfo)
    const colorInfo = useSelector(state => state.colorInfo.colorinfo)
    const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width)
    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height)
    const dispatch = useDispatch();
    const year = parseInt(moment().format('YYYY'));
    const month = parseInt(moment().format('MM'));
    const day = parseInt(moment().format('DD'));
    const [stillLoading, setStillLoading] = useState(true);

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    useEffect(() => {
        const updateLayout = () => {
            setContainerWidth(Dimensions.get('window').width);
            setContainerHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    useEffect(() => {
        Keyboard.dismiss();
    }, [containerWidth, containerHeight])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(userInfoActions.loadInfo());
            await dispatch(colorInfoActions.loadInfoColors());
        }
        fetchData().then(promise => { setStillLoading(false) });
    }, [dispatch]);

    useEffect(() => {
        if (messages.length <= 1) {
            let welcomeText = userInfo.name === "friend" || userInfo.name === null ? `Hi! My name is Comfort 🤖.\n\nCan you please tell me your name with "my name is ..."?` : `Hi ${userInfo.name}! Welcome back! I missed you sooo much. What's on your mind?`;
            if (userInfo.birthDay === day && userInfo.birthMonth === month) {
                welcomeText += " Oh and Happy Birthday!! I hope you have a wonderful birthday 😊"
            }
            setMessages([{
                _id: 1,
                text: welcomeText,
                createdAt: new Date(),
                user: BOT_USER
            }]);
        }
    }, [userInfo])

    const saveInfoHandler = (idValue, usernameValue, ageValue, birthDayValue, birthMonthValue, birthYearValue, cityValue) => {
        dispatch(userInfoActions.addInfo(idValue, usernameValue, ageValue, birthDayValue, birthMonthValue, birthYearValue, cityValue));
    };

    const BOT_USER = {
        _id: 2,
        name: 'FAQ Bot',
        avatar: require('./assets/friendImage.png')//'https://i.imgur.com/7k12EPD.png'
    }

    const [messages, setMessages] = useState([{
        _id: 1,
        text: `Hi! My name is Comfort 🤖.\n\nWhat is on your mind?`,
        createdAt: new Date(),
        user: BOT_USER
    }]);

    useEffect(() => {
        Dialogflow_V2.setConfiguration(
            dialogflowconfig.client_email,
            dialogflowconfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowconfig.project_id
        )
    })

    const sendBotResponse = (allTexts, message) => {
        let newMessage = GiftedChat.append(messages, message);
        try {
            allTexts.forEach(item => {
                let msg;
                if (item.hasOwnProperty("payload")) {
                    const type = item.payload.type;
                    if (type == "image") {
                        const tag = item.payload.tag;
                        const rating = item.payload.rating;
                        getNewGiphy(tag, rating).then(giphy => {
                            let currentText = giphy == "" ? "I could not find a gif to send you at this moment." : ""
                            msg = {
                                _id: newMessage.length + 1,
                                text: currentText,
                                createdAt: new Date(),
                                user: BOT_USER,
                                image: {
                                    image: giphy.image_original_url, height: parseInt(giphy.image_height), width: parseInt(giphy.image_width)
                                }
                            };
                            newMessage = GiftedChat.append(newMessage, [msg]);
                            setMessages(newMessage);
                        })
                    } else if (type == "quote") {
                        const tag = item.payload.tag;
                        getNewQuote(tag).then(quote => {
                            msg = {
                                _id: newMessage.length + 1,
                                text: quote,
                                createdAt: new Date(),
                                user: BOT_USER,
                            };
                            newMessage = GiftedChat.append(newMessage, [msg]);
                            setMessages(newMessage);
                        })
                    } else if (type == "news") {
                        const tag = item.payload.tag;
                        getNews(tag).then(news => {
                            msg = {
                                _id: newMessage.length + 1,
                                text: news,
                                createdAt: new Date(),
                                user: BOT_USER,
                            };
                            newMessage = GiftedChat.append(newMessage, [msg]);
                            setMessages(newMessage);
                        })
                    } else if (type == "weather") {
                        let city = userInfo.city;
                        if (item.payload.hasOwnProperty("tag")) {
                            city = item.payload.tag;
                        }
                        getWeather(city).then(weather => {
                            msg = {
                                _id: newMessage.length + 1,
                                text: weather,
                                createdAt: new Date(),
                                user: BOT_USER,
                            };
                            newMessage = GiftedChat.append(newMessage, [msg]);
                            setMessages(newMessage);
                        })
                    }
                } else {
                    let currentText;
                    try {
                        currentText = item.text.text[0] == "" ? "Sorry, I am having an issue understanding you (I have to look up a lot of english words...). Can we try that again?" : item.text.text[0];
                    } catch (error) {
                        currentText = "Sorry, I have a massive headache right now. Please go easy on me, I am not responding well today."
                    }
                    msg = {
                        _id: newMessage.length + 1,
                        text: currentText,
                        createdAt: new Date(),
                        user: BOT_USER,
                    };
                    newMessage = GiftedChat.append(newMessage, [msg]);
                    setMessages(newMessage);
                }
            })
        } catch (error) {
            let msg = {
                _id: newMessage.length + 1,
                text: "My brain is hurting me right now, can we try repeating or rephrasing that?",
                createdAt: new Date(),
                user: BOT_USER,
            };
            newMessage = GiftedChat.append(newMessage, [msg]);
            setMessages(newMessage);
        }
    }

    const handleGoogleResponse = async (result, message) => {
        let usernameValue = userInfo.name;
        let userbirthdayValue = userInfo.birthDay;
        let userbirthmonthValue = userInfo.birthMonth;
        let userbirthyearValue = userInfo.birthYear;
        let userAgeValue = userInfo.age;
        let userCityValue = userInfo.city;
        try {
            if (result.queryResult.parameters.hasOwnProperty("app_name")) {
                usernameValue = result.queryResult.parameters.app_name;
            }
            if (result.queryResult.parameters.hasOwnProperty("app_birthday")) {
                let birthday = result.queryResult.parameters.app_birthday;
                birthday = birthday.split('T')[0].split('-');
                userbirthdayValue = birthday[2];
                userbirthmonthValue = birthday[1];
                userbirthyearValue = birthday[0];
                userAgeValue = year - userbirthyearValue;
            }
            if (result.queryResult.parameters.hasOwnProperty("app_city")) {
                let city = result.queryResult.parameters.app_city;
                userCityValue = city;
            }
        } catch (error) {
        }
        saveInfoHandler(0, usernameValue, userAgeValue, userbirthdayValue, userbirthmonthValue, userbirthyearValue, userCityValue)
        let allTexts;
        try {
            allTexts = result.queryResult.fulfillmentMessages;
        } catch (error) {
            allTexts = [];
        }
        sendBotResponse(allTexts, message);
    }

    const onSend = (message) => {
        setMessages(GiftedChat.append(messages, message));
        let mesg = message[0].text;
        const contexts = [{
            name: "userinfo",
            lifespan: 50,
            parameters: {
                "name": userInfo.name,
                "day": userInfo.birthDay,
                "month": userInfo.birthMonth,
                "year": userInfo.birthYear,
                "age": userInfo.age,
                "city": userInfo.city
            }
        }];
        Dialogflow_V2.setContexts(contexts);
        Dialogflow_V2.requestQuery(
            mesg,
            result => handleGoogleResponse(result, message),
            error => { () => { } }
        )
    }

    const isIphoneX = () => {
        const { width, height } = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            containerHeight < containerWidth &&
            ((height === 812 || width === 812) || (height === 896 || width === 896))
        );
    }

    const renderImage = props => {
        let height;
        let width;
        if (props.currentMessage.image.width > props.currentMessage.image.height) {
            height = 200 * props.currentMessage.image.height / props.currentMessage.image.width
            width = 200
        } else {
            height = 200
            width = 200 * props.currentMessage.image.width / props.currentMessage.image.height
        }
        if (isNaN(height) || isNaN(width)) {
            height = 200;
            width = 200;
        }
        if (props.currentMessage.hasOwnProperty("image")) {
            return (
                <Image
                    style={{
                        height: height,
                        width: width,
                        resizeMode: 'contain',
                        borderRadius: 13,
                        margin: 3,
                    }}
                    source={{ uri: props.currentMessage.image.image }}
                />
            )
        }
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: colorInfo.backgroundTextColorFriend
                    },
                    right: {
                        backgroundColor: colorInfo.backgroundTextColorUser
                    }
                }}
                textStyle={{
                    left: {
                        color: colorInfo.textColorBot,
                        fontFamily: colorInfo.font,
                        fontWeight: 'normal',
                        fontSize: colorInfo.fontSize
                    },
                    right: {
                        color: colorInfo.textColorUser,
                        fontFamily: colorInfo.font,
                        fontWeight: 'normal',
                        fontSize: colorInfo.fontSize
                    }
                }}
            />
        )
    }

    const renderSend = (props) => {
        return (
            <View style={{ height: props.composerHeight + 12, justifyContent: 'center', color: 'black', backgroundColor: colorInfo.keyboardBackgroundColor }}>
                <Send {...props} containerStyle={{ marginRight: 10, backgroundColor: colorInfo.keyboardBackgroundColor }} textStyle={{ height: -10, fontSize: colorInfo.fontSize, color: colorInfo.keyboardTextColor, fontFamily: colorInfo.font }} />
            </View>)
    }

    const renderComposer = (props) => {
        return (
            <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', flexDirection: 'row' }}>
                {isIphoneX() && <View style={{ marginLeft: -45, height: 45 }}>
                </View>}
                <View style={{ flex: 1, flexGrow: 1, height: props.composerHeight + 12, backgroundColor: colorInfo.keyboardBackgroundColor }}>
                    <Composer
                        {...props}
                        keyboardAppearance={colorInfo.keyboardStyle}
                        placeholderTextColor={colorInfo.keyboardTextColor}
                        placeholder="...."
                        //theme={{ fonts: { regular: colorInfo.fonts } }}
                        textInputProps={{ allowFontScaling: true, disableFullscreenUI: true }}
                        textInputStyle={{
                            backgroundColor: colorInfo.keyboardBackgroundColor,
                            color: colorInfo.keyboardTextColor,
                            fontFamily: colorInfo.font,
                            fontWeight: 'normal',
                            width: isIphoneX() ? containerWidth * 0.7 : containerWidth * 0.8,
                            marginLeft: isIphoneX() ? 40 : 0,
                            marginTop: isIphoneX() ? 10 : 12
                        }}
                    />
                </View>
                {isIphoneX() && containerHeight < containerWidth && <View style={{ marginRight: -150, height: 45 }}>
                </View>}
            </View>
        );
    }

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ borderTopWidth: 0 }}
            >
            </InputToolbar>)
    }

    const settingsHandler = () => {
        props.navigation.navigate('colorPicker')
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "My Best Friend",
            headerStyle: {
                backgroundColor: colorInfo.backgroundColor,
            },
            headerTitleStyle: {
                fontFamily: colorInfo.font,
            },
            headerTintColor: colorInfo.keyboardTextColor,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        color={colorInfo.keyboardTextColor}
                        title="Color"
                        iconName={Platform.OS === 'android' ? 'md-flask' : 'ios-flask'}
                        onPress={settingsHandler}
                    />
                </HeaderButtons>
            )
        })
    }, [settingsHandler]);

    if (stillLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading Your Chat Settings</Text>
            </View>

        );
    } else {
        return (
            <SafeAreaView forceInset={{ top: 'never', bottom: 'always', left: 'never', right: 'never' }} style={{ flex: 1, backgroundColor: colorInfo.keyboardBackgroundColor }}>
                <View style={{ flex: 1, backgroundColor: colorInfo.backgroundColor }}>
                    <Text style={{ fontSize: 15, color: '#aaa', textAlign: 'center' }}>
                        💬 Let's catch up!
                </Text>
                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        renderSend={renderSend}
                        user={{
                            _id: 1
                        }}
                        renderMessageImage={renderImage}
                        renderBubble={renderBubble}
                        renderComposer={renderComposer}
                        keyboardShouldPersistTaps="handled"
                        renderInputToolbar={renderInputToolbar}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 20,
        fontSize: 30
    }
});

export default TalkScreen;
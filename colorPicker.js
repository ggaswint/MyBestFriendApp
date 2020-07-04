import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform, Dimensions, ScrollView, Button, Alert } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import SwitchSelector from 'react-native-switch-selector';
import HeaderButton from './components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as colorInfoActions from './store/colors_action';
import { useSelector, useDispatch } from 'react-redux';
import Colors from './constants/Colors';
import RNPickerSelect from 'react-native-picker-select';

const ColorPickerScreen = props => {
    const colorInfo = useSelector(state => state.colorInfo.colorinfo)
    const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width)
    const [containerHeight, setContainerHeight] = useState(Dimensions.get('window').height)
    const [backgroundColor, setBackgroundColor] = useState(colorInfo.backgroundColor)
    const [backgroundTextColorUser, setBackgroundTextColorUser] = useState(colorInfo.backgroundTextColorUser)
    const [backgroundTextColorFriend, setBackgroundTextColorFriend] = useState(colorInfo.backgroundTextColorFriend)
    const [font, setFont] = useState(colorInfo.font);
    const [fontSize, setFontSize] = useState(colorInfo.fontSize);
    const [keyboardBackgroundColor, setKeyboardBackgroundColor] = useState(colorInfo.keyboardBackgroundColor)
    const [keyboardStyle, setKeyboardStyle] = useState(colorInfo.keyboardStyle)
    const [keyboardTextColor, setKeyboardTextColor] = useState(colorInfo.keyboardTextColor)
    const [textColorBot, setTextColorBot] = useState(colorInfo.textColorBot)
    const [textColorUser, setTextColorUser] = useState(colorInfo.textColorUser)
    const [colorValue, setColorValue] = useState("1");
    const [currentColor, setCurrentColor] = useState('#FFFFFF');
    const dispatch = useDispatch();

    const myOptions = [
        { label: "bg", value: "1" },
        { label: "mtbg", value: "2" },
        { label: "mt", value: "3" },
        { label: "ftbg", value: "4" },
        { label: "ft", value: "5" },
        { label: "ktbg", value: "6" },
        { label: "kt", value: "7" }
    ];

    const myFontSizes = [
        { label: "12", value: 12 },
        { label: "14", value: 14 },
        { label: "16", value: 16 },
        { label: "18", value: 18 },
        { label: "20", value: 20 },
        { label: "22", value: 22 },
        { label: "24", value: 24 },
        { label: "26", value: 26 },
        { label: "28", value: 28 },
        { label: "30", value: 30 },
    ];

    const myFonts = [
        { label: '8 bit Operator', value: '8bitOperator' },
        { label: 'Alex Brush', value: 'alex-brush' },
        { label: 'Bakery', value: 'bakery' },
        { label: 'Blox 2', value: 'Blox2' },
        { label: 'Brush', value: 'brush' },
        { label: 'Cookie Monster', value: 'CookieMonster' },
        { label: 'Galaxy Far Far Away', value: 'galaxyfaraway' },
        { label: 'Gatsby', value: 'GatsbyFLF' },
        { label: 'Hoedown Shadow', value: 'HoedownShadow' },
        { label: 'METALORD', value: 'METALORD' },
        { label: 'Montserrat', value: 'montserrat' },
        { label: 'Montserrat BOLD', value: 'montserrat-bold' },
        { label: 'My Father', value: 'my-father' },
        { label: 'Natural', value: 'natural' },
        { label: 'Naughty Monster', value: 'naughty-monster' },
        { label: 'Olde English', value: 'OldeEnglishRegular' },
        { label: 'Open Sans', value: 'open-sans' },
        { label: 'Open Sans BOLD', value: 'open-sans-bold' },
        { label: 'Print Clearly', value: 'print_clearly_tt' },
        { label: 'Quentin Caps', value: 'QuentinCaps' },
        { label: 'Vertigo', value: 'VertigoFLF' },
        { label: 'waltographUI', value: 'waltographUI' },
        { label: 'Welcome Everyday', value: 'welcome-everyday' },
    ]

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

    const changeColor = (color) => {
        if (colorValue == "1") {
            setBackgroundColor(color)
        } else if (colorValue == "2") {
            setBackgroundTextColorUser(color)
        } else if (colorValue == "3") {
            setTextColorUser(color)
        } else if (colorValue == "4") {
            setBackgroundTextColorFriend(color)
        } else if (colorValue == "5") {
            setTextColorBot(color)
        } else if (colorValue == "6") {
            setKeyboardBackgroundColor(color)
        } else if (colorValue == "7") {
            setKeyboardTextColor(color)
        }
        setCurrentColor(color);
    }

    const resetColors = () => {
        Alert.alert("Are you sure?", 'Do you really want to remove this item?',
            [{ text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(colorInfoActions.addInfoColors(0, "#ffd6f9", "#e4c4ff", "#c6fbff", "#ff00c5", "#0036ff", "#d500ff", "#c2ffdc", "default", "waltographUI", 16));
                    props.navigation.goBack();
                }
            }
            ]);
    }

    const saveColors = useCallback(() => {
        dispatch(colorInfoActions.addInfoColors(0, backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardTextColor, keyboardBackgroundColor, keyboardStyle, font, fontSize));
        props.navigation.goBack();
    }, [backgroundColor, backgroundTextColorUser, backgroundTextColorFriend, textColorUser, textColorBot, keyboardBackgroundColor, keyboardTextColor, keyboardStyle, font, fontSize]);

    const goBack = useCallback(() => {
        Alert.alert("Are you sure?", 'Do you want to go back without saving?',
            [{ text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    props.navigation.goBack();
                }
            }
            ]);
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        color={Colors.primary}
                        title="Save"
                        iconName={
                            Platform.OS === 'android' ? 'md-save' : 'ios-save'
                        }
                        onPress={saveColors}
                    />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} style={{ marginLeft: 20 }}>
                    <Item
                        color={Colors.primary}
                        title="  Back"
                        //iconName={
                        //    Platform.OS === 'android' ? 'md-back' : 'ios-back'
                        //}
                        onPress={goBack}
                    />
                </HeaderButtons>
            )
        });
    }, [saveColors]);

    return (
        <View style={{ flex: 1, alignItems: 'center', flexDirection: containerHeight < containerWidth ? 'row' : 'column' }}>
            {containerHeight > containerWidth && <Button title="Reset Settings" onPress={resetColors} color={Colors.primary} />}
            <View style={{ flex: containerHeight < containerWidth ? 1 : 3, width: containerHeight < containerWidth ? containerWidth * 0.25 : containerWidth * 0.8, marginLeft: containerHeight < containerWidth ? containerWidth * 0.05 : 0 }}>
                <ColorPicker
                    onColorSelected={color => { changeColor(color) }}
                    style={{ height: containerHeight < containerWidth ? containerHeight * 0.8 : containerHeight * 0.5, width: containerHeight < containerWidth ? containerWidth * 0.3 : containerWidth * 0.8 }}
                >
                </ColorPicker>
            </View>
            {containerHeight > containerWidth && <View pointerEvents="none" style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -containerHeight * 0.4, left: 0, right: 0, bottom: 0 }}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: font, fontSize: fontSize }}>Press Me</Text>
            </View>}
            <View style={{ flex: 2, width: containerHeight < containerWidth ? containerWidth * 0.9 : containerWidth, marginRight: containerHeight < containerWidth ? containerWidth * 0.05 : 0 }}>
                <View>
                    {containerHeight <= containerWidth && <Button title="Reset Settings" onPress={resetColors} color={Colors.primary} />}
                    <SwitchSelector
                        initial={0}
                        options={myOptions}
                        buttonColor={'#ff00eb'}
                        onPress={value => { setColorValue(value) }}
                    />
                </View>
                <ScrollView>
                    <View >
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text style={styles.text}>Select Keyboard Style: </Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                placeholder={{}}
                                //placeholder={{label: 'default', value: 'default', color: Colors.primary}}
                                textInputProps={{ ...styles.pickerStyle }}
                                onValueChange={(value) => setKeyboardStyle(value)}
                                value={keyboardStyle}
                                Icon={() => { return (<View></View>) }}
                                items={[{ label: 'default', value: 'default', color: Colors.primary }, { label: 'dark', value: 'dark', color: Colors.primary }, { label: 'light', value: 'light', color: Colors.primary }]}
                            />
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text style={styles.text}>Select Font Style: </Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                placeholder={{}}
                                //placeholder={{label: 'Open Sans', value: 'open-sans'}}
                                textInputProps={{ ...styles.pickerStyle }}
                                onValueChange={(value) => setFont(value)}
                                value={font}
                                Icon={() => { return (<View></View>) }}
                                items={myFonts}
                            />
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text style={styles.text}>Select Font Size: </Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                placeholder={{}}
                                //placeholder={{label: 'Open Sans', value: 'open-sans'}}
                                textInputProps={{ ...styles.pickerStyle }}
                                onValueChange={(value) => setFontSize(value)}
                                value={fontSize}
                                Icon={() => { return (<View></View>) }}
                                items={myFontSizes}
                            />
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>Background Color (bg): </Text>
                            <View style={{ height: 20, width: 100, backgroundColor: backgroundColor }}>
                            </View>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>My Text Colors (mtbg, mt): </Text>
                            <View style={{ height: 20, width: 100, backgroundColor: backgroundTextColorUser }}>
                                <Text style={{ textAlign: 'center', fontFamily: font, color: textColorUser }}>Me</Text>
                            </View>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>Friend's Text Colors (ftbg, ft): </Text>
                            <View style={{ height: 20, width: 100, backgroundColor: backgroundTextColorFriend }}>
                                <Text style={{ textAlign: 'center', fontFamily: font, color: textColorBot }}>Friend</Text>
                            </View>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>Keyboard Text Colors (ktbg, kt): </Text>
                            <View style={{ height: 20, width: 100, backgroundColor: keyboardBackgroundColor }}>
                                <Text style={{ textAlign: 'center', fontFamily: font, color: keyboardTextColor }}>Keyboard</Text>
                            </View>
                        </View>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <Text>Selected Color Hex Code: </Text>
                            <Text style={{ textAlign: 'center', color: 'black' }}>{currentColor}  </Text>
                            <View style={{ height: 20, width: 20, backgroundColor: currentColor }}>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )

};

export const screenOptions = (navData) => {
    return {
        headerTitle: 'color picker',
        headerStyle: {
            backgroundColor: '#ffedff',
            shadowColor: 'transparent',
        },
    };
};


const styles = StyleSheet.create({
    pickerStyle: {
        fontSize: 18,
        //color: Colors.primary,
        //backgroundColor: 'black'
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
});

export default ColorPickerScreen;
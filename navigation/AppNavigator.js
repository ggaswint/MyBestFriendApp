import React from 'react';
//import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {TalkNavigator} from './mainNavigator';
//import {createStackNavigator} from '@react-navigation/stack';
//import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    //const isAuth = useSelector(state => !!state.auth.token);
    //const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);
    //const isGuest = useSelector(state => !!state.auth.isGuest);

    return (
        <NavigationContainer>
            <TalkNavigator/>
        </NavigationContainer>
    );
};

export default AppNavigator;
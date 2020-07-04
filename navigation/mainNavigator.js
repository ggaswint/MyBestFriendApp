import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
//import {useDispatch} from 'react-redux';

import talkScreen from '../Talk';
import ColorPickerScreen, { screenOptions as colorPickerScreenOptions } from '../colorPicker';



import Colors from '../constants/Colors';
//import {Ionicons} from '@expo/vector-icons';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.primary,
};

const TalkStackNavigator = createStackNavigator();

export const TalkNavigator = () => {
    return (
        <TalkStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <TalkStackNavigator.Screen
                name="talk"
                component={talkScreen}
            //options={talkScreenOptions}
            />
            <TalkStackNavigator.Screen
                name="colorPicker"
                component={ColorPickerScreen}
                options={colorPickerScreenOptions}
            />
        </TalkStackNavigator.Navigator>
    );
};

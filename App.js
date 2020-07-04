import React, { useState } from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';
//import soundLibrary from './sounds';
//import Player from './Player';
import { init } from './helpers/db';
import { initColors } from './helpers/dbColors';
import UserInfoReducer from './store/userinfo_reducer';
import ColorInfoReducer from './store/colors_reducer';

init()
initColors()

const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  colorInfo: ColorInfoReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const loadAssets = () => {
  return Promise.all([
    Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'brush': require('./assets/fonts/Brush.otf'),
      'alex-brush': require('./assets/fonts/AlexBrush-Regular.ttf'),
      'bakery': require('./assets/fonts/bakery.ttf'),
      'naughty-monster': require('./assets/fonts/Naughty-Monster.ttf'),
      'my-father': require('./assets/fonts/My-Father.ttf'),
      'welcome-everyday': require('./assets/fonts/Welcome-Everyday.ttf'),
      'natural': require('./assets/fonts/Natural.ttf'),
      '8bitOperator': require('./assets/fonts/8bitOperator.ttf'),
      'Blox2': require('./assets/fonts/Blox2.ttf'),
      'OldeEnglishRegular': require('./assets/fonts/OldeEnglishRegular.ttf'),
      'VertigoFLF': require('./assets/fonts/VertigoFLF.ttf'),
      'GatsbyFLF': require('./assets/fonts/GatsbyFLF.ttf'),
      'HoedownShadow': require('./assets/fonts/HoedownShadow.ttf'),
      'print_clearly_tt': require('./assets/fonts/print_clearly_tt.ttf'),
      'QuentinCaps': require('./assets/fonts/QuentinCaps.ttf'),
      'CookieMonster': require('./assets/fonts/CookieMonster.ttf'),
      'galaxyfaraway': require('./assets/fonts/galaxyfaraway.ttf'),
      'METALORD': require('./assets/fonts/METALORD.ttf'),
      'waltographUI': require('./assets/fonts/waltographUI.ttf'),
    }),
  ])
}

export default function App() {
  const [stateReady, setStateReady] = useState(false);

  if (!stateReady) {
    return <AppLoading startAsync={loadAssets} onFinish={() => {
      setStateReady(true);
    }} onError={() => { }} />;
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
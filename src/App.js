'use strict'
import React from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet,
    Image
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import WelComePage from './page/WelComePage'
import Index from './page/Index'

const MainScreenNavigator = StackNavigator({
    WelCome: {screen: WelComePage},//欢迎页面
    Index: {screen: Index},//主页
}, {
    headerMode:'none'
})


export default MainScreenNavigator;
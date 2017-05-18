/**
 * Created by shenYP.
 * Date: 2017/5/18
 * Time: 上午10:08
 */
'use strict'
import React, {Component}from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
export default class Base extends Component {
    goBack() {
        this.props.navigation.goBack()
    }
}
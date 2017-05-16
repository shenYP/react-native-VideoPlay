/**
 * Created by shenYP.
 * Date: 2017/5/16
 * Time: 下午2:50
 */
'use strict'
import React, {Component}from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet,
    Image
} from 'react-native';
import Orientation from 'react-native-orientation';

export default class Index extends Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        Orientation.lockToLandscape();//只允许横屏
    }

    render() {
        return (
            <View>
                <Text>第二个</Text>
                <Button
                    title="返回"
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}/>
            </View>
        )
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();//只允许竖屏
    }
}
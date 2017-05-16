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

import {StackNavigator, TabNavigator} from 'react-navigation'

import PlayPage from './PlayPage'

class Index extends Component {
    static navigationOptions = {
        title: '主页',
    }

    render() {
        return (
            <View>
                <Button
                    title="进入播放页面"
                    onPress={() => {
                        this.props.navigation.navigate('PlayPage')
                    }}/>
            </View>
        )
    }
}

const NavigationAction = StackNavigator({
    Index: {
        screen: Index
    },
    PlayPage: {
        screen: PlayPage
    }
})

export default NavigationAction;
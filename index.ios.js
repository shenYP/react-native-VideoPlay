/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App'

export default class video_play extends Component {
    componentDidMount() {
        console.disableYellowBox = true;//是否开启屏蔽警告
    }

    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('video_play', () => video_play);

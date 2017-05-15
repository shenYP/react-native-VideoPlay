'use strict'
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import MyNotificationsScreen from './MyNotificationsScreen'

class ChatScreen extends Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View>

                <Text>Chat with {params.user}</Text>
                <Button
                    title="返回主页"
                    onPress={() => {
                        this.props.navigation.navigate('Notifications')
                    }}/>
            </View>
        );
    }
}
export default ChatScreen;  
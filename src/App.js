'use strict'
import React from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import ChatScreen from './ChatScreen';
import MyNotificationsScreen from './MyNotificationsScreen';


class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',//设置标题内容
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"/>
            </View>
        );
    }
}

class RecentChatsScreen extends React.Component {
    render() {
        return (
            <View style={styles.st}>
                <Text>212112</Text>
            </View>
        )
    }
}


const SimpleApp = StackNavigator({
    Home: {screen: HomeScreen},
    Chat: {screen: ChatScreen},
    Notifications: {
        screen: MyNotificationsScreen,
    },
});


const MainScreenNavigator = TabNavigator({
    Recent: {screen: RecentChatsScreen},
    Simp: {screen: SimpleApp},

});


const styles = StyleSheet.create({
    st: {
        marginTop: 100
    }
})

export default MainScreenNavigator;
import React from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet,
    Image
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';


class MyHomeScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./../assets/splash.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        );
    }
}

class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({tintColor}) => (
            <View>
                <Image
                    source={require('./../assets/splash.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
                <Text style={{position:'absolute',backgroundColor:'yellow',fontSize:12}}>9</Text>
            </View>
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

const MyApp = TabNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Notifications: {
        screen: MyNotificationsScreen,
    },
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});


export default MyApp
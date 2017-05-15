import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import ChatScreen from './ChatScreen';
import MinePage from './MinePage';

class HomePage extends React.Component {

    static navigationOptions = {
        title: '首页',//设置标题内容
        header: {
            backTitle: ' ',//返回按钮标题内容（默认为上一级标题内容）
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={{padding: 10}}>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Sybil'})}
                    title="点击跳转"/>
            </View>
        )
    }

}


export default HomePage;
import React from 'react';
import {
    AppRegistry,
    Text, View, Button,
    StyleSheet,
    Image,
    Dimensions,
    PanResponder
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';
const {width, height}  = Dimensions.get('window')

class MyHomeScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
    };


    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: this._handlePanResponderMove,
        });
    }

    render() {
        return (
            <View style={{width: width, height: height, backgroundColor: 'pink'}}
                  {...this._panResponder.panHandlers}>

            </View>
        );
    }

    _handlePanResponderMove = (e,gestureState)=>{
        if(gestureState.x0 < width/2) {
            // console.log('亮度')
            if(this.lastDy < gestureState.dy){
                console.log('亮度-----')
            }else {
                console.log('亮度+++++')
            }
            this.lastDy = gestureState.dy
        }else {
            if(this.lastDy < gestureState.dy){
                console.log('声音-----')
            }else {
                console.log('声音+++++')
            }
            this.lastDy = gestureState.dy
        }
    }


}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});

const MyApp = StackNavigator({
    Home: {
        screen: MyHomeScreen,
    },
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});


export default MyApp
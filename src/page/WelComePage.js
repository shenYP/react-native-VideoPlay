/**
 * Created by shenYP.
 * Date: 2017/5/16
 * Time: 下午2:14
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    Image
}from 'react-native'
import {NavigationActions} from 'react-navigation'

var {height, width} = Dimensions.get('window')

export default class WelComePage extends Component {
    static navigationOptions = {
        title: '欢迎页面',
        header:null
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(resetAction)
        }, 500)
    }

    render() {
        return (
            <View>
                <Image source={require('./../../assets/splash.png')} style={{width: width, height: height}}/>
            </View>
        )
    }
}

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Index',headerMode:'none'})
    ]
})
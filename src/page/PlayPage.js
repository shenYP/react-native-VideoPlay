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
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Slider,
    PanResponder
} from 'react-native';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import Base from './Base/Base'

const {width, height} = Dimensions.get('window')
const PlayList = [require('./../../assets/video/myVideo1.mp4'), require('./../../assets/video/myVideo2.mp4')]

export default class Index extends Base {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            playindex: 0,
            isPaused: false,//是否暂停
            resizeMode: "contain",//播放模式
            duration: 0,//视频总时长
            progress: 0,//当前播放进度
            sliderValue: 0.0,//进度条进度
            volume: 0.0,//声音大小
        };
        this.lastVolume = 0;
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        Orientation.lockToLandscape();//只允许横屏
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderStart: this._handlePanResponderStart,
        });
    }

    _handlePanResponderMove = (e, gestureState) => {
        if (gestureState.x0 < width / 2) {
            if (this.lastDy < gestureState.dy) {
                console.log('亮度-----')
            } else {
                console.log('亮度+++++')
            }
            this.lastDy = gestureState.dy
        } else {
            let volume = gestureState.moveY / height
            if (this.volumeStartY < gestureState.moveY) {//声音------
                let distance = volume - this.volumeStartY / height
                let value = this.lastVolume - distance
                if (value < 0) {
                    value = 0
                }
                this.setState({
                    volume: value
                })
            } else {//声音+++++
                let distance = this.volumeStartY / height - volume
                let value = this.lastVolume + distance
                if (value > 1) {
                    value = 1
                }
                this.setState({
                    volume: value
                })
            }
        }
    }

    _handlePanResponderStart = (e, gestureState) => {
        this.lastVolume = this.state.volume//记录最后一次的声音值
        this.volumeStartY = gestureState.y0//记录点击时候的y轴坐标，用来判断增加或减少音量
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    isPaused: !this.state.isPaused
                })
            }} style={styles.content}>
                <View>
                    <Video source={(PlayList[this.state.playindex])}   // Can be a URL or a local file.
                           ref={(ref) => {
                               this.player = ref
                           }}                                      // Store reference
                           rate={1.0}                              // 播放速度
                           volume={parseFloat(this.state.volume)}                            // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                           muted={false}                           // true代表静音，默认为false.
                           paused={this.state.isPaused}            // true代表暂停，默认为false
                           resizeMode={this.state.resizeMode}      // 视频的自适应伸缩铺放行为【cover，contain，stretch，center】
                           repeat={false}                          // 是否重复播放
                           playInBackground={false}                // 当app转到后台运行的时候，播放是否暂停
                           playWhenInactive={false}                // [iOS] 视频继续播放时，控制或通知中心显示。
                           ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                           progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                           onLoadStart={this.loadStart}            // 开始播放时候回调
                           onLoad={this.setDuration}               // 视频加载时候回调
                           onProgress={this.onProgress}               // 进度控制，每250ms调用一次，以获取视频播放的进度
                           onEnd={this.onEnd}                      // 当视频播放完毕后的回调函数
                           onError={this.videoError}               // 当视频不能加载，或出错后的回调函数
                           onBuffer={this.onBuffer}                // 当远程视频缓冲时回调
                           onTimedMetadata={this.onTimedMetadata}  // 当流接收一些元数据时回调
                           style={styles.backgroundVideo}/>
                    <View {...this._panResponder.panHandlers} style={styles.backgroundVideo}>
                        <TouchableOpacity onPress={() => {
                            this.goBack()
                        }}>
                            <Image source={require('./../../assets/image/video_back.png')} style={styles.back_img}/>
                        </TouchableOpacity>
                        {
                            this.state.isPaused ? <Image source={require('./../../assets/image/play_img.png')}
                                                         style={styles.play_img}/> : null
                        }
                        <View style={styles.bottomBtn}>
                            <View style={[styles._row, styles.progress]}>
                                <Text style={styles.progressTv}>{this.state.progress}</Text>
                                <Slider
                                    value={parseFloat(this.state.sliderValue)}
                                    ref={(ref) => {
                                        this.slider = ref
                                    }}
                                    style={styles.slider}
                                    thumbImage={require('./../../assets/image/ctrlbar_progress_thumb_normal.png')}
                                    onValueChange={value => this.changeSlider(value)}
                                />
                                <Text style={styles.progressTv}>{this.state.duration}</Text>
                            </View>
                            <View style={[styles.btn_Line, styles._row]}>
                                <View style={styles._row}>
                                    {
                                        this.state.isPaused ?
                                            <Image source={require('./../../assets/image/mini_window_video_play.png')}
                                                   style={styles.play}/> :
                                            <Image source={require('./../../assets/image/mini_window_video_pause.png')}
                                                   style={styles.play}/>
                                    }
                                    <TouchableOpacity onPress={() => {
                                        this.onEnd()
                                    }}>
                                        <Image
                                            source={require('./../../assets/image/movie_ctrlbar_btn_next_normal.png')}
                                            style={[styles.play, styles.next_img]}/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.changeResizeMode()
                                }}>
                                    <Image source={require('./../../assets/image/fit_screen_btn_normal.png')}
                                           style={styles.play}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    loadStart = (e) => {
        // console.log('开始播放')
    }

    setDuration = (e) => {
        this.setState({
            duration: parseInt(e.duration)
        })
    }

    onProgress = (e) => {
        this.setState({
            progress: parseInt(e.currentTime),
            sliderValue: e.currentTime / e.playableDuration
        })
        // this.player.seek(parseInt(e.currentTime))
    }

    onEnd = () => {
        let index = this.state.playindex
        index += 1
        if (index >= PlayList.length) {
            index = 0
        }
        this.setState({
            playindex: index
        })
    }

    changeResizeMode = () => {
        let resizeMode = ''
        if (this.state.resizeMode == 'contain') {
            resizeMode = 'stretch'
        } else {
            resizeMode = 'contain'
        }
        this.setState({resizeMode})
    }


    changeSlider = (value) => {
        let duration = parseFloat(value).toFixed(2)//播放百分比
        this.player.seek(parseInt(this.state.duration * duration))
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();//只允许竖屏
    }

}

var styles = StyleSheet.create({
    content: {
        backgroundColor: 'black'
    },
    backgroundVideo: {
        position: 'absolute',
        width: width,
        height: height
    },
    play_img: {
        width: 40,
        height: 40,
        top: height / 2 - 20,
        left: width / 2 - 20,
        position: 'absolute',
    },
    back_img: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop: 10
    },
    play: {
        width: 30,
        height: 30
    },
    btn_Line: {
        justifyContent: 'space-between'
    },
    _row: {
        flexDirection: 'row'
    },
    bottomBtn: {
        position: 'absolute',
        bottom: 0,
        width: width,
        padding: 10,
    },
    next_img: {
        marginLeft: 10
    },
    slider: {
        height: 5,
        flex: 1,
        marginHorizontal: 8
    },
    progress: {
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 5
    },
    progressTv: {
        backgroundColor: 'transparent',
        color: 'white'
    }
});
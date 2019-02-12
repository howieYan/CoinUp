/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, PixelRatio} from 'react-native';
import Utils from "./Utils";
import lodash from "lodash";
import {Loading} from './Loading';
import LoginPassWord from "./LoginPassWord";
export default class VerificationCode extends Component {
    static navigationOptions = ({navigation}) => ({
        // headerTitle: navigation.state.params.name,
        headerTintColor: '#000',
        headerLeft: null,
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: (
           <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.goBack()}}>
               <View style={{paddingRight: 10,}}>
                   <Text style={{fontSize: Utils.setSpText(18)}}>取消</Text>
               </View>
           </TouchableOpacity>
        )
    })
    constructor(props){
        super(props);
        this.state = {
            verifyCode: '',
            time: 60,
            isTime: false,
        };
    }
    componentDidMount () {
        this.onCheckCode()
    }
    onCheckCode () {
        let {mobile} = this.props.navigation.state.params
        if (mobile) {
            this.LoadCode(mobile);
            let time = 60;
            let _this = this;
            let int = setInterval(function () {
                time --;
                _this.setState({
                    time: time,
                    isTime: true
                })
                if (time === 0) {
                    clearInterval(int);
                    _this.setState({
                        time: 60,
                        isTime: false
                    })
                }
            }, 1000);
        }
    }
    async LoadCode (mobile) {
        try {
            let formData = new FormData();
            formData.append('mobile', mobile);
            let data = await Utils.LoadPost(Utils.size.url + '/api/auth/getCode', formData);
            if (Number(data.code === 0)) {
                Loading.Toast('验证码已发送您的手机');
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    onTouchInput() {
        const isFocused = this.textInput.isFocused();
        if (!isFocused) {
            this.textInput.focus();
        }
    }
    renderVerifyCode(value) {
        const paddedValue = lodash.padEnd(value, 6, ' ');
        const valueArray = paddedValue.split('');
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.onTouchInput.bind(this)}
                style={styles.verifyTextContainer}
            >
                {valueArray.map((digit, index) => (
                    <View
                        key={index}
                        style={digit === ' ' ? styles.textInputItem : styles.textInputItemIn}
                    >
                        <Text style={styles.verifyText}>{digit}</Text>
                    </View>
                ))}
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.padding}>
                    <View style={styles.HeaderViewStyle}>
                        <Text style={styles.HeaderTextStyle}> 验证码已发送至手机： </Text>
                        <Text style={styles.HeaderTextStyleColor}>{this.props.navigation.state.params.mobile}</Text>
                    </View>
                    <View style={styles.verifyContainer}>
                        {this.renderVerifyCode(this.state.verifyCode)}
                        <TextInput
                            ref={(ref) => { this.textInput = ref; }}
                            underlineColorAndroid="transparent"
                            caretHidden
                            style={styles.textInput}
                            autoFocus={true}
                            keyboardType={'numeric'}
                            maxLength={6}
                            onChangeText={(text) => {
                                const reg = /^[0-9]*$/;
                                if (reg.test(text)) {
                                    this.setState({ verifyCode: text });
                                    this.onChangeVerifyCode(this, text);
                                }
                            }}
                            value={this.state.verifyCode}
                        />
                    </View>
                    <View style={styles.FooterViewStyle}>
                        { this.state.isTime ?
                            <Text style={styles.FooterTextStyle}>重新发送{this.state.time}s</Text>
                            :
                            <TouchableOpacity activeOpacity={0.5} onPress={() => {alert('重发验证码')}}>
                                <Text style={styles.FooterTextStyle}>重发验证码</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>

            </View>
        );
    }
    onChangeVerifyCode(record,text) {
        if (text.length === 6) {
            this.props.navigation.navigate('LoginPassWord', {mobile: this.props.navigation.state.params.mobile, verifyCode: text})
        }
    }
}
function getRealDP(designPx) {
    return PixelRatio.roundToNearestPixel(designPx / 3);
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    HeaderViewStyle: {
        marginTop: 30,
    },
    HeaderTextStyle: {
        fontSize: Utils.setSpText(16),
        color: '#49484B',
    },
    HeaderTextStyleColor: {
        paddingTop: 10,
        fontSize: Utils.setSpText(16),
        color: '#2D7FCE',
    },
    // textInput样式
    textInput: {
        height: Utils.size.os === 'ios' ? 0 : getRealDP(1),
        width: Utils.size.width,
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    // 验证码输入框总容器
    verifyContainer: {
        marginTop: 20,
        width: Utils.size.width,
        height: (Utils.size.width - 30) / 6,
    },
    // 验证码带下划线输入格
    textInputItem: {
        width: (Utils.size.width - 80)/ 6,
        height: (Utils.size.width - 80) / 6,
        backgroundColor: '#F0F0F3',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 3,
        justifyContent: 'center',
    },
    textInputItemIn: {
        width: (Utils.size.width - 80) / 6,
         height: (Utils.size.width - 80) / 6,
        backgroundColor: '#F0F0F3',
        marginRight: 10,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 输入验证码样式
    verifyText: {
        fontSize: getRealDP(72),
        color: '#282828'
    },
    // 验证码文本框容器
    verifyTextContainer: {
        flexDirection: 'row',
        width: Utils.size.width -30 ,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: getRealDP(74),
        // position: 'absolute',
        // left: 0,
        // top: 0
    },
    FooterViewStyle: {
        paddingTop: 5,
    },
    FooterTextStyle: {
        fontSize: Utils.setSpText(14),
        color: '#2D7FCE',
    },
    padding: {
        paddingRight: 15,
        paddingLeft: 15
    }
})


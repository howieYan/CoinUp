/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, PixelRatio, AsyncStorage} from 'react-native';
import Utils from "../../Component/Utils";
import lodash from "lodash";
import {Loading} from "../../Component/Loading";
export default class TheNextStep extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#000',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />,
    })
    constructor(props){
        super(props);
        this.state = {
            verifyCode: '',
            time: 60,
        };
    }
    onTouchInput() {
        const isFocused = this.textInput.isFocused();
        if (!isFocused) {
            this.textInput.focus();
        }
    }
    renderVerifyCode(value) {
        // const { verifyCodeLength } = this.props;
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
    componentDidMount () {
        this.onCheckCode()
    }
    onCheckCode () {
        let {mobile} = this.props.navigation.state.params
        if (mobile) {
            this.LoadData(mobile);
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
    async LoadData () {
        try {
            let formData = new FormData();
            formData.append('mobile', this.props.navigation.state.params.mobile);
            let data = await Utils.LoadPost(Utils.size.url + '/api/auth/getCode', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result
                })
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
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
                        {this.state.time > 0 ?
                            <Text style={styles.FooterTextStyle}>{this.state.time}后，重发验证码</Text>
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
    // 输入6位验证码
    onChangeVerifyCode(record,text) {
        if (text.length === 6) {
            this.LoadCode(text)
        }
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.popToTop()
    }
    // 输入6位验证码 接口
    async LoadCode (record) {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('mobile', this.props.navigation.state.params.mobile);
            formData.append('verifyCode', record);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/changeMobile', formData);
            console.log(formData);
            if (Number(data.code === 0)) {
                Loading.Toast('修改成功')
                this.onBackButton()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e)
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
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    HeaderTextStyle: {
        fontSize: Utils.setSpText(14),
        color: '#49484B',
    },
    HeaderTextStyleColor: {
        fontSize: Utils.setSpText(14),
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
        width: Utils.size.width - 30,
        height: getRealDP(150),
    },
    // 验证码带下划线输入格
    textInputItem: {
        width: getRealDP(120),
        borderBottomWidth: getRealDP(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#888888'
    },
    textInputItemIn: {
        width: getRealDP(120),
        borderBottomWidth: getRealDP(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#282828'
    },
    // 输入验证码样式
    verifyText: {
        fontSize: getRealDP(72),
        color: '#282828'
    },
    // 验证码文本框容器
    verifyTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Utils.size.width - 30,
        height: getRealDP(150),
        paddingHorizontal: getRealDP(74),
        position: 'absolute',
        left: 0,
        top: 0
    },
    FooterViewStyle: {
        paddingTop: 5,
    },
    FooterTextStyle: {
        fontSize: Utils.setSpText(14),
        color: '#49484B',
    },
    padding: {
        paddingRight: 15,
        paddingLeft: 15
    }
})


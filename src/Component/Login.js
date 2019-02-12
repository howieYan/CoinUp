/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Utils from "./Utils";
import UserAgreement from "./UserAgreement";
import {Loading} from "./Loading";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobile: null,
            isPhone: /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/,
        }
        this.OnButton = this.OnButton.bind(this)
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.ListView}>
                    <Text style={styles.LoginTitle}>输入手机号</Text>
                    <Text style={styles.LoginPhone}>中国大陆(+86)</Text>
                    <View style={styles.inputBackColor}>
                        <TextInput
                            style={styles.textInputs}
                            underlineColorAndroid='transparent'
                            maxLength={11}
                            keyboardType={'numeric'}
                            onChangeText={(text) =>this.setState({mobile: text})}
                            value={this.state.mobile}
                            placeholder={'输入手机号'}
                        />
                        {this.state.mobile ?
                            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({mobile: null})}}>
                                <Image style={styles.AssetsTitleRowEyesIcon} source={require('../Image/InputCloseIcon.png')}/>
                            </TouchableOpacity>
                            : null
                        }
                   </View>
                    <View style={{flexDirection: 'row', paddingTop: 10,}}>
                        <Text style={styles.LoginBottomLeft}>注册即表示您同意</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onUserAgreement.bind(this, '用户使用协议')}>
                            <Text style={styles.LoginBottomRight}>《用户使用协议》</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.LoginButton}>
                    {
                        !this.state.mobile ?
                            <View style={[styles.buttonStyle, styles.isButton]}>
                                <Text style={styles.ButtonText}>注册/登录</Text>
                            </View>
                            :
                            <TouchableOpacity activeOpacity={0.5} onPress={this.OnButton}>
                                <View style={[styles.buttonStyle, styles.Button]}>
                                    <Text style={styles.ButtonText}>注册/登录</Text>
                                </View>
                            </TouchableOpacity>

                    }

                </View>
            </View>
        );
    }
    // 用户使用协议
    onUserAgreement (record) {
        this.props.navigation.navigate('UserAgreement', {name: record})
    }
    //  点击注册/登录
    OnButton () {
        if (!this.state.isPhone.test(this.state.mobile)) {
            Loading.Toast('请输入正确的手机号码')
        } else {
            this.props.navigation.navigate('VerificationCode', {mobile: this.state.mobile})
        }

    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    ListView: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    LoginTitle: {
        paddingTop: 80,
        fontSize: Utils.setSpText(35),
        color: '#000',
        fontWeight: 'bold',
    },
    LoginPhone: {
        paddingTop: 20,
        color: '#327CC4',
        fontSize: Utils.setSpText(16)
    },
    inputBackColor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#EFF0F3',
        borderRadius: 5,
        width: Utils.size.width - 30,
        height: 50,
    },
    textInputs: {
        flex: 1,
        fontSize: Utils.setSpText(20),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    AssetsTitleRowEyesIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    LoginBottomLeft: {
        color: '#BFC0BF',
        fontSize: Utils.setSpText(13)
    },
    LoginBottomRight: {
        paddingLeft: 10,
        color: '#327CC4',
        fontSize: Utils.setSpText(13)
    },
    LoginButton: {
        paddingTop: 50,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 15,
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        width: 100,
    },
    isButton: {
        backgroundColor: '#9AC7FF'
    },
    Button: {
        backgroundColor: '#3375FD'
    },
    ButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(15)
    }
})


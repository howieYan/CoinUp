/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class MobilePhoneNo extends Component {
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
            mobile: null,
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.PhoneList}>
                    <Text style={styles.PhoneText}>当前手机号: {this.getSubstr(this.props.navigation.state.params.RightName)}</Text>
                    <Text style={styles.PhoneTextContent}>一个手机号只能绑定一个账号。更换手机号后，下次登录可使用新手机号登录</Text>
                    <View style={styles.PhoneInput}>
                        <Text>手机号码</Text>
                        <View style={{
                            marginTop: 5,
                            borderBottomColor: '#F2F1F2',
                            borderBottomWidth: 1 }}>
                            <TextInput
                                style={styles.textInputs}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) =>this.setState({mobile: text})}
                                value={this.state.mobile}
                                keyboardType={'numeric'}
                                maxLength={11}
                                // secureTextEntry={true}
                                placeholder={'请输入手机号码'}
                            />
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.onTheNextStep.bind(this,)}>
                                <View style={[styles.bottomButton, this.state.mobile ? styles.Button : styles.isButton ]}>
                                   <Text style={styles.ButtonText}>下一步</Text>
                               </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*<TouchableOpacity activeOpacity={0.5} onPress={this.onCell.bind(this,)}>*/}
                        {/*<Text style={styles.PhoneEvent}>原手机号码可以收到验证码</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        );
    }
    getSubstr (str) {
        let data = str.substr(0,3)+"****"+str.substr(7);
        return data
    }
    onTheNextStep () {
        if (!this.state.mobile) {
            Loading.Toast('请填写手机号码')
        } else {
            this.props.navigation.navigate('TheNextStep', {name: '验证码',mobile: this.state.mobile})
        }

    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    PhoneList: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    PhoneText: {
        paddingTop: 20,
    },
    PhoneTextContent: {
        lineHeight: 20,
    },
    PhoneEvent: {
        paddingTop: 50,
        color: '#2256B6',
        fontSize: Utils.setSpText(16)
    },
    PhoneInput: {
        paddingTop: 30,
    },
    textInputs: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    bottom: {
        marginTop: 40,
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 3,
        width: Utils.size.width - 20,
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


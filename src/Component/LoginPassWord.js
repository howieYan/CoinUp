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
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Utils from "./Utils";
import {Loading} from "./Loading";

export default class LoginPassWord extends Component {
    static navigationOptions = ({navigation}) => ({
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
        this.state= {
            pwd: null,
            isPwd: true,
        }
        this.OnButton = this.OnButton.bind(this)
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.inputList}>
                    <Text style={styles.LoginTitle}>输入登录密码</Text>
                    <View style={styles.inputBackColor}>
                        <TextInput
                            style={styles.textInputs}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) =>this.setState({pwd: text})}
                            value={this.state.pwd}
                            secureTextEntry={this.state.isPwd}
                            placeholder={'输入密码'}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({isPwd: !this.state.isPwd})}}>
                            <Image style={styles.AssetsTitleRowEyesIcon} source={!this.state.isPwd ? require('../Image/Home/EyesIcon.png'): require('../Image/Home/EyesIconClose.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        {
                            !this.state.pwd ?
                                <View style={[styles.bottomButton, styles.isButton]}>
                                    <Text style={styles.ButtonText}>登录</Text>
                                </View>
                                :
                                <TouchableOpacity activeOpacity={0.5} onPress={this.OnButton}>
                                    <View style={[styles.bottomButton, styles.Button]}>
                                        <Text style={styles.ButtonText}>登录</Text>
                                    </View>
                                </TouchableOpacity>

                        }
                    </View>

                </View>

            </View>
        );
    }
    OnButton () {
        let {mobile, verifyCode} = this.props.navigation.state.params
        if (!this.state.pwd) {
            Loading.Toast('请输入密码')
        } else {
            this.LoadLogin(mobile, verifyCode, this.state.pwd);
        }
    }
    async LoadLogin (mobile, verifyCode, pwd) {
        try {
            let formData = new FormData();
            formData.append('mobile', mobile);
            formData.append('verifyCode', verifyCode);
            formData.append('pwd', pwd);
            console.log(formData)
            let data = await Utils.LoadPost(Utils.size.url + '/api/auth/login', formData);
            console.log(data);
            if (Number(data.code === 0)) {
                AsyncStorage.setItem('Uid', data.result.user_id);
                AsyncStorage.setItem('pwd', pwd);
                this.props.navigation.navigate('TabBar')
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginTitle: {
        paddingTop: 20,
        fontSize: Utils.setSpText(35),
        color: '#000',
        fontWeight: 'bold',
    },
    inputList: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
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
        fontSize: Utils.setSpText(16),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    AssetsTitleRowEyesIcon: {
        width: 15,
        marginRight: 10,
        height: 15,
    },
    inputBottomText: {
        marginTop: 15,
        color: '#8E8F8E',
        fontSize: Utils.setSpText(12),
    },
    bottom: {
        marginTop: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bottomButton: {
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


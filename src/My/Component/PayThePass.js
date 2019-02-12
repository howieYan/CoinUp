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
    TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class PayThePass extends Component {
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
        this.state= {
            pwd: null,
            isPwd: true,
            isEyes: true,
            plPwd: null,
        }
        this.onSublime = this.onSublime.bind(this)
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.inputList}>
                    <View style={styles.inputBackColor}>
                        <TextInput
                            style={styles.textInputs}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) =>this.setState({pwd: text})}
                            value={this.state.pwd}
                            secureTextEntry={this.state.isPwd}
                            placeholder={'输入新支付密码'}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({isPwd: !this.state.isEyes})}}>
                            <Image style={styles.AssetsTitleRowEyesIcon} source={!this.state.isPwd ? require('../../Image/Home/EyesIcon.png'): require('../../Image/Home/EyesIconClose.png')}/>
                        </TouchableOpacity>
                   </View>
                   <View style={styles.inputBackColor}>
                       <TextInput
                           style={styles.textInputs}
                           underlineColorAndroid='transparent'
                           onChangeText={(text) =>this.setState({plPwd: text})}
                           value={this.state.plPwd}
                           secureTextEntry={this.state.isEyes}
                           placeholder={'重复输入新支付密码'}
                       />
                       <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({isEyes: !this.state.isEyes})}}>
                           <Image style={styles.AssetsTitleRowEyesIcon} source={!this.state.isEyes ? require('../../Image/Home/EyesIcon.png'): require('../../Image/Home/EyesIconClose.png')}/>
                       </TouchableOpacity>
                   </View>
                   <Text style={styles.inputBottomText}> 支付密码至少6位，可以是字母、数字及其他符号的组合。</Text>
                    <View style={styles.bottom}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onSublime}>
                            <View style={[styles.bottomButton, this.state.pwd && this.state.plPwd ? styles.Button : styles.isButton ]}>
                                <Text style={styles.ButtonText}>完成</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
    onSublime () {
       if (this.state.pwd && this.state.plPwd) {
           if (!this.state.pwd) {
               Loading.Toast('请输入新密码')
           } else if (!this.state.plPwd) {
               Loading.Toast('请重复输入新密码')
           } else if (this.state.pwd !== this.state.plPwd) {
               Loading.Toast('新密码和重复新密码不一致')
           } else {
               this.LoadData()
           }
       }
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.goBack()
    }
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('pwd', this.state.pwd);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/setPayPwd', formData)
            console.log(data)
            if (Number(data.code === 0)) {
                Loading.Toast('修改密码成功');
                this.onBackButton()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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


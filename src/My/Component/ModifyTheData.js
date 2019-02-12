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
    TouchableOpacity,
    Image,
    ScrollView, AsyncStorage
} from 'react-native';
import  ImagePicker  from 'react-native-image-picker';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class ModifyTheData extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: this.props.navigation.state.params.data.avatar,
            nickname: this.props.navigation.state.params.data.nickname,
            alipay: this.props.navigation.state.params.data.alipay,
            email: this.props.navigation.state.params.data.email,
            sex: this.props.navigation.state.params.data.sex,
            depositBank: this.props.navigation.state.params.data.deposit_bank,
            accountNumber: this.props.navigation.state.params.data.account_number,
            houseName: this.props.navigation.state.params.data.house_name,
            wechatNumber: this.props.navigation.state.params.data.wechat_number,
        }
        this.onBackButton = this.onBackButton.bind(this)
        this.onAvatarButton = this.onAvatarButton.bind(this)
        this.onSublime = this.onSublime.bind(this)
    }
    componentDidMount () {
        console.log(this.props.navigation.state.params.data)
    }
    render() {
        let {avatar, nickname, alipay, email, sex, depositBank, accountNumber, houseName, wechatNumber} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{this.props.navigation.state.params.name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onSublime}>
                        <View style={styles.headersRight}>
                            <Text style={[styles.headersRightText, avatar && nickname && email && sex && depositBank && accountNumber && houseName && wechatNumber ? styles.headersRightText : styles.headersRightTexts]}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.ListView}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onAvatarButton}>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.ListCellLeftAvatarText}>头像</Text>
                                </View>
                                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                    <Image style={styles.ListCellLeftAvatar} source={avatar ? {uri: avatar }: require('../../Image/My/UserActiver.png')}/>
                                    <Image style={styles.ListCellLeftRightIcon} source={require('../../Image/My/RightIcon.png')}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>昵称</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                <TextInput
                                    style={styles.textInputs}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) =>this.setState({nickname: text})}
                                    value={nickname}
                                    placeholder={'输入昵称'}
                                />
                                {this.state.nickname ?
                                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({nickname: null})}}>
                                        <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>支付宝账号</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                               <TextInput
                                   style={styles.textInputs}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) =>this.setState({alipay: text})}
                                   value={alipay}
                                   placeholder={'输入支付宝账号'}
                               />
                               {this.state.alipay ?
                                   <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({alipay: null})}}>
                                       <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                   </TouchableOpacity>
                                   : null
                               }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>邮箱账号</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                               <TextInput
                                   style={styles.textInputs}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) =>this.setState({email: text})}
                                   value={email}
                                   placeholder={'输入邮箱账号'}
                               />
                               {this.state.alipay ?
                                   <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({email: null})}}>
                                       <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                   </TouchableOpacity>
                                   : null
                               }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>性别</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end',flex: 1}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({sex: 1})}}>
                                    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                        <Image style={styles.ListCellRightIcon} source={Number(sex) === 1 ? require('../../Image/My/SexActiver.png'): require('../../Image/My/Sex.png')}/>
                                        <Text style={styles.ListCellRightIconText}>男</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end',flex: 1}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({sex: 2})}}>
                                    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                        <Image style={styles.ListCellRightIcon} source={Number(sex) === 2 ? require('../../Image/My/SexActiver.png'): require('../../Image/My/Sex.png')}/>
                                        <Text style={styles.ListCellRightIconText}>女</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end',flex: 1}}>
                                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({sex: 3})}}>
                                    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                        <Image style={styles.ListCellRightIcon} source={Number(sex) === 3 ? require('../../Image/My/SexActiver.png'): require('../../Image/My/Sex.png')}/>
                                        <Text style={styles.ListCellRightIconText}>保密</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>开户行</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                               <TextInput
                                   style={styles.textInputs}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) =>this.setState({depositBank: text})}
                                   value={depositBank}
                                   placeholder={'输入开户行'}
                               />
                               {this.state.alipay ?
                                   <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({depositBank: null})}}>
                                       <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                   </TouchableOpacity>
                                   : null
                               }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>银行卡号</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                               <TextInput
                                   style={styles.textInputs}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(text) =>this.setState({accountNumber: text})}
                                   value={accountNumber}
                                   placeholder={'输入银行卡号'}
                               />
                               {this.state.alipay ?
                                   <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({accountNumber: null})}}>
                                       <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                   </TouchableOpacity>
                                   : null
                               }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>户主姓名</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                  <TextInput
                                      style={styles.textInputs}
                                      underlineColorAndroid='transparent'
                                      onChangeText={(text) =>this.setState({houseName: text})}
                                      value={houseName}
                                      placeholder={'输入户主姓名'}
                                  />
                                  {this.state.alipay ?
                                      <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({houseName: null})}}>
                                          <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                      </TouchableOpacity>
                                      : null
                                  }
                            </View>
                        </View>
                        <View style={styles.ListCell}>
                            <View style={styles.ListCellLeft}>
                                <Text style={styles.ListCellLeftAvatarText}>微信号码</Text>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                                  <TextInput
                                      style={styles.textInputs}
                                      underlineColorAndroid='transparent'
                                      onChangeText={(text) =>this.setState({wechatNumber: text})}
                                      value={wechatNumber}
                                      placeholder={'输入微信号码'}
                                  />
                                  {this.state.alipay ?
                                      <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({wechatNumber: null})}}>
                                          <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                      </TouchableOpacity>
                                      : null
                                  }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    onBackButton () {
        this.props.navigation.state.params.RecodeLoad()
        this.props.navigation.goBack();
    }
    onAvatarButton () {
        let options = {
            //底部弹出框选项
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 200,
            maxHeight: 200,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                cameraRoll: true,
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let file;
                if(Utils.size.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }
                this.fetchImage(response, file);
            }
        });
    }
    async fetchImage (response, record) {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('fileType', 'avatar');
            formData.append('filename', { uri: Utils.size.os === 'ios' ? record : response.uri, name: record, type: 'image/jpg' });
            console.log(formData);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/upload', formData);
            console.log(data)
            if (Number(data.code) === 0) {
                this.setState({
                    avatar: data.result.fullPath
                })
                Loading.Toast('上传成功');
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async onSublime () {
        try {
            let {avatar, nickname, alipay, email, sex, depositBank, accountNumber, houseName, wechatNumber} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('avatar', avatar);
            formData.append('nickname', nickname);
            formData.append('alipay', alipay);
            formData.append('email', email);
            formData.append('sex', sex);
            formData.append('depositBank', depositBank);
            formData.append('accountNumber', accountNumber);
            formData.append('houseName', houseName);
            formData.append('wechatNumber', wechatNumber);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/setProfile', formData);
            if (Number(data.code) === 0) {
                Loading.Toast('保存成功');
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
    },
    headers: {
        width: Utils.size.width,
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 30 : 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    headersLeft: {
        width: 50,
    },
    headersLeftIcon: {
        width: 20,
        height: 20,
    },
    headersCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headersCenterLeftText: {
        fontSize:Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    ListView: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    ListCell: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListCellLeft: {
        width: 120
    },
    ListCellLeftAvatarText: {
        color: '#000',
        fontSize: Utils.setSpText(16)
    },
    ListCellLeftAvatar: {
        marginRight: 10,
        marginLeft: 10,
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    ListCellLeftRightIcon: {
        width: 20,
        height: 20,
    },
    headersRightTexts: {
        color: '#9AC7FF',
        fontSize: Utils.setSpText(16)
    },
    headersRightText: {
        color: '#327CC4',
        fontSize: Utils.setSpText(16)
    },
    ListCellLeftRightText: {
        color: '#DADBDA',
        fontSize: Utils.setSpText(16)
    },
    textInputs: {
        flex: 1,
        fontSize: Utils.setSpText(14),
        paddingLeft: 10,
        alignItems: 'flex-end',
    },
    AssetsTitleRowEyesIcon: {
        width: 20,
        height: 20,
    },
    ListCellRightIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    ListCellRightIconText: {
        fontSize: Utils.setSpText(14),
        color: '#000'
    }
})


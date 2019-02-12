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
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import  ImagePicker  from 'react-native-image-picker';
import {Loading } from '../../Component/Loading'
export default class IdentityCardReg extends Component {
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
            cardPositive: null,
            cardReverse: null,
            cardName: null,
            cardAddress: null,
            cardNo: null
        }
        this.onBottomThsNext = this.onBottomThsNext.bind(this)
    }
    render() {
        let  {cardPositive, cardReverse, cardName, cardAddress, cardNo } = this.state
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.ListView}>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._imagePicker.bind(this)}>
                               <View style={[styles.IdCardFrontOf, styles.IdCardFrontOfS]}>
                                   {cardPositive ?
                                       <Image style={styles.IdCardFrontOfImg} source={{uri: cardPositive}}/>
                                       :
                                       <Image style={styles.IdCardFrontOfImgRequire} source={require('../../Image/My/AddIdCardIcon.png')}/>
                                   }
                               </View>
                           </TouchableOpacity>
                           <Text style={styles.IdCardFrontOfText}>身份证正面</Text>
                           <TouchableOpacity activeOpacity={0.8} onPress={this._imagePickerId.bind(this)}>
                           <View style={[styles.IdCardFrontOf,styles.IdCardFrontOfS]}>
                               {cardReverse ?
                                   <Image style={styles.IdCardFrontOfImg} source={{uri: cardReverse}}/>
                                   :
                                   <Image style={styles.IdCardFrontOfImgRequire} source={require('../../Image/My/AddIdCardIcon.png')}/>
                               }
                           </View>
                           </TouchableOpacity>
                           <Text style={styles.IdCardFrontOfText}>身份证反面</Text>
                           <View style={styles.inputBackColor}>
                               <TextInput
                                  style={styles.textInputs}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text) =>this.setState({cardName: text})}
                                  value={cardName}
                                  placeholder={'输入姓名'}
                               />
                               {cardName ?
                                  <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({cardName: null})}}>
                                      <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                  </TouchableOpacity>
                                  : null
                               }
                           </View>
                           <View style={styles.inputBackColor}>
                               <TextInput
                                  style={styles.textInputs}
                                  underlineColorAndroid='transparent'
                                  onChangeText={(text) =>this.setState({cardAddress: text})}
                                  value={cardAddress}
                                  placeholder={'输入住址'}
                               />
                               {cardAddress ?
                                  <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({cardAddress: null})}}>
                                      <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                  </TouchableOpacity>
                                  : null
                               }
                           </View>
                           <View style={styles.inputBackColor}>
                               <TextInput
                                  style={styles.textInputs}
                                  underlineColorAndroid='transparent'
                                  maxLength={18}
                                  onChangeText={(text) =>this.setState({cardNo: text})}
                                  value={cardNo}
                                  placeholder={'输入证件号'}
                               />
                               {cardNo ?
                                  <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.setState({cardNo: null})}}>
                                      <Image style={styles.AssetsTitleRowEyesIcon} source={require('../../Image/InputCloseIcon.png')}/>
                                  </TouchableOpacity>
                                  : null
                               }
                           </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.onBottomThsNext}>
                                <View style={[styles.buttonStyle, cardPositive && cardReverse && cardName && cardAddress && cardNo ? styles.Button : styles.isButton]}>
                                   <Text style={styles.BottomThsNextText}>提交</Text>
                                </View>
                            </TouchableOpacity>

                       </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
    // 身份证正面
    _imagePicker () {
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
                this._fetchImage(response, file);
            }
        });
    }
    // 上传身份证正面
    async _fetchImage (response, record) {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('fileType', 'license');
            formData.append('filename', { uri: Utils.size.os === 'ios' ? record : response.uri, name: record, type: 'image/jpg' });
            console.log(formData);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/upload', formData);
            console.log(data)
            if (Number(data.code) === 0) {
                this.setState({
                    cardPositive: data.result.fullPath
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
    // 身份证反面
    _imagePickerId () {
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
                this._fetchImageId(response, file);
            }
        });
    }
    // 上传身份证反面
    async _fetchImageId (response, record) {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('fileType', 'license');
            formData.append('filename', { uri: Utils.size.os === 'ios' ? record : response.uri, name: record, type: 'image/jpg' });
            console.log(formData);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/upload', formData);
            console.log(data)
            if (Number(data.code) === 0) {
                this.setState({
                    cardReverse: data.result.fullPath
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
    // 提交
    onBottomThsNext () {
        if (!this.state.cardPositive) {
            Loading.Toast('请上传身份证正面')
        } else if (!this.state.cardReverse) {
            Loading.Toast('请上传身份证反面')
        } else if (!this.state.cardName) {
            Loading.Toast('请输入姓名')
        } else if (!this.state.cardAddress) {
            Loading.Toast('请输入住址')
        } else if (!this.state.cardNo) {
            Loading.Toast('请输入证件号')
        } else {
            this.LoadData()
        }
    }
    // 提交接口
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('cardPositive', this.state.cardPositive);
            formData.append('cardReverse', this.state.cardReverse);
            formData.append('cardName', this.state.cardName);
            formData.append('cardAddress', this.state.cardAddress);
            formData.append('cardNo', this.state.cardNo);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/attestation', formData);
            console.log(data)
            if (Number(data.code) === 0) {
                Loading.Toast('等待工作人员验证');
                this.onBack()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    onBack () {
        this.props.navigation.state.params.RecodeLoad()
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
    },
    ListView: {
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center'
    },
    IdCardFrontOf: {
        borderColor: '#EFF0EF',
        borderWidth: 1,
        width: Utils.size.width - 30,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IdCardFrontOfImg: {
        width: Utils.size.width - 30,
        height: 150,
    },
    IdCardFrontOfImgRequire: {
        width: 60,
        height: 60,
    },
    IdCardFrontOfText: {
        paddingTop: 10,
        color: '#A3A4A3',
        fontSize: Utils.setSpText(16),
    },
    IdCardFrontOfS: {
        marginTop: 10,
    },
    BottomThsNext: {
        backgroundColor: '#327CC4',
        width: Utils.size.width - 30,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomThsNextText: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
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
    buttonStyle: {
        marginTop: 10,
        width: Utils.size.width - 30,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
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


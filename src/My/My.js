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
    ScrollView,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from "../Component/Utils";
import {Loading} from "../Component/Loading";
import DeviceInfo from "react-native-device-info";
export default class My extends Component {
    constructor(props){
        super(props);
        this.state = {
            CurrencyName: 'CNY',
            data: {},
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/getInfo', formData);
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
                <View style={styles.HeaderStyle}>
                    <Text style={styles.HeaderStyleText}>我</Text>
                </View>
                <ScrollView>
                    <View style={styles.UserList}>
                        <View style={styles.UserNameStyle}>
                            <Image style={styles.UserActiverStyle} source={this.state.data.avatar ? {uri: this.state.data.avatar }: require('../Image/My/UserActiver.png')}/>
                            <View style={[styles.content, styles.UserHeaderName]}>
                                <Text style={styles.UserHeaderNameUid}>UID:{this.state.data.user_id}</Text>
                                <Text style={styles.UserHeaderNameText} numberOfLines={1}>{this.state.data.nickname}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.onHeader.bind(this,)}>
                                <View style={styles.UserHeaderRight}>
                                    <Text style={styles.UserHeaderRightText}>修改资料</Text>
                                    <Image style={styles.UserHeaderRightIcon} source={require('../Image/My/RightIcon.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.renderList()}
                    </View>
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let List = [];
        let Array = [
            {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/Qrcode.png'),name: '我的二维码', RightName: '', Component: 'MyQrCode'},
            {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/AssetsIcon.png'),name: '我的资产', RightName: '', Component: 'MyAssets' },
            // {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/MyCOINSRing.png'),name: '我的币圈',  RightName: '' , Component: 'MyCoinRing'},
            {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/RealNameIcon.png'),name: '实名认证',  RightName: Number(this.state.data.card_status) === 0 ? '未认证' : '已认证', Component: 'RealName' },
            {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/SetupThe.png'),name: '设置',  RightName: '版本:' + DeviceInfo.getVersion(), Component: 'SetupThe' },
            {RightImg: require('../Image/My/RightIcon.png'), img: require('../Image/My/CurrencyIcon.png'),name: '本地货币',  RightName: this.state.CurrencyName, Component: 'Currency' },
        ]
        Array.forEach((v, i) => {
            List.push(
                <TouchableOpacity activeOpacity={0.5} key={i}  onPress={this.onCell.bind(this, v)}>
                    <View style={styles.MyCell}>
                        <Image style={styles.UserHeaderRightIcon} source={v.img}/>
                        <View style={{flex: 1}}>
                            <Text style={styles.MyCellText}>{v.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            {v.RightName ? <Text style={styles.MyCellRightName}>{v.RightName}</Text>: null}
                            <Image style={styles.UserHeaderRightIcon} source={v.RightImg}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return List
    }
    onCell (record) {
        this.props.navigation.navigate(record.Component, {name: record.name, data: this.state.data, RecodeLoad: (code) => {
            this.setState({
                CurrencyName: code
            })}})
    }
    onHeader () {
        this.props.navigation.navigate('ModifyTheData', {name: '修改资料', data: this.state.data, RecodeLoad: () => {this.LoadData()}})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    HeaderStyle: {
        width: Utils.size.width,
        zIndex: 10,
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 25 : 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    HeaderStyleText: {
        fontSize: Utils.setSpText(18),
        color: '#000'
    },
    UserList: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    UserNameStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    UserActiverBackColor: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CFD0CF',
        borderRadius: 35,
    },
    UserActiverStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    UserHeaderName: {
        paddingLeft: 15,
    },
    UserHeaderNameText: {
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    UserHeaderNameUid: {
        paddingTop: 5,
        color: '#7A7B7A',
        fontSize: Utils.setSpText(14),
    },
    UserHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    UserHeaderRightText: {
        color: '#7A7B7A',
        fontSize: Utils.setSpText(16),
    },
    UserHeaderRightIcon:{
        width: 20,
        height: 20,
    },
    MyCell: {
        paddingTop:20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    MyCellText: {
        paddingLeft: 20,
        color: '#000',
        fontSize:Utils.setSpText(17),
    },
    MyCellRightName: {
        color: '#9E9DA1',
        fontSize:Utils.setSpText(15),
    }
})


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
    Image,
    ScrollView, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class SetupThe extends Component {
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
            isCurrency: 0,
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
            <View style={[styles.content,styles.contentBG]}>
                <ScrollView>
                    {this.renderList()}
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onClose.bind(this)}>
                        <View style={styles.CloseAppStyle}>
                            <Text style={styles.CloseAppStyleText}>退出登录</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let List = [];
        let Array = [
            {name: '登录密码',RightImg: require('../../Image/My/RightIcon.png'),RightName: '', img: require('../../Image/My/LoginPass.png'), Component: 'TheLoginPass'},
            {name: '支付密码',RightImg: require('../../Image/My/RightIcon.png'),RightName: '', img: require('../../Image/My/PayPass.png'), Component: 'PayThePass'},
            {name: '手机号',RightImg: require('../../Image/My/RightIcon.png'),RightName: this.state.data.phone, img: require('../../Image/My/PhoneIcon.png'),Component: 'MobilePhoneNo'},
            // {name: '语言',RightImg: require('../../Image/My/RightIcon.png'),RightName: '', img: require('../../Image/My/Qrcode.png'),},
        ];
        Array.forEach((v, i) => {
            List.push(
                <TouchableOpacity activeOpacity={0.5} key={i} onPress={this.onCell.bind(this, v)}>
                    <View style={styles.CellList}>
                        <View style={[styles.CurrencyCell]}>
                            <Image style={styles.CurrencyCellLeftIcon} source={v.img}/>
                            <View style={styles.content}>
                                <Text style={styles.CurrencyCellName}>{v.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                               {v.RightName ? <Text style={styles.MyCellRightName}>{this.getSubstr(v.RightName)}</Text>: null}
                               <Image style={styles.UserHeaderRightIcon} source={v.RightImg}/>
                           </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return List;
    }
    getSubstr (str) {
        let data = str.substr(0,3)+"****"+str.substr(7);
        return data

    }
    onCell (record) {
        this.props.navigation.navigate(record.Component, {name: record.name, RightName: record.RightName})
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.state.params.RecodeLoad(record)
        this.props.navigation.goBack()
    }
    // 退出登录
    onClose () {
        AsyncStorage.removeItem('Uid');
        AsyncStorage.removeItem('pwd');
        this.props.navigation.navigate('Login')
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contentBG: {
        backgroundColor: '#f5f5f5',
    },
    CellList: {
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff'
    },
    CurrencyCell: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    CurrencyCellName: {
        paddingLeft: 10,
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    CurrencyCellIcon: {
        width: 20,
        height: 20,
    },
    UserHeaderRightIcon:{
       width: 20,
       height: 20,
    },
    CurrencyCellLeftIcon: {
        width: 30,
        height: 30,
        borderRadius: 3,
    },
    CloseAppStyle: {
        marginTop: 20,
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    // MyCellRightName: {
    //     width: 80,
    // },
    CloseAppStyleText: {
        color: '#000',
        fontSize: Utils.setSpText(16)
    }
})


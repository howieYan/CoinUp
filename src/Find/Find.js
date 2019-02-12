/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Utils from "../Component/Utils";
import ActionButton from "react-native-action-button";
export default class Find extends Component {
    actionButtonView;
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <View style={styles.headersLeft}/>
                    <View style={styles.headersFlex}>
                        <Text style={styles.headersTitle}>发现</Text>
                    </View>
                    <View style={styles.headersRight}>
                        <Image style={styles.headersRightUserActiver} source={require('../Image/My/UserActiver.png')}/>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.ListView}>
                           <Image style={styles.ListViewUserActiver} source={require('../Image/My/UserActiver.png')}/>
                           <View style={{flex: 1,paddingLeft: 10,}}>
                               <View style={styles.ListViewHeader}>
                                   <View style={{flex: 1}}>
                                       <Text style={styles.UserName}>老王</Text>
                                   </View>
                                   <View style={styles.ListViewHeaderRight}>
                                       <Text style={styles.ListViewHeaderRightTime}>15小时前</Text>
                                       <Image style={styles.UserHeaderRightIcon} source={require('../Image/My/RightIcon.png')}/>
                                   </View>
                               </View>
                               <Text style={styles.ListViewContent}>
                                   道德经思考就发生了克己
                                   复礼手机地方老师江东父
                                   老是大家放松付款时间发来
                                   的手机发来的将雷锋精神独
                                   立房间的付款时都会分开
                               </Text>
                               <View style={styles.ListViewImg}>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                                   <Image style={styles.ListViewImgItems} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544676296954&di=83451aa1abdb8b64bb15f4e5bc3a1d6e&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201803%2F20180301111356456.jpg'}}/>
                               </View>
                           </View>

                       </View>
                    </View>
                </ScrollView>
                <ActionButton
                    position={'right'}
                    offsetY={50}
                    buttonColor="#E62324"
                    renderIcon={() => (
                        <View style={styles.actionButtonView}>
                            <Image style={{width: 20, height: 20}} source={require('../Image/Find/ActionButton.png')}/>
                        </View>
                    )}
                    onPress={() => {}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    headers: {
        flexDirection: 'row',
        alignItems: 'center',
        height: (Utils.size.os === 'ios') ? 74 : 42,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 25 : 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    headersLeft: {
        width: 50,
    },
    headersRight: {
        width: 50,
        alignItems: 'flex-end'
    },
    headersRightUserActiver: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15
    },
    headersFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headersTitle: {
        color: '#000',
        fontSize: Utils.setSpText(18),
    },
    UserHeaderRightIcon:{
        width: 20,
        height: 20,
    },
    ListView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
        flexDirection: 'row',
    },
    ListViewUserActiver: {
        width: 40,
        height:40,
        borderRadius: 20,
    },
    ListViewHeader: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    UserName: {
        color: '#000',
        fontSize: Utils.setSpText(14),
        fontWeight: 'bold'
    },
    ListViewHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ListViewHeaderRightTime: {
        fontSize: Utils.setSpText(14),
        color: '#7A7B7A'
    },
    ListViewContent: {
        lineHeight: 20,
        fontSize: Utils.setSpText(15),
        color: '#2b2b2b'
    },
    ListViewImg: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    ListViewImgItems: {
        width: (Utils.size.width - 90) / 3,
        height: 80,
        marginRight: 5,
        marginBottom: 5,
    }
})


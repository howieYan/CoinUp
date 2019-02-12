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
    ScrollView
} from 'react-native';
import Utils from "../../Component/Utils";

export default class MyCoinRing extends Component {
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
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.UserList}>
                    <View style={styles.UserNameStyle}>
                        <Image style={styles.UserActiverStyle} source={require('../../Image/My/UserActiver.png')}/>
                        <View style={[styles.content, styles.UserHeaderName]}>
                            <Text style={styles.UserHeaderNameText}>老王</Text>
                            <Text style={styles.UserHeaderNameUid}>243667434</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}>
                            <View style={styles.UserHeaderRight}>
                                <Image style={styles.UserHeaderRightIcon} source={require('../../Image/My/RightIcon.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 5,backgroundColor: '#f6f6f6',}}/>
                <ScrollView>
                    <View style={styles.content}>

                        <View style={styles.ListHeadersView}>
                           <Text style={styles.ListHeadersText}>全部币圈{'1'}</Text>
                        </View>
                        <View style={styles.ListView}>
                           <Image style={styles.ListViewUserActiver} source={require('../../Image/My/UserActiver.png')}/>
                           <View style={{flex: 1,paddingLeft: 10,}}>
                               <View style={styles.ListViewHeader}>
                                   <View style={{flex: 1}}>
                                       <Text style={styles.UserName}>老王</Text>
                                   </View>
                                   <View style={styles.ListViewHeaderRight}>
                                       <Text style={styles.ListViewHeaderRightTime}>15小时前</Text>
                                       <Image style={styles.UserHeaderRightIcon} source={require('../../Image/My/RightIcon.png')}/>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    UserList: {
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
    ListHeadersView: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListHeadersText: {
        color: '#000',
        fontSize: Utils.setSpText(16)
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


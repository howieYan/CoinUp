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
    ScrollView,
    Image, TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class MyAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            List: {}
        }
        this.onBackButton = this.onBackButton.bind(this)
        this.onBillButton = this.onBillButton.bind(this)
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/projects/home', formData);
            let dataList = await Utils.LoadPost(Utils.size.url + '/api/projects/getIndex', formData);
            console.log(dataList)
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result,
                    List: dataList.result
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
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../Image/headersLeftIconfff.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>我的资产</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBillButton}>
                        <View style={styles.headersRight}>
                            <Text style={styles.HeaderRightText}>账单</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref='scroll'
                    // onScroll={this.onScroll}
                    scrollEventThrottle={16}
                    contentInset={{top: -500}}
                    contentOffset={{y: 500}}
                >
                    <View style={styles.content}>
                        <View style={styles.HeadersStyle}>
                            <View style={styles.HeadersStyleView}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.HeadersStyleViewText}>总资产约合</Text>
                                </View>
                                <View style={styles.HeadersStyleViewRightView}>
                                    <Image style={styles.HeadersStyleViewRightViewIcon} source={require('../../Image/My/MyAssetsIcon.png')}/>
                                    <Text style={styles.HeadersStyleViewRightViewText}>资产保障中</Text>
                                </View>
                            </View>
                            <View style={styles.HeadersStyleNumber}>
                                <Text style={styles.HeadersStyleNumberText}>{this.state.data.tra}</Text>
                            </View>
                            <Text style={styles.HeadersStyleYue}>≈ {this.state.data.sell} CNY</Text>
                            <View style={styles.HeadersStylePaddRi}>
                                {this.renderList()}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.content}/>
            </View>
        );
    }
    renderList () {
        let List = [];
        let Array = this.state.List
        if (Array.length > 0) {
            Array.forEach((v, i) => {
                List.push(
                    <View style={styles.renderListStyleView} key={i}>
                        <Image style={styles.renderListStyleImage} source={{uri: v.logo}}/>
                        <View style={{flex: 1,justifyContent: 'center',paddingLeft: 10}}>
                            <Text style={styles.renderListStyleText}>{v.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <Text style={styles.renderListStyleRightText}>{v.number}</Text>
                            <Image style={styles.renderListStyleRightImage} source={require('../../Image/My/RightIcon.png')}/>
                        </View>
                    </View>
                )
            })
        }
        return List;
    }
    // 返回
    onBackButton () {
        this.props.navigation.goBack();
    }
    //账单
    onBillButton () {
        this.props.navigation.navigate('BillList', {name: '账单'})
    }
 }

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    HeaderRightText: {
        fontSize: Utils.setSpText(18),
        color: '#fff',
        paddingRight: 10,
    },
    scrollViewStyle: {
        height: 100,
    },
    HeadersStyle: {
        flex: 1,
        backgroundColor: '#3376FD'
    },
    HeadersStyleView: {
        paddingTop: 10,
        paddingLeft: 15,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: Utils.size.os === 'ios' ? 500 : 500,
    },
    HeadersStyleViewText: {
        color: '#64BCF9',
        fontSize: Utils.setSpText(14),
    },
    HeadersStyleViewRightView: {
        backgroundColor: '#fff',
        height: 26,
        alignItems: 'center',
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
        flexDirection: 'row',
    },
    HeadersStyleViewRightViewIcon: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    HeadersStyleViewRightViewText: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: Utils.setSpText(14),
        color: '#466BE8'
    },
    HeadersStyleNumber: {
        paddingTop: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    HeadersStyleNumberText: {
        fontSize: Utils.setSpText(30),
        color: '#fff',
    },
    HeadersStyleNumberName: {
        paddingLeft: 5,
        fontSize: Utils.setSpText(15),
        color: '#fff',
    },
    HeadersStyleYue: {
        paddingTop: 10,
        paddingLeft: 15,
        fontSize: Utils.setSpText(13),
        color: '#fff',
        paddingBottom: 20,
    },
    HeadersStylePaddRi: {
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    renderListStyleView: {
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    renderListStyleImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    renderListStyleText:{
        color: '#000',
        fontSize: Utils.setSpText(18),
    },
    renderListStyleRightText: {
        color: '#000',
        paddingRight: 10,
        fontSize: Utils.setSpText(16),
    },
    renderListStyleRightImage: {
        width: 20,
        height: 20,
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
        backgroundColor: '#3376FD',
        borderBottomWidth: 1,
        borderBottomColor: '#3376FD'
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
        color: '#fff',
    },
    headersRight: {
        width: 50,
    },
})


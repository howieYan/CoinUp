/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, AsyncStorage, ScrollView} from 'react-native';
import Utils from '../../Component/Utils';
import {Loading} from "../../Component/Loading";
export default class Price extends Component {
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
            data: [],
            language: {}
        }
    }
    componentDidMount () {
       this.LoadData();
    }
    async LoadData() {
       try {
           Loading.show('努力加载中...')
           let data = await Utils.LoadGet('https://www.okcoin.com/v2/spot/markets/tickers');
           let result = await Utils.LoadGet('https://www.token.omo.news/api/account/getLang');
           console.log(result);
           console.log(data);
           if (Number(data.code) === 0) {
               this.setState({
                   data: data.data,
               })
               Loading.hidden()
           }
       }
       catch (e) {
           console.log(e);
       }
    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.scrollViewStyle}>
                        { this.renderList() }
                    </View>
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let list = [];
        if (this.state.data.length > 0) {
            this.state.data.forEach((v, i) => {
                list.push(
                    <View style={styles.PriceMainList} key={i}>
                        <View style={styles.PriceMainListLine}>
                            <View style={styles.PriceMainListLineHei}>
                                <View style={styles.PriceMainListLineHeiLeft}>
                                    <Text style={styles.PriceMainListLineHeiLeftTop}>币种</Text>
                                    <Text style={styles.PriceMainListLineHeiLeftBottom}>{v.symbol.toUpperCase()}</Text>
                                </View>
                                <View style={styles.PriceMainListLineHeiCenter}>
                                    <Text style={styles.PriceMainListLineHeiLeftTop}>开盘价</Text>
                                    <Text style={styles.PriceMainListLineHeiLeftBottom}>{v.high}</Text>
                                </View>
                                <View style={styles.PriceMainListLineHeiRight}>
                                    <View style={[v.changePercentage.charAt(0) === '+' ? styles.PriceMainListLineHeiRightButton : styles.PriceMainListLineHeiRightButtonBg, ]}>
                                        <Text style={styles.PriceMainListLineHeiRightButtonText}>{v.changePercentage}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.PriceMainListBottom}>
                            <View style={styles.PriceMainListBottomView}>
                                <Text style={styles.PriceMainListBottomTextStyle}>最高</Text>
                                <Text style={styles.PriceMainListBottomText}>{v.dayHigh}</Text>
                            </View>
                            <View style={styles.PriceMainListBottomView}>
                                <Text style={styles.PriceMainListBottomTextStyle}>最低</Text>
                                <Text style={styles.PriceMainListBottomText}>{v.dayLow}</Text>
                            </View>
                        </View>
                        <View style={{height: 1,backgroundColor: '#EFF0EF',}}/>
                    </View>
                )
            })
        }
        return list;
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    messageHeader: {
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#37474f',
        borderBottomWidth: 1,
        paddingTop: ( Utils.size.os === 'ios') ? 30 : 0,
    },
    headerLeft: {
        width: 40,
    },
    headerRi: {
        width: 40,
    },
    headerRiIm: {
        width: 30,
        height: 25,
    },
    PriceBg: {
        backgroundColor: '#263238',
    },
    messageHeaderTitle: {
        width: Utils.size.width - 80,
        color: '#fff',
        textAlign: 'center',
        fontSize: Utils.setSpText(16),
        fontWeight: 'bold',
    },
    PriceMainTitle: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        borderBottomColor: '#37474f',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    PriceMainTitleHe: {
        height: 40,
    },
    PriceMainPadd: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    PriceMainTitleText: {
        color: '#999999'
    },
    PriceMainTitleTextLeft: {
        width: 100,
    },
    PriceMainTitleTextRight: {
        width: 100,
        textAlign: 'right',
    },
    PriceMainTitleTextCenter: {
        textAlign: 'center',
        width: Utils.size.width -220,
    },
    PriceMainLeft: {
        width: 100,
    },
    scrollViewStyle: {
        // marginTop: (Utils.size.os === 'ios')  ? -20 : 0,
    },
    PriceMainCenter: {
        width: Utils.size.width - 220,
        alignItems: 'center',
    },
    PriceMainRight: {
        width: 100,
    },
    PriceMainNameTop: {
        fontSize: Utils.setSpText(13),
        color: '#8893a5',
    },
    PriceMainNameBott: {
        paddingTop: 10,
        fontSize: Utils.setSpText(16),
        color: '#fff',
    },
    PriceMainRightBuZ: {
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        marginLeft: 25,
        backgroundColor: '#52d869'
    },
    PriceMainRightBuJ: {
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        marginLeft: 25,
        backgroundColor: 'red'
    },
    PriceMainRightBu: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    PriceMainRightBuJia: {
        color: '#fff',
        fontSize: Utils.setSpText(14),
    },
    PriceMainRightBuBai: {
        paddingLeft: 5,
        color: '#fff',
        fontSize: Utils.setSpText(14),
    },
    PriceModalData: {
        width: Utils.size.width - 80,
        position: 'absolute',
        top: Utils.size.height / 2 - Utils.size.height / 8,
        left: Utils.size.width / 2 -  (Utils.size.width - 80) / 2,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    PriceModalAll: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    PriceModalAllHead: {
        height: 40,
        lineHeight: (Utils.size.os === 'ios') ? 40 : 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: Utils.setSpText(16),
    },
    PriceModalAllList: {
        borderBottomWidth: 1,
        borderBottomColor: '#ececec'
    },
    PriceModalAllListTop: {
        borderTopWidth: 1,
        borderTopColor: '#ececec',
    },
    PriceModalAllListText: {
        height: 40,
        lineHeight: (Utils.size.os === 'ios') ? 40 : 30,
        textAlign: 'center',
        color: '#4e5d6f',
        fontSize: Utils.setSpText(15),
    },
    PriceMainList: {
        width: Utils.size.width,
    },
    PriceMainListLine: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#37474f',
    },
    PriceMainListLineHei: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    PriceMainListLineHeiLeft: {
        flex: 3,
    },
    PriceMainListLineHeiLeftTop: {
        color: '#232A32',
        fontSize: Utils.setSpText(13),
    },
    PriceMainListLineHeiLeftBottom: {
        color: '#8A92A0',
        fontSize: Utils.setSpText(15),
    },
    PriceMainListLineHeiCenter: {
        flex: 3,
    },
    PriceMainListLineHeiRight: {
        width: 80,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    PriceMainListLineHeiRightButton: {
        backgroundColor: '#F10020',
        borderRadius: 3,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    PriceMainListLineHeiRightButtonBg: {
        backgroundColor: '#52d869',
        borderRadius: 3,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },

    PriceMainListLineHeiRightButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(13),
    },
    PriceMainListBottom: {
        paddingLeft: 10,
        flex: 1,
        paddingBottom: 10,
    },
    PriceMainListBottomView: {
        paddingTop: 10,
        flexDirection: 'row',
    },
    PriceMainListBottomTextStyle: {
        width: 80,
        color: '#8A92A0',
        fontSize: Utils.setSpText(14),
    },
    PriceMainListBottomText: {
        paddingLeft: 10,
        color: '#232A32',
        fontSize: Utils.setSpText(13),
    }
})


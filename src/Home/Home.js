/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from '../Component/Utils';
import Banner from '../Component/Banner';
import RichScanCom from "./Component/RichScanCom";
import {Loading} from "../Component/Loading";

export default class Home extends Component {
    mounted = false;

    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            isEyes: false,
            data: {},
            List: {}
        }
        this.onMyQrCode = this.onMyQrCode.bind(this)
        this.onTransfer = this.onTransfer.bind(this)
        this.onRichScanCom = this.onRichScanCom.bind(this)
    }

    onScroll = (event) => {
        let Y = event.nativeEvent.contentOffset.y;
        let st
        if (Y < 600) {
            st = Y * 0;
        } else {
            st = 1;
        }
        this.setState({
            opacity: st
        })
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentWillMount() {
        this.mounted = true;
        this.LoadData()
    }

    async LoadData() {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/projects/home', formData);
            let dataList = await Utils.LoadPost(Utils.size.url + '/api/projects/getIndex', formData);
            console.log(dataList)
            if (Number(data.code === 0)) {
                if (this.mounted) {
                    this.setState({
                        data: data.result,
                        List: dataList.result
                    })
                }

            } else {
                Loading.Toast(data.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.HeaderStyle,]}>
                    <View style={styles.SearchBackColor}>
                        <Image style={styles.SearchIcon} source={require('../Image/Home/SearchIcon.png')}/>
                        <Text style={styles.SearchText}>搜索关键字</Text>
                    </View>
                </View>
                <ScrollView
                    ref='scroll'
                    onScroll={this.onScroll}
                    scrollEventThrottle={16}
                    contentInset={{top: -500}}
                    contentOffset={{y: 500}}
                >
                    <View style={styles.content}>
                        <View style={styles.HeaderNav}>
                            <View style={styles.HeaderWidthStyle}>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onRichScanCom}
                                                  style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                    <Image style={styles.HeaderStyleIcon}
                                           source={require('../Image/Home/ScanIcon.png')}/>
                                    <Text style={styles.HeaderStyleText}>扫一扫</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.HeaderWidthStyle}>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onTransfer}
                                                  style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                    <Image style={styles.HeaderStyleIcon}
                                           source={require('../Image/Home/CreditIcon.png')}/>
                                    <Text style={styles.HeaderStyleText}>转账</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.HeaderWidthStyle}>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onMyQrCode}
                                                  style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                    <Image style={styles.HeaderStyleIcon}
                                           source={require('../Image/Home/TansferIcon.png')}/>
                                    <Text style={styles.HeaderStyleText}>收款</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Banner/>
                        <View style={{backgroundColor: '#F5F6F5', height: 10, flex: 1,}}/>
                        <View style={styles.EventContent}>
                            <View style={[styles.EventContentView, styles.borderRight, styles.borderBottom]}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={this.onTradingDigitalCurrency.bind(this,)}>
                                    <View style={styles.EventContentRow}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.EventContentRowLeftTitle}>场外交易</Text>
                                            <Text style={styles.EventContentRowLeftConten}>法币交易数字货币</Text>
                                        </View>
                                        <Image style={styles.EventContentRowIcon}
                                               source={require('../Image/Home/OtcIcon.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.EventContentView, styles.borderBottom]}>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onPrice.bind(this, '行情')}>
                                    <View style={styles.EventContentRow}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.EventContentRowLeftTitle}>行情</Text>
                                            <Text style={styles.EventContentRowLeftConten}>全球实时行情</Text>
                                        </View>
                                        <Image style={styles.EventContentRowIcon}
                                               source={require('../Image/Home/TheMarket.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#F5F6F5', height: 10, flex: 1,}}/>
                        <View style={styles.AssetsList}>
                            <View style={styles.AssetsListHeader}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    this.setState({isEyes: !this.state.isEyes})
                                }}>
                                    <View style={styles.AssetsTitleRow}>
                                        <Text style={styles.AssetsTitleRowTitle}>总资产</Text>
                                        <Image style={styles.AssetsTitleRowEyesIcon}
                                               source={!this.state.isEyes ? require('../Image/Home/EyesIcon.png') : require('../Image/Home/EyesIconClose.png')}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.AssetsMoneyNumber}>
                                    <Text
                                        style={styles.AssetsMoneyNumberText}>{!this.state.isEyes ? this.state.data.tra : '****'}</Text>
                                    <Text
                                        style={styles.AssetsMoneyNumberTextContent}>{!this.state.isEyes ? '≈ ' + this.state.data.sell : '****'}</Text>
                                </View>
                                <View style={styles.AssetsListHeaderBottom}>
                                    <View style={styles.AssetsListHeaderBackColor}>
                                        <Image style={styles.AssetsListHeaderBackColorIcon}
                                               source={require('../Image/Home/AssetIcon.png')}/>
                                        <Text style={styles.AssetsListHeaderBottomText}>资产保障中</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.AssetsListContent}>
                                {this.renderList()}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.HeaderStyleOpacity, {opacity: this.state.opacity}]}>
                    <View style={styles.HeaderStyleOpacityStyle}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onRichScanCom}>
                            <Image style={styles.HeaderStyleIcon} source={require('../Image/Home/ScanIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.HeaderStyleOpacityStyle}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onTransfer}>
                            <Image style={styles.HeaderStyleIcon} source={require('../Image/Home/CreditIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.HeaderStyleOpacityStyle}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onMyQrCode}>
                            <Image style={styles.HeaderStyleIcon} source={require('../Image/Home/TansferIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    renderList() {
        let List = [];
        let Array = this.state.List
        if (Array.length > 0) {
            Array.forEach((v, i) => {
                List.push(
                    <View style={styles.AssetsListItem} key={i}>
                        <View style={styles.AssetsListItemLeft}>
                            <Image style={styles.AssetsListItemLeftLogo} source={{url: v.logo}}/>
                            <View style={styles.AssetsListItemLeftText}>
                                <Text style={styles.AssetsListItemLeftTextName}>{v.title}</Text>
                            </View>
                        </View>
                        <View>
                            <Text
                                style={styles.AssetsListItemRightTextName}>{!this.state.isEyes ? v.number : '****'}</Text>
                            <Text
                                style={styles.AssetsListItemRightTextMoney}>{!this.state.isEyes ? `≈${v.price}` : '****'}</Text>
                        </View>
                    </View>
                )
            })
        }
        return List;
    }

    // 场外交易
    onTradingDigitalCurrency() {
        this.props.navigation.navigate('OtcTabBar',)
    }

    // 行情
    onPrice(name) {
        this.props.navigation.navigate('Price', {name: name})
    }

    // 收款
    onMyQrCode() {
        this.props.navigation.navigate('MyQrCode', {name: '收款'})
    }

    // 转账
    onTransfer() {
        this.props.navigation.navigate('Transfer', {name: '转账'})
    }

    // 扫一扫
    onRichScanCom() {
        this.props.navigation.navigate('RichScanCom', {name: '扫一扫', status: 1})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        // backgroundColor: '#4063D5',
    },
    HeaderStyleOpacityStyle: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    HeaderStyleOpacity: {
        flex: 1,
        position: 'absolute',
        width: Utils.size.width,
        zIndex: 10,
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: (Utils.size.os === 'ios') ? 25 : 0,
        backgroundColor: '#4063D5',
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
        paddingTop: (Utils.size.os === 'ios') ? 25 : 0,
        backgroundColor: '#4063D5',
    },
    SearchBackColor: {
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#284FC4',
    },
    SearchIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    SearchText: {
        paddingLeft: 10,
        color: '#A6BFEE',
        fontSize: Utils.setSpText(16),
    },
    HeaderNav: {
        flexDirection: 'row',
        height: Utils.size.os === 'ios' ? 600 : 500,
        backgroundColor: '#4063D5',
    },
    HeaderWidthStyle: {
        marginTop: Utils.size.os === 'ios' ? 500 : 500,
        width: Utils.size.width / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    HeaderStyleIcon: {
        width: 30,
        height: 30,
    },
    HeaderStyleText: {
        paddingTop: 10,
        fontSize: Utils.setSpText(12),
        color: '#fff',
    },
    EventContent: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        flex: 1,
        paddingTop: 10,
    },
    EventContentView: {
        width: (Utils.size.width - 20) / 2,
    },
    borderBottom: {
        borderBottomColor: '#E9EAE9',
        borderBottomWidth: 1,
    },
    borderRight: {
        borderRightWidth: 1,
        borderRightColor: '#E9EAE9',
    },
    EventContentRow: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    EventContentRowLeftTitle: {
        // paddingTop: 10,
        color: '#000000',
        fontSize: Utils.setSpText(16),
    },
    EventContentRowLeftConten: {
        paddingTop: 8,
        color: '#B5B6B5',
        fontSize: Utils.setSpText(14),
    },
    EventContentRowIcon: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    AssetsList: {
        // paddingRight: 10,
        // paddingLeft: 10,
    },
    AssetsTitleRow: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        flexDirection: 'row',
    },
    AssetsTitleRowTitle: {
        fontSize: Utils.setSpText(14),
        color: '#D2D3D2',
    },
    AssetsTitleRowEyesIcon: {
        width: 15,
        marginLeft: 10,
        height: 15,
    },
    AssetsMoneyNumber: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    AssetsMoneyNumberText: {
        color: '#000',
        fontSize: Utils.setSpText(18),
    },
    AssetsMoneyNumberTextContent: {
        paddingTop: 5,
        color: '#BBBCBB',
        fontSize: Utils.setSpText(12),
    },
    AssetsListHeader: {
        paddingTop: 10,
        // paddingBottom: 10,
    },
    AssetsListHeaderBottom: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#F7F8F7'
    },
    AssetsListHeaderBackColor: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#35C18E',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
    },
    AssetsListHeaderBackColorIcon: {
        width: 15,
        height: 15,
    },
    AssetsListHeaderBottomText: {
        paddingLeft: 5,
        color: '#fff',
        fontSize: Utils.setSpText(12),
    },
    AssetsListContent: {
        paddingLeft: 10,
        paddingRight: 10,
        height: Utils.size.height / 2
    },
    AssetsListItem: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F7F8F7'
        // alignItems: 'center',
    },
    AssetsListItemLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    AssetsListItemLeftLogo: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    AssetsListItemLeftText: {
        paddingLeft: 10,
    },
    AssetsListItemLeftTextName: {
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    AssetsListItemLeftTextMoney: {
        paddingTop: 5,
        fontSize: Utils.setSpText(14),
        color: '#B5B6B5',
    },
    AssetsListItemRightTextName: {
        textAlign: 'right',
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    AssetsListItemRightTextMoney: {
        textAlign: 'right',
        paddingTop: 5,
        fontSize: Utils.setSpText(14),
        color: '#B5B6B5',
    }
})


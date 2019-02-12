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
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage,
    Alert,
    TextInput,
    Linking,
    Clipboard
} from 'react-native';
import Utils from "../../../../../Component/Utils";
import {Loading} from "../../../../../Component/Loading";

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
        this.onBackButton = this.onBackButton.bind(this)
    }

    componentDidMount() {
        this.LoadData()
    }

    async LoadData() {
        try {
            let {orderId} = this.props.navigation.state.params
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('orderId', orderId);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/orderDetail', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result
                })
            } else {
                Loading.Toast(data.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let {name, status, id} = this.props.navigation.state.params
        let {data} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon}
                                   source={require('../../../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{name}</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                <View style={[styles.content, styles.contentBG]}>
                    <ScrollView>
                        <View style={styles.OrderDetailsHeader}>
                            <Text
                                style={styles.OrderDetailsHeaderText}>{Number(data.order_state) === 1 ? '进行中' : '已完成'}</Text>
                        </View>
                        <View style={[styles.OrderDetailsMaTop]}>
                            <View style={[styles.OrderDetailsCart]}>
                                <View style={styles.OrderDetailsCartItem}>
                                    <Text style={styles.OrderDetailsCartItemLeftText}>订单编号：</Text>
                                    <Text style={styles.OrderDetailsCartItemCenterText}>{data.order_code}</Text>
                                    <TouchableOpacity activeOpacity={0.5} onPress={this.onCopy.bind(this, data.order_code)}>
                                        <Image source={require('../../../../../Image/Home/orderId.png')}
                                               style={styles.OrderDetailsCartItemImg}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.OrderDetailsCartItem}>
                                    <Text style={styles.OrderDetailsCartItemLeftText}>价格：</Text>
                                    <Text style={styles.OrderDetailsCartItemRightText}>{data.order_price}</Text>
                                    <Text style={styles.OrderDetailsCartItemRightTextCny}>CNY</Text>
                                </View>
                                <View style={styles.OrderDetailsCartItem}>
                                    <Text style={styles.OrderDetailsCartItemLeftText}>数量：</Text>
                                    <Text style={styles.OrderDetailsCartItemRightText}>{data.order_num}</Text>
                                    <Text style={styles.OrderDetailsCartItemRightTextCny}>omo</Text>
                                </View>
                                <View style={styles.OrderDetailsCartItem}>
                                    <Text style={styles.OrderDetailsCartItemLeftText}>总价：</Text>
                                    <Text style={styles.OrderDetailsCartItemRightText}>{data.order_amount}</Text>
                                    <Text style={styles.OrderDetailsCartItemRightTextCny}>CNY</Text>
                                </View>
                                <View style={styles.OrderDetailsCartItem}>
                                    <Text style={styles.OrderDetailsCartItemLeftText}>创建时间：</Text>
                                    <Text
                                        style={styles.OrderDetailsCartItemRightText}>{Utils.formatTs(data.order_time, 'YYYY-MM-DD HH:mm')}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.OrderDetailsMaTop]}>
                            <View style={styles.OrderDetailsUser}>
                                <Image
                                    source={!data.avatar ? require('../../../../../Image/My/UserActiver.png') : {uri: data.avatar}}
                                    style={styles.OrderDetailsUserActiver}/>
                                <Text style={styles.OrderDetailsUserNickname}>{data.nickname}</Text>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={this.onPhoneButton.bind(this, data.phone)}>
                                    <View style={styles.OrderDetailsUserPhone}>
                                        <Image style={styles.OrderDetailsUserPhoneImg}
                                               source={require('../../../../../Image/Home/OrderDetailsUserPhoneImg.png')}/>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.OrderDetailsUserMessage}>
                                    <Image style={styles.OrderDetailsUserMessageImg}
                                           source={require('../../../../../Image/Home/OrderDetailsUserMessageImg.png')}/>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.OrderDetailsMaTop]}>
                            <View style={[styles.OrderDetailsRemark]}>
                                <Text style={[styles.OrderDetailsRemarkHeader]}>留言</Text>
                                <Text style={[styles.OrderDetailsRemarkText]}>{data.order_remark}</Text>
                            </View>
                        </View>
                        <View style={[styles.OrderDetailsMaTop]}>
                            <View style={styles.OrderDetailsPay}>
                                <View style={styles.OrderDetailsPayBorBott}>
                                    <Text style={styles.OrderDetailsPayHeaderText}>收款信息</Text>
                                </View>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Image style={styles.OrderDetailsPayItemsImg}
                                           source={require('../../../../../Image/Home/AlipayIcon.png')}/>
                                    <Text style={styles.OrderDetailsPayItemsText}>支付宝</Text>
                                </View>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Text style={styles.OrderDetailsPayItemsAlipay}>账号：</Text>
                                    <Text
                                        style={[styles.OrderDetailsPayItemsAlipay, styles.OrderDetailsPayItemsAlipayPadd]}>{data.alipay}</Text>
                                </View>
                            </View>
                            <View style={styles.OrderDetailsPay}>
                                <View style={styles.OrderDetailsPayBorBott}/>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Image style={styles.OrderDetailsPayItemsImg}
                                           source={require('../../../../../Image/Home/unionpayIcon.png')}/>
                                    <Text style={styles.OrderDetailsPayItemsText}>银行卡</Text>
                                </View>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Text style={styles.OrderDetailsPayItemsAlipay}>账号：</Text>
                                    <Text
                                        style={[styles.OrderDetailsPayItemsAlipay, styles.OrderDetailsPayItemsAlipayPadd]}>{data.account_number}</Text>
                                </View>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Text style={styles.OrderDetailsPayItemsAlipay}>开户行：</Text>
                                    <Text
                                        style={[styles.OrderDetailsPayItemsAlipay, styles.OrderDetailsPayItemsAlipayPadd]}>{data.deposit_bank}</Text>
                                </View>
                                <View style={styles.OrderDetailsPayItems}>
                                    <Text style={styles.OrderDetailsPayItemsAlipay}>姓名：</Text>
                                    <Text
                                        style={[styles.OrderDetailsPayItemsAlipay, styles.OrderDetailsPayItemsAlipayPadd]}>{data.house_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.OrderDetailsMaTop]}>
                            <View style={styles.OrderDetailsBottom}>
                                <Text style={styles.OrderDetailsBottomHeader}>交易提醒</Text>
                                <Text style={styles.OrderDetailsBottomContent}>
                                    1、线下交易完成后， 请务必点击「已支付」；
                                    2、请通过平台进行沟通约定，并保存好相关聊天记录；
                                </Text>
                            </View>
                        </View>
                        <View style={styles.BottomButton}>
                            <Text style={styles.BottomButtonText}>已支付</Text>
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }

    onPhoneButton(record) {
        let url = 'tel: ' + record
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
    // 复制
    async onCopy (record) {
        Clipboard.setString(record);
        let str = await Clipboard.getString();
        Loading.Toast('复制成功');
    }
    // 返回
    onBackButton() {
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contentBG: {
        backgroundColor: '#EEF4F7'
    },
    headers: {
        width: Utils.size.width,
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: (Utils.size.os === 'ios') ? 30 : 0,
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
        paddingTop: 10,
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    OrderDetailsHeader: {
        backgroundColor: '#FDF4E0',
        padding: 15,
    },
    OrderDetailsHeaderText: {
        color: '#CE8E37',
        fontSize: Utils.setSpText(16)
    },
    OrderDetailsMaTop: {
        marginTop: 10,
        backgroundColor: '#fff'
    },
    OrderDetailsCart: {
        padding: 15,
    },
    OrderDetailsCartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    OrderDetailsCartItemLeftText: {
        color: '#000',
        fontSize: Utils.setSpText(13),
        fontWeight: 'bold'
    },
    OrderDetailsCartItemCenterText: {
        color: '#000',
        fontSize: Utils.setSpText(13),
        fontWeight: 'bold',
        flex: 1,
    },
    OrderDetailsCartItemImg: {
        width: 15,
        height: 15,
    },
    OrderDetailsCartItemRightText: {
        flex: 1,
        color: '#000',
        fontSize: Utils.setSpText(13),
        textAlign: 'right'
    },
    OrderDetailsCartItemRightTextCny: {
        paddingLeft: 5,
        color: '#000',
        fontSize: Utils.setSpText(13),
    },
    OrderDetailsUser: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    OrderDetailsUserActiver: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    OrderDetailsUserNickname: {
        paddingLeft: 5,
        flex: 1,
        color: '#B6B7B6',
        fontSize: Utils.setSpText(14),
    },
    OrderDetailsUserPhone: {
        backgroundColor: '#37CA42',
        width: 50,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    OrderDetailsUserPhoneImg: {
        width: 15,
        height: 15,
    },
    OrderDetailsUserMessage: {
        backgroundColor: '#4298FC',
        width: 50,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    OrderDetailsUserMessageImg: {
        width: 15,
        height: 15,
    },
    OrderDetailsPay: {
        padding: 15,
    },
    OrderDetailsPayBorBott: {
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    OrderDetailsPayHeaderText: {
        color: '#000',
        paddingBottom: 7,
        fontSize: Utils.setSpText(16),
    },
    OrderDetailsRemark: {
        padding: 15,
    },
    OrderDetailsRemarkHeader: {
        color: '#000',
        paddingBottom: 10,
        fontSize: Utils.setSpText(16),
    },
    OrderDetailsRemarkText: {
        color: '#000',
        lineHeight: 25,
        fontSize: Utils.setSpText(16),
    },
    OrderDetailsPayItems: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    OrderDetailsPayItemsImg: {
        width: 20,
        height: 20,
        borderRadius: 2
    },
    OrderDetailsPayItemsText: {
        paddingLeft: 10,
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    OrderDetailsPayItemsAlipay: {
        color: '#000',
        fontSize: Utils.setSpText(14),
    },
    OrderDetailsPayItemsAlipayPadd: {
        paddingLeft: 20,
    },
    OrderDetailsBottom: {
        padding: 15,
    },
    OrderDetailsBottomHeader: {
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    OrderDetailsBottomContent: {
        paddingTop: 10,
        lineHeight: 25,
        color: '#000',
        fontSize: Utils.setSpText(14),
    },
    BottomButton: {
        marginTop: 50,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        backgroundColor: '#4298FC',
        height: 50,
        borderRadius: 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    }
})


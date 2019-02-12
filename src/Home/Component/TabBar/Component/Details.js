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
    Modal, TextInput
} from 'react-native';
import Utils from "../../../../Component/Utils";
import {Loading} from "../../../../Component/Loading";

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            number: null,
            orderPrice: null,
            orderNum: null,
            modalVisible: false,
        }
        this.onBackButton = this.onBackButton.bind(this)
    }

    componentDidMount() {
        this.LoadData()
    }

    async LoadData() {
        try {
            let {id} = this.props.navigation.state.params
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('id', id);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/sellDetail', formData);
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
        let {data, number, orderNum, orderPrice} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon}
                                   source={require('../../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{name}</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                <View style={[styles.content, styles.contentBG]}>
                    <ScrollView>
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderFlexRow}>
                                    <Image style={styles.contentHeaderUserAvatar} source={{uri: data.avatar}}/>
                                    <Text style={styles.contentHeaderNickName}>{data.nickname}</Text>
                                    <Image style={styles.contentHeaderPayType}
                                           source={Number(data.pay_type) === 1 ? require('../../../../Image/Home/AlipayIcon.png') : Number(data.pay_type) === 2 ? require('../../../../Image/Wechat.png') : require('../../../../Image/Home/unionpayIcon.png')}/>
                                </View>
                                <View style={styles.contentHeaderFlexRowContent}>
                                    <View style={styles.contentHeaderFlexRowView}>
                                        <Text style={[styles.contentHeaderFlexRowText]}>价格</Text>
                                        <Text style={styles.contentHeaderFlexRowViewText}>{data.sell_price}</Text>
                                    </View>
                                    <View style={styles.contentHeaderFlexRowView}>
                                        <Text style={[styles.contentHeaderFlexRowText]}>浮动价</Text>
                                        <Text style={styles.contentHeaderFlexRowViewText}
                                              numberOfLines={1}>{Number(data.sell_type) === 1 ? data.min_price + '-' + data.max_price : data.sell_price}</Text>
                                    </View>
                                    <View style={styles.contentHeaderFlexRowView}>
                                        <Text style={[styles.contentHeaderFlexRowText]}>数量</Text>
                                        <Text style={styles.contentHeaderFlexRowViewText}
                                              numberOfLines={1}>{data.sell_num}</Text>
                                    </View>
                                </View>
                                <View style={styles.contentHeaderFlexRowContentBottom}>
                                    <View style={styles.contentHeaderFlexRowContentBottomView}>
                                        <Text
                                            style={styles.contentHeaderFlexRowContentBottomText}>{Number(data.sell_type) === 1 ? '浮动价' : '一口价'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.remark}>
                                <Text style={styles.remarkTitle}>留言</Text>
                                <Text style={styles.remarkTitleContent}>
                                    {data.sell_remark}
                                </Text>
                            </View>
                            <View style={styles.remark}>
                                <Text style={styles.remarkTitle}>你想要{Number(status) === 1 ? '出售' : '购买'}多少？</Text>
                                <View style={styles.remarkInput}>
                                    <View style={[styles.remarkInputItems, styles.remarkInputBorder]}>
                                        <View style={{height: 40}}>
                                            <Text style={{
                                                alignItems: 'center',
                                                flex: 1,
                                                justifyContent: 'center',
                                                fontSize: Utils.setSpText(18)
                                            }}>
                                                {data.sell_num}
                                            </Text>
                                        </View>

                                    </View>
                                    <Text style={styles.remarkInputTextDe}>=</Text>
                                    <View style={[styles.remarkInputItems, styles.remarkInputBorder]}>
                                        <Text style={styles.remarkInputText}>CNY</Text>
                                        <TextInput
                                            style={styles.textInputs}
                                            underlineColorAndroid='transparent'
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({orderPrice: text})}
                                            value={orderPrice}
                                            placeholder={'输入价格'}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={styles.modalStyle}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                        }}
                    >
                        <View style={[styles.content, styles.modalStyle]}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalHeaderLeft}>下单确认</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}
                                    >
                                        <Text style={styles.modalHeaderRight}>取消</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalContentPadd}>
                                    <View style={styles.modalContentPrice}>
                                        <Text style={styles.modalContentPriceLeft}>价格</Text>
                                        <Text style={styles.modalContentPriceRight}>{orderPrice}</Text>
                                    </View>
                                    <View style={styles.modalContentPrice}>
                                        <Text style={styles.modalContentPriceLeft}>数量</Text>
                                        <Text style={styles.modalContentPriceRight}>{data.sell_num}</Text>
                                    </View>
                                    {
                                        Number(data.sell_type) === 1 ?
                                            <Text style={styles.modalContentTiShi}>提示： 由于价格为浮动价，请以实际下单为准，请放心购买</Text>
                                            : null
                                    }
                                </View>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onBuy.bind(this)}>
                                    <View style={[Number(status) !== 1 ? styles.modalButton : styles.modalButtonBg]}>
                                        <Text
                                            style={styles.modalButtonText}>确认{Number(status) === 1 ? '出售' : '购买'}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.FooterNavFlexEnd}>
                    <View style={styles.FooterNavStyle}>
                        <View style={[styles.FooterNavItems, styles.FooterNavItemsFFF]}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.onChatDetails.bind(this)}>
                                <Text style={styles.FooterNavItemsText}>联系对方</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[Number(status) === 1 ? styles.FooterNavItemsRed : styles.FooterNavItems]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}>
                                <Text style={styles.FooterNavItemsTextRed}>{Number(status) === 1 ? '出售' : '购买'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

    //  确认
    onBuy() {
        let {orderPrice} = this.state
        if (!orderPrice) {
            Loading.Toast('请输入价格')
        } else {
            this.BuyEvent()
        }

    }

    async BuyEvent() {
        try {
            let {id} = this.props.navigation.state.params
            let {data, orderPrice} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('sellId', id);
            formData.append('orderNum', data.sell_num);
            formData.append('orderPrice', orderPrice);
            formData.append('remark', data.sell_remark);
            console.log(formData)
            let list = await Utils.LoadPost(Utils.size.url + '/api/sales/buy', formData);
            console.log(list)
            if (Number(list.code === 0)) {
                Loading.Toast('请在我的订单中查看订单状态')
                this.setModalVisible(!this.state.modalVisible);
            } else {
                Loading.Toast(list.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    // 关闭model
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    // 返回
    onBackButton() {
        this.props.navigation.goBack()
    }
    // 聊天
    onChatDetails() {
        this.props.navigation.navigate('ChatDetails', {name: this.state.data.nickname + '聊天', items: this.state.data.mob_username, data: this.state.data})
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
    FooterNavFlexEnd: {
        justifyContent: 'flex-end',
    },
    FooterNavStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    FooterNavItems: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1378F6',
    },
    FooterNavItemsFFF: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    FooterNavItemsRed: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EE5744',
    },
    FooterNavItemsText: {
        color: '#091212',
        fontSize: Utils.setSpText(18),
    },
    FooterNavItemsTextRed: {
        color: '#fff',
        fontSize: Utils.setSpText(18),
    },
    contentHeader: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
    },
    contentHeaderFlexRow: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentHeaderUserAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    contentHeaderNickName: {
        color: '#BFC0BF',
        fontSize: Utils.setSpText(16),
        paddingLeft: 10,
        paddingRight: 15,
    },
    contentHeaderPayType: {
        width: 20,
        height: 20,
    },
    contentHeaderFlexRowContent: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    contentHeaderFlexRowText: {
        color: '#BFC0BF',
        fontSize: Utils.setSpText(12),
    },
    contentHeaderFlexRowNumber: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentHeaderFlexRowView: {
        flex: 1,
    },
    contentHeaderFlexRowViewBorRig: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#000',
        borderRightWidth: 1,
        borderRightColor: '#000'
    },
    contentHeaderFlexRowViewText: {
        paddingTop: 10,
        color: '#000',
        fontSize: Utils.setSpText(14),
        fontWeight: '500',
    },
    contentHeaderFlexRowContentBottom: {
        // justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    contentHeaderFlexRowContentBottomView: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#9DB8D0',
        borderWidth: 1,
        backgroundColor: '#CBE7FE',
    },
    contentHeaderFlexRowContentBottomText: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#57AEEE',
        fontSize: Utils.setSpText(14)
    },
    remark: {
        borderTopColor: '#E8E8EC',
        borderTopWidth: 1,
        borderBottomColor: '#E8E8EC',
        borderBottomWidth: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    remarkTitle: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    remarkTitleContent: {
        paddingBottom: 15,
        fontSize: Utils.setSpText(15),
        color: '#000',
        lineHeight: 25,
    },
    buyToSellContent: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buyToSellContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E8E8EC',
        borderBottomWidth: 1,
    },
    buyToSellContentRowText: {
        fontSize: Utils.setSpText(17),
        color: '#000',
    },
    textInputs: {
        flex: 1,
        fontSize: Utils.setSpText(16),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    modalStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    modalContent: {
        width: Utils.size.width,
        backgroundColor: '#fff',
    },
    modalHeader: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#E8E8EC',
        borderBottomWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#F8F9F8',
    },
    modalHeaderLeft: {
        flex: 1,
        color: '#000',
        fontSize: Utils.setSpText(17),
    },
    modalHeaderRight: {
        color: '#57AEEE',
        fontSize: Utils.setSpText(17),
    },
    modalContentPadd: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#E8E8EC',
        borderBottomWidth: 1,
    },
    modalContentPrice: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContentPriceLeft: {
        flex: 1,
        color: '#909190',
        fontSize: Utils.setSpText(14),
    },
    modalContentPriceRight: {
        color: '#000',
        fontSize: Utils.setSpText(14),
    },
    modalContentTiShi: {
        color: '#DD9F00',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: Utils.setSpText(14),
    },
    modalButton: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#1378F6',
        height: 50,
        width: Utils.size.width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    modalButtonBg: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#EE5744',
        height: 50,
        width: Utils.size.width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: Utils.setSpText(18),
    },
    remarkInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
    },
    remarkInputItems: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    remarkInputBorder: {
        borderBottomColor: '#E8E8EC',
        borderBottomWidth: 1,
    },
    remarkInputText: {
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    remarkInputTextDe: {
        padding: 10,
        color: '#909190',
        fontSize: Utils.setSpText(16),
    }
})


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
    ScrollView,
    Image,
    TextInput, AsyncStorage
} from 'react-native';
import Utils from "../../../Component/Utils";
import {Loading} from "../../../Component/Loading";

export default class ReleaseCancelled extends Component {
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
            type: 1,
            sellType: 1,
            payType: null,
            currency: null,
            minPrice: null,
            maxPrice: null,
            price: null,
            count: null,
            remark: '1. 付款需要些许时间，请您耐心等待; 2. 下单时请及时留下您的收款方式，请务必仔细确认您的收款账号是否正确，信息错误自行承担损失；',
        }
        this.onCurrency = this.onCurrency.bind(this)
        this.onTermsOfPayment = this.onTermsOfPayment.bind(this)
        this.onLeaveMessage = this.onLeaveMessage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    render() {
        let {type, payType, currency, minPrice, maxPrice, sellType, price, remark, count} = this.state
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.ListView}>
                        <View style={styles.ListCell}>
                            <View style={{flex: 1}}>
                                <Text style={styles.ListCellLeftText}>交易类型</Text>
                            </View>
                            <View style={styles.ListCellRight}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({type: 1})}}>
                                    <View style={Number(type) === 1 ? styles.ListCellButtonActive : styles.ListCellButton}>
                                        <Text style={Number(type) === 1 ? styles.ListCellButtonActiveText : styles.ListCellButtonText}>购买</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({type: 2})}}>
                                    <View style={Number(type) === 2 ? styles.ListCellButtonActive : styles.ListCellButton}>
                                        <Text style={Number(type) === 2 ? styles.ListCellButtonActiveText : styles.ListCellButtonText}>出售</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onCurrency}>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.ListCellLeftText}>法币</Text>
                                </View>
                                <View style={styles.ListCellRightView}>
                                    <Text style={styles.ListCellRightViewText}>{!currency ? '请选择' : currency}</Text>
                                    <Image style={styles.ListCellRightImgIcon} source={require('../../../Image/My/RightIcon.png')}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onTermsOfPayment}>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.ListCellLeftText}>付款方式</Text>
                                </View>
                                <View style={styles.ListCellRightView}>
                                    <Text style={styles.ListCellRightViewText}>{Number(payType) === 1 ? '支付宝' : Number(payType) === 2 ? '微信' : Number(payType) === 3 ? '银行账户' : '请选择'}</Text>
                                    <Image style={styles.ListCellRightImgIcon} source={require('../../../Image/My/RightIcon.png')}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#F5F6F6',height: 10,}}/>
                    <View style={styles.ListView}>
                        <View style={styles.ListCell}>
                            <View style={{flex: 1}}>
                                <Text style={styles.ListCellLeftText}>定价方式</Text>
                            </View>
                            <View style={styles.ListCellRight}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({sellType: 1})}}>
                                    <View style={Number(sellType) === 1 ? styles.ListCellButtonActive : styles.ListCellButton}>
                                        <Text style={Number(sellType) === 1 ? styles.ListCellButtonActiveText : styles.ListCellButtonText}>浮动价</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({sellType: 2})}}>
                                    <View style={Number(sellType) === 2 ? styles.ListCellButtonActive : styles.ListCellButton}>
                                        <Text style={Number(sellType) === 2 ? styles.ListCellButtonActiveText : styles.ListCellButtonText}>一口价</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            Number(sellType) === 1 ?
                                <View>
                                    <View style={styles.ListCellPadd}>
                                       <Text style={styles.ListCellPaddTitle}>最低单价</Text>
                                       <View style={styles.inputBackColor}>
                                           <TextInput
                                               style={styles.textInputs}
                                               underlineColorAndroid='transparent'
                                               keyboardType={'numeric'}
                                               onChangeText={(text) =>this.setState({minPrice: text})}
                                               value={minPrice}
                                               placeholder={'输入最低单价'}
                                           />
                                           <Text style={[styles.ListCellPaddTitle,styles.ListCellBai]}>{currency}</Text>
                                      </View>
                                   </View>
                                    <View style={styles.ListCellPadd}>
                                       <Text style={styles.ListCellPaddTitle}>最高单价</Text>
                                       <View style={styles.inputBackColor}>
                                           <TextInput
                                               style={styles.textInputs}
                                               underlineColorAndroid='transparent'
                                               keyboardType={'numeric'}
                                               onChangeText={(text) =>this.setState({maxPrice: text})}
                                               value={maxPrice}
                                               placeholder={'输入最高单价'}
                                           />
                                           <Text style={[styles.ListCellPaddTitle,styles.ListCellBai]}>{currency}</Text>
                                      </View>
                                   </View>
                                </View>
                                :
                                <View style={styles.ListCellPadd}>
                                   <Text style={styles.ListCellPaddTitle}>固定单价</Text>
                                   <View style={styles.inputBackColor}>
                                       <TextInput
                                           style={styles.textInputs}
                                           underlineColorAndroid='transparent'
                                           keyboardType={'numeric'}
                                           onChangeText={(text) =>this.setState({price: text})}
                                           value={price}
                                           placeholder={'输入固定单价'}
                                       />
                                       <Text style={[styles.ListCellPaddTitle,styles.ListCellBai]}>{currency}</Text>
                                  </View>
                               </View>
                        }

                    </View>
                    <View style={{backgroundColor: '#F5F6F6',height: 10,}}/>
                    <View style={styles.ListView}>
                       <View style={{paddingTop: 20,}}>
                           <Text style={styles.ListCellLeftText}>{Number(type) === 1 ? '购买' : '出售'}数量</Text>
                       </View>
                       <View style={styles.inputBackColor}>
                           <TextInput
                               style={styles.textInputs}
                               underlineColorAndroid='transparent'
                               keyboardType={'numeric'}
                               onChangeText={(text) =>this.setState({count:text})}
                               value={count}
                               placeholder={'输入数量'}
                           />
                           {/*<Text style={[styles.ListCellPaddTitle,styles.ListCellBai]}>%</Text>*/}
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onLeaveMessage}>
                            <View style={styles.ListCell}>
                                <View style={{paddingRight: 30,}}>
                                    <Text style={styles.ListCellLeftText}>留言</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={styles.ListCellRightView}>
                                        <Text style={styles.ListCellRightViewText} numberOfLines={1}>{remark}</Text>
                                        <Image style={styles.ListCellRightImgIcon} source={require('../../../Image/My/RightIcon.png')}/>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#F5F6F6',height: 40,}}/>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onSubmit}>
                        <View style={type && payType && currency && count && remark? styles.ListViewBottom : styles.ListViewBottomBg}>
                            <Text style={styles.ListViewBottomText}>发布</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    // 选择币种
    onCurrency () {
        this.props.navigation.navigate('Currency', {name: '法币', RecodeLoad: (code) => {
            this.setState({
                currency: code
            })
        }})
    }
    // 付款方式
    onTermsOfPayment () {
        this.props.navigation.navigate('TermsOfPayment', {name: '付款方式', RecodeLoad: (code) => {
           this.setState({
               payType: code
           })
        }})
    }
    // 留言
    onLeaveMessage() {
        this.props.navigation.navigate('LeaveMessage', {name: '留言', RecodeLoad: (code) => {
           this.setState({
               remark: code
           })
        }})
    }
    // 发布
    onSubmit () {
        let {type, payType, currency, minPrice, maxPrice, sellType, count, price, remark} = this.state
        if (Number(sellType) === 1) {
            if (!currency) {
                Loading.Toast('请选择法币')
            } else if (!payType) {
                Loading.Toast('请选择付款方式')
            } else if (!minPrice) {
                Loading.Toast('请输入最低单价')
            } else if (!maxPrice) {
                Loading.Toast('请输入最高单价')
            } else if (!count){
                Loading.Toast('请输入数量')
            } else {
                this.LoadDataPrice()
            }
        } else if (Number(sellType) === 2) {
            if (!currency) {
                Loading.Toast('请选择法币')
            } else if (!payType) {
                Loading.Toast('请选择付款方式')
            } else if (!price) {
                Loading.Toast('请输入固定单价')
            } else if (!count){
                Loading.Toast('请输入额度')
            } else {
                this.LoadData()
            }
        }
    }
    // 返回
    onBackButton () {
        this.props.navigation.state.params.RecodeLoad()
        this.props.navigation.goBack()
    }
    async LoadDataPrice () {
        try {
            let {type, payType, currency, minPrice, maxPrice, count, sellType, remark} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('type', type);
            formData.append('payType', payType);
            formData.append('count', count);
            formData.append('remark', remark);
            formData.append('minPrice', minPrice);
            formData.append('maxPrice', maxPrice);
            formData.append('currency', currency);
            formData.append('sellType', sellType);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/sendRelease', formData);
            if (Number(data.code === 0)) {
                Loading.Toast('发布成功')
                this.onBackButton()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    async LoadData () {
        try {
            let {type, payType, currency, count, price, sellType, remark} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('type', type);
            formData.append('payType', payType);
            formData.append('count', count);
            formData.append('remark', remark);
            formData.append('price', price);
            formData.append('currency', currency);
            formData.append('sellType', sellType);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/sendRelease', formData);
            console.log(data)
            console.log(formData)
            if (Number(data.code === 0)) {
                Loading.Toast('发布成功')
                this.onBackButton()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    ListView: {
        paddingRight: 15,
        paddingLeft: 15
    },
    ListCell: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListCellLeftText: {
        color: '#000000',
        fontSize: Utils.setSpText(17),
    },
    ListCellRight: {
        backgroundColor: '#F5F6F6',
        width: 130,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 20,
    },
    ListCellButton: {
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#F5F6F6',
    },
    ListCellButtonActive: {
        width: 60,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: '#3F64D5',
    },
    ListCellButtonText: {
        color: '#000',
        fontSize: Utils.setSpText(15),
    },
    ListCellButtonActiveText: {
        color: '#fff',
        fontSize: Utils.setSpText(15),
    },
    ListCellRightView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListCellRightViewText: {
        color: '#3F64D5',
        fontSize: Utils.setSpText(15),
    },
    ListCellRightImgIcon: {
        marginLeft:5,
        width: 20,
        height: 20,
    },
    ListCellPadd: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListCellPaddTitle: {
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    ListCellPaddInput: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F5F6F5',
        height: 40,
    },
    inputBackColor: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#EFF0F3',
        borderRadius: 5,
        width: Utils.size.width - 40,
        height: 50,
    },
    textInputs: {
        flex: 1,
        fontSize: Utils.setSpText(16),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    ListCellBai: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    ListViewBottom: {
        width: '100%',
        height: 40,
        backgroundColor: '#3D62D3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ListViewBottomBg: {
        width: '100%',
        height: 40,
        backgroundColor: '#9AC7FF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ListViewBottomText: {
        color: '#fff',
        fontSize: Utils.setSpText(14),
    }
})


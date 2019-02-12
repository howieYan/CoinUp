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
    ScrollView, Image, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class RichScanComTransfer extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobile: null,
            number: 0,
            data: {},
            pwd: null,
            address: null,
            isPwd: true,
            transferNumber: null,
            CurrencyData: {
            }
        }
        this.onBackButton = this.onBackButton.bind(this)
        this.onTransferRecordButton = this.onTransferRecordButton.bind(this)
        this.onCurrency = this.onCurrency.bind(this)
        this.onRichScanCom = this.onRichScanCom.bind(this)
        this.onSublime = this.onSublime.bind(this)
    }
    componentDidMount () {
        if (this.props.navigation.state.params.address) {
            this.setState({
                address: this.props.navigation.state.params.address
            })
        }
        this.LoadData()
    }
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/projects/home', formData);
            let dataList = await Utils.LoadPost(Utils.size.url + '/api/projects/transferType');
            console.log(dataList);
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result,
                    CurrencyData: dataList.result[0]
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
        let {CurrencyData, address, transferNumber, pwd} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{this.props.navigation.state.params.name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onTransferRecordButton}>
                        <View style={styles.headersRight}>
                            <Text style={styles.HeaderRightText}>记录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.contenter}>
                        <View style={styles.ListView}>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.ListCellLeftText}>币种</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.5} onPress={this.onCurrency}>
                                    <View style={styles.ListCellRight}>
                                        <Text style={styles.ListCellRightText}>{this.state.CurrencyData.tt_name}</Text>
                                        <Image style={styles.renderListStyleRightImage} source={require('../../Image/My/RightIcon.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingTop: 10,}}>
                                <Text style={styles.ListCellTitle}>发送给</Text>
                                <View style={styles.ListCellText}>
                                    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                                        <Text style={styles.ListCellLeftText}>地址</Text>
                                        <TextInput
                                            style={styles.textInputs}
                                            underlineColorAndroid='transparent'
                                            onChangeText={(text) =>this.setState({address: text})}
                                            value={address}
                                            placeholder={'点击添加地址'}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ListViewNote}>
                            <Image style={styles.ListViewNoteIcon} source={require('../../Image/NoteIcon.png')}/>
                            <View style={{flex: 1,}}>
                                <Text style={styles.ListViewNoteTextStyle}>转账前请务必确认地址及币种信息无误，一旦转出，不可撤回！</Text>
                            </View>
                        </View>
                        <View style={styles.ListView}>
                            <View style={styles.ListViewTheAmount}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.ListViewTheAmountText}>输入金额</Text>
                                </View>
                                {/*<TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({transferNumber: this.state.data.tra})}}>*/}
                                    {/*<Text style={Number(this.state.data.tra) <= 0 ? styles.ListViewTheAmountText : styles.ListViewTheAmountTextActive}>全部转出</Text>*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                            <View style={styles.ListViewStyle}>
                                <TextInput
                                    style={styles.textInputsa}
                                    underlineColorAndroid='transparent'
                                    keyboardType={'numeric'}
                                    onChangeText={(text) =>this.setState({transferNumber: text})}
                                    value={transferNumber}
                                    placeholder={'输入转出金额'}
                                />
                            </View>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <View style={styles.ListCellRight}>
                                        <Text style={styles.ListCellTitle}>可用余额{this.state.data.tra}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.ListCell}>
                                <View style={{flex: 1}}>
                                    <TextInput
                                        style={styles.textInputss}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) =>this.setState({pwd: text})}
                                        value={pwd}
                                        secureTextEntry={this.state.isPwd}
                                        placeholder={'输入密码'}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onSublime}>
                            <View style={styles.ListViewBottom}>
                                <View style={CurrencyData.tt_id && address && transferNumber && pwd ?  styles.ListViewBottomButtonActiver : styles.ListViewBottomButton}>
                                    <Text style={styles.ListViewBottomButtonText}>转账</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
    // 返回
    onBackButton () {
        this.props.navigation.popToTop();
    }
    //转账记录
    onTransferRecordButton () {
        this.props.navigation.navigate('TransferRecord', {name: '转账记录'})
    }
    // 币种
    onCurrency () {
        this.props.navigation.navigate('CurrencyTransfer', {name: '币种', RecodeLoad: (record) => {
            this.setState({
                CurrencyData: record
            })}})
    }
    // 扫一扫
    onRichScanCom () {
        this.props.navigation.navigate('RichScanCom',{name: '扫一扫', status: 2, RecodeLoadData: (record) => {
            this.setState({
                address: record
            })}})
    }
    // 转账
    onSublime () {
        let {CurrencyData, address, transferNumber, pwd} = this.state
        if (CurrencyData.tt_id && address && transferNumber && pwd) {
            if (!CurrencyData.tt_id) {
                Loading.Toast('请选择币种')
            } else if (!address) {
                Loading.Toast('请添加地址')
            } else if (!transferNumber) {
                Loading.Toast('请输入转出金额')
            } else if (Number(transferNumber) <= 0) {
                Loading.Toast('请输入合格的转出金额')
            } else if (Number(transferNumber) > Number(this.state.data.tra)) {
                Loading.Toast('您的可转金额不足')
            } else if (!pwd) {
                Loading.Toast('请输入密码')
            } else {
                this.LoadSendCoin()
            }
        }
    }
    async LoadSendCoin() {
        try {
            let {CurrencyData, address, transferNumber, pwd} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('transferType', CurrencyData.tt_id);
            formData.append('address', address);
            formData.append('transferNumber', transferNumber);
            formData.append('pwd', pwd);
            let data = await Utils.LoadPost(Utils.size.url + '/api/projects/sendCoin', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                Loading.Toast('转账成功')
                this.onBackButton()
            } else {
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contenter: {
        flex: 1,
    },
    ListView: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    ListCell: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'center',
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListCellText: {
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'center',
        paddingBottom: 10,
    },
    ListCellLeftText: {
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    ListCellRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListCellRightText: {
        fontSize: Utils.setSpText(16),
        color: '#1B1C1B',
    },
    renderListStyleRightImage: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    ListCellTitle: {
        color: '#8E8F8E',
        fontSize: Utils.setSpText(15)
    },
    textInputs: {
        flex: 1,
        fontSize: Utils.setSpText(14),
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    textInputss: {
        flex: 1,
        fontSize: Utils.setSpText(14),
    },
    textInputsa: {
        flex: 1,
        fontSize: Utils.setSpText(20),
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
    },
    renderListStyleSweep: {
        width: 20,
        height: 20,
    },
    ListViewNote: {
        backgroundColor: '#EDEEF2',
        paddingRight: 15,
        paddingLeft: 15,
        width: Utils.size.width,
        paddingTop:10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ListViewNoteIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    ListViewNoteTextStyle: {
        fontSize: Utils.setSpText(14),
        color: '#DF4853',
        lineHeight: 20,
    },
    ListViewTheAmount: {
        flexDirection: 'row',
        paddingTop:10,
        alignItems: 'center',
    },
    ListViewTheAmountText: {
        color: '#8E8F8E',
        fontSize: Utils.setSpText(15)
    },
    ListViewTheAmountTextActive: {
        color: '#3E62D4',
        fontSize: Utils.setSpText(15)
    },
    ListViewStyle: {
        paddingBottom: 15,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListViewBottom: {
        backgroundColor: '#EDEEF2',
        height: 400,
        paddingTop: 30,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    ListViewBottomButton: {
        backgroundColor: '#BBD4F4',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    ListViewBottomButtonActiver: {
        backgroundColor: '#3E62D4',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    ListViewBottomButtonText: {
        fontSize: Utils.setSpText(16),
        color: '#fff',
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
        fontSize:Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
})


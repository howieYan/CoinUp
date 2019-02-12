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
    TouchableOpacity
} from 'react-native';
import Utils from "../../../Component/Utils";
import SellingCurrency from './Component/SellingCurrency'; // 卖币
import BuyCoins from './Component/BuyCoins'; //买币
export default class TheTradingFloor extends Component {
    constructor(props){
        super(props);
        this.state = {
            isPay:  false
        }
        this.onHeaderLeft = this.onHeaderLeft.bind(this)
        this.onHeaderRight = this.onHeaderRight.bind(this)
        this.onBackButton = this.onBackButton.bind(this)
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onHeaderLeft}>
                            <View style={[this.state.isPay ? styles.headersCenterLeftActiver: styles.headersCenterLeft]}>
                               <Text style={[this.state.isPay ? styles.headersCenterLeftTextActiver: styles.headersCenterLeftText]}>买币</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.onHeaderRight.bind(this)}>
                            <View style={[!this.state.isPay ? styles.headersCenterRightActiver: styles.headersCenterRight]}>
                               <Text style={[!this.state.isPay ? styles.headersCenterRightTextActiver: styles.headersCenterRightText, ]}>卖币</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                {this.state.isPay ?
                    <BuyCoins navigation={this.props.navigation}/>
                    :
                    <SellingCurrency navigation={this.props.navigation}/>
                }
            </View>
        );
    }
    onBackButton () {
        this.props.navigation.popToTop()
    }
    // 头部的右边的按钮
    onHeaderRight () {
        this.setState({
            isPay: false
        })
        this.forceUpdate()
    }
    onHeaderLeft () {
       this.setState({
           isPay: true
       })
        this.forceUpdate()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
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
    headersCenterLeft: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderColor: '#ECEDEC',
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    headersCenterLeftActiver: {
        backgroundColor: '#3E62D4',
        borderColor: '#3E62D4',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    headersCenterLeftTextActiver: {
        fontSize:Utils.setSpText(16),
        color: '#fff'
    },
    headersCenterRight: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderColor: '#ECEDEC',
        borderWidth: 1,
    },
    headersCenterRightActiver: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderWidth: 1,
        backgroundColor: '#3E62D4',
        borderColor: '#3E62D4',
    },
    headersCenterLeftText: {
        fontSize:Utils.setSpText(16),
        color: '#000',
    },
    headersCenterRightTextActiver: {
        fontSize:Utils.setSpText(16),
        color: '#fff',
    },
    headersCenterRightText: {
        fontSize:Utils.setSpText(16),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },


})


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Utils from "../../../../Component/Utils";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import AllOrder from './Component/AllOrder'
import OngoingOrder from './Component/OngoingOrder'
import CompleteOrder from './Component/CompleteOrder'
export default class MyOrder extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.onBackButton = this.onBackButton.bind(this)
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>我的订单</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                <View style={styles.content}>
                    <ScrollableTabView
                        tabBarBackgroundColor='#fff'
                        renderTabBar={() => <DefaultTabBar/>}
                        tabBarUnderlineStyle={styles.lineStyle}
                        tabBarInactiveTextColor='#000'
                        tabBarActiveTextColor='#4063D5'>
                        <AllOrder navigation={this.props.navigation}  tabLabel={'全部'}/>
                        <OngoingOrder navigation={this.props.navigation} tabLabel={'进行中'}/>
                        <CompleteOrder navigation={this.props.navigation} tabLabel={'已完成'}/>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
    onBackButton () {
        this.props.navigation.popToTop()
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
        // borderBottomWidth: 1,
        // borderBottomColor: '#EFF0EF'
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
    lineStyle: {
        marginLeft: (Utils.size.width / 6)/ 2,
        width: Utils.size.width / 6,
        height: 2,
        backgroundColor: '#4063D5',
    }
})


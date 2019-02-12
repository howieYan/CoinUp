/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import AccountEntry from './AccountEntry';
import TransferOut from './TransferOut';
import Utils from '../../../Component/Utils'
export default class TransferRecord extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#000',
        headerStyle: {
            borderBottomWidth: 0,
        },
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
                <ScrollableTabView
                    tabBarBackgroundColor='#fff'
                    renderTabBar={() => <DefaultTabBar/>}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarInactiveTextColor='#2b2b2b'
                    tabBarActiveTextColor='#3E62D4'>
                    <AccountEntry navigator={this.props.navigation} style={styles.content} tabLabel={'转入'}/>
                    <TransferOut navigator={this.props.navigation} style={styles.content} tabLabel={'转出'}/>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    lineStyle:{
        width: Utils.size.width / 4,
        marginLeft: (Utils.size.width / 4) / 2,
        height: 2,
        backgroundColor: '#3E62D4',
    }
})


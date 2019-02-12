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
    Image,
    TextInput
} from 'react-native';
import Utils from "../../../Component/Utils";
export default class LeaveMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            remark: '1. 付款需要些许时间，请您耐心等待; 2. 下单时请及时留下您的收款方式，请务必仔细确认您的收款账号是否正确，信息错误自行承担损失；',
        }
        this.onBackButton = this.onBackButton.bind(this)
        this.onReleaseCancelled = this.onReleaseCancelled.bind(this)
    }
    render() {
        let  {remark} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon} source={require('../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{this.props.navigation.state.params.name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onReleaseCancelled}>
                        <View style={styles.headersRight}>
                            <Text style={[styles.headersRightText]}>保存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.content, styles.contentBG,]}>
                    <View style={styles.ListView}>
                        <TextInput
                            style={styles.textInputs}
                            underlineColorAndroid='transparent'
                            multiline = {true}
                            textAlignVertical = 'top'
                            maxLength = {100}
                            editable = {true}
                            onChangeText={(text) =>this.setState({remark: text})}
                            value={remark}
                            placeholder={'输入留言'}
                        />
                        <View style={styles.ListViewViewLen}>
                            <Text style={styles.ListViewViewLenText}>{remark.length}/100</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.state.params.RecodeLoad(record)
        this.props.navigation.goBack()
    }
    onReleaseCancelled () {
        this.onBackButton(this.state.remark)
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
    headersCenterLeftText: {
        fontSize:Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    headersRightText: {
        color: '#3D62D3',
        fontSize: Utils.setSpText(18)
    },
    contentBG: {
        backgroundColor: '#F5F6F6',
    },
    textInputs: {
        height: 120,
    },
    ListView: {
        marginTop: 10,
        backgroundColor: '#fff',
        height: 150,
        padding: 10,
    },
    ListViewViewLen: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    ListViewViewLenText: {
        color: '#B7B8B7',
        fontSize: Utils.setSpText(14),
    }
})


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
    Clipboard,
    TouchableOpacity, AsyncStorage
} from 'react-native';
import Utils from "../../Component/Utils";
import QRCode from 'react-native-qrcode';
import {Loading} from '../../Component/Loading';
export default class MyQrCode extends Component {
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
            text: '1944Wf779yu5AcythkD2zbPHEZc5Sp6gYJ',
            data: {}
        }
    }
    componentDidMount () {
        this.LoadData();
    }
    async LoadData () {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/my/getInfo', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result
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
        return (
            <View style={styles.content}>
                <View style={styles.backgroundColor}>
                    <View style={styles.CardView}>
                        <View style={styles.CardViewHeader}>
                            <Image style={styles.CardViewHeaderActiver} source={this.state.data.avatar ? {uri: this.state.data.avatar }: require('../../Image/My/UserActiver.png')}/>
                            <View style={styles.CardViewHeaderText}>
                                <Text style={styles.CardViewHeaderUid}>UID:{this.state.data.user_id}</Text>
                                <Text style={styles.CardViewHeaderName}>{this.state.data.nickname}</Text>
                            </View>
                        </View>
                        <View style={styles.MainQrcode}>
                            <QRCode
                                value={this.state.data.tra_purse_money}
                                size={260}
                                bgColor="#000"
                                fgColor="#fff"
                            />
                        </View>
                        <View style={{alignItems: 'center',justifyContent: 'center',}}>
                            <Text style={styles.CardViewText}>{this.state.data.tra_purse_money}</Text>
                            <TouchableOpacity ctiveOpacity={0.5} onPress={this.copy.bind(this)}>
                                <Text style={styles.CardViewTextEvent}>复制地址</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
    async copy(){
        Clipboard.setString(this.state.data.tra_purse_money);
        await Clipboard.getString();
        Loading.Toast('复制成功')
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
    },
    CardView: {
        width: Utils.size.width - 40,
        justifyContent: 'center',
        marginTop: 50,
        borderRadius: 5,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    CardViewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
    },
    CardViewHeaderActiver: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    CardViewHeaderText: {
        paddingLeft: 10,
    },
    CardViewHeaderUid: {
        color: '#A2A3A2',
        fontSize: Utils.setSpText(14),
    },
    CardViewHeaderName: {
        color: '#000',
        fontSize: Utils.setSpText(18),
    },
    MainQrcode: {
        paddingTop: 10,
        paddingBottom: 30,
        alignItems: 'center',
    },
    CardViewText: {
        paddingBottom: 10,
        color: '#000',
        fontSize: Utils.setSpText(14),
    },
    CardViewTextEvent: {
        color: '#466BE8',
        fontSize: Utils.setSpText(16)
    }
})


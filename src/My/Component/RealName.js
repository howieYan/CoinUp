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
    AsyncStorage,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class RealName extends Component {
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
            data: {}
        }
    }
    componentDidMount () {
        this.LoadData()
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
                {
                    Number(this.state.data.card_status) === 0 ?
                        <View style={styles.contentCenter}>
                            <Text style={{paddingTop: 30, fontSize:Utils.setSpText(20), color: '#000'}}>为保障资金安全</Text>
                            <Text style={{paddingTop: 20, color: '#A4A5A4', fontSize:Utils.setSpText(14),}}>请尽快完成实名认证，以使用全部功能</Text>
                        </View>
                        :
                        <View style={styles.contentCenter}>
                            <View style={styles.CenterHeaderCard}>
                                <Text style={styles.CenterHeaderCardText}>C3</Text>
                            </View>
                            <Text style={styles.CenterHeaderCardBottText}>认证等级</Text>
                            <Text style={styles.CenterHeaderCardBottTextText}>棒！你已完成认证</Text>
                        </View>
                }

                <View style={{backgroundColor: '#f6f6f6',height: 5,}}/>
                <View style={styles.ListView}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onIdCard.bind(this, this.state.data.card_status)}>
                        <View style={styles.ListViewCell}>
                            <View style={styles.ListViewCellLeft}>
                                <Text style={styles.ListViewCellLeftText}>身份证登记</Text>
                                {
                                    Number(this.state.data.card_status) === 0 ?
                                        <Text style={styles.ListViewCellLeftTextbott}>请登本人在有效期限的身份证信息</Text>
                                        :
                                        <Text style={styles.ListViewCellLeftTextbott}>{this.getName(this.state.data.real_name, )}  {this.getIdCard(this.state.data.cardid, )}</Text>
                                }

                            </View>
                            <View style={{flexDirection: 'row'}}>
                               {Number(this.state.data.card_status) === 0 ? <Text style={styles.MyCellRightName}>未认证</Text>: <Text style={styles.MyCellRightNameActive}>已认证</Text>}
                                {Number(this.state.data.card_status) === 0 ? <Image style={styles.UserHeaderRightIcon} source={require('../../Image/My/RightIcon.png')}/> : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    // 身份证登记
    onIdCard (record) {
        if (Number(record) === 0) {
            this.props.navigation.navigate('IdentityCardReg', {name: '身份证登记', data: this.state.data, RecodeLoad: () => {this.LoadData()}})
        }
    }
    // 截取姓名
    getName (str) {
        str = String(str)
        let data = str.substr(0,0)+"**"+str.substr(str.length - 1);
        return data
    }
    // 截取身份证
    getIdCard (str) {
        str = String(str)
        let data = str.substr(0,1)+"****************"+str.substr(str.length - 1);
        return data
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    contentCenter: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    CenterHeaderCard: {
        backgroundColor: '#F7BC3A',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10
    },
    CenterHeaderCardText: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    },
    CenterHeaderCardBottText: {
        paddingTop: 10,
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    CenterHeaderCardBottTextText: {
        paddingTop: 10,
        fontSize: Utils.setSpText(16),
        color: '#969796',
    },
    ListView: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    ListViewCell: {
        paddingTop:10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListViewCellLeft: {
        flex: 1,
    },
    ListViewCellLeftText:{
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    ListViewCellLeftTextbott: {
        paddingTop: 5,
        color: '#969796',
        fontSize: Utils.setSpText(14),
    },
    UserHeaderRightIcon: {
        width: 20,
        height: 20,
    },
    MyCellRightName: {
        fontSize: Utils.setSpText(14),
    },
    MyCellRightNameActive: {
        color: '#56B882',
        fontSize: Utils.setSpText(14),
    }
})


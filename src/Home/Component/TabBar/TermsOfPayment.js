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
    ScrollView, AsyncStorage
} from 'react-native';
import Utils from "../../../Component/Utils";
import {Loading} from "../../../Component/Loading";

export default class TermsOfPayment extends Component {
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
            isCurrency: 0,
            data: {}
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/sendPayType',);
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
                <ScrollView>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let List = [];
        let Array = this.state.data
        if (Array.length > 0) {
            Array.forEach((v, i) => {
                List.push(
                    <TouchableOpacity activeOpacity={0.5} key={i}  onPress={ this.onCell.bind(this, v, i)}>
                        <View style={[styles.CurrencyCell]}>
                            <Image style={styles.CurrencyCellImage} source={{uri: v.pay_thumb}}/>
                            <View style={styles.content}>
                                <Text style={styles.CurrencyCellName}>{v.pay_name}</Text>
                            </View>
                            {this.state.isCurrency === i ? <Image style={styles.CurrencyCellIcon} source={require('../../../Image/My/YesIcon.png')}/> : null}
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        return List;
    }
    onCell (record, index) {
        this.setState({
            isCurrency: index
        })
        this.onBackButton(record.pay_id)
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.state.params.RecodeLoad(record)
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    CurrencyCell: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    CurrencyCellName: {
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    CurrencyCellIcon: {
        width: 20,
        height: 20,
    },
    CurrencyCellImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 3
    }
})


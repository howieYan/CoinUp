/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text, AsyncStorage, ScrollView, TouchableOpacity, Image} from 'react-native';
import Utils from "../../Component/Utils";
import {Loading} from "../../Component/Loading";

export default class CurrencyTransfer extends Component {
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
            data: {},
            isCurrency: 0
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let data = await Utils.LoadPost(Utils.size.url + '/api/projects/transferType');
            console.log(data);
            if (Number(data.code === 0)) {
                this.setState({
                    data: data.result,
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
                            <View style={styles.content}>
                                <Text style={styles.CurrencyCellName}>{v.tt_name}</Text>
                            </View>
                            {this.state.isCurrency === i ? <Image style={styles.CurrencyCellIcon} source={require('../../Image/My/YesIcon.png')}/> : null}
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
        this.onBackButton(record)
    }
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
    }
})


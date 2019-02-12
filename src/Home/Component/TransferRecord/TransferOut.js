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
    ScrollView
} from 'react-native';
import Utils from "../../../Component/Utils";
import {Loading} from "../../../Component/Loading";

export default class TransferOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            recordType: 2,
            address: '',
            page: 1,
            size: 500,
            total: null,
            List: [],
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
            let form = new FormData();
            form.append('recordType', this.state.recordType);
            form.append('address', data.result.tra_purse_money);
            form.append('page', this.state.page);
            form.append('size', this.state.size);
            let dataList = await Utils.LoadPost(Utils.size.url + '/api/projects/getRecord', form);
            console.log(dataList);
            if (Number(data.code === 0)) {
                this.setState({
                    List: dataList.result.list,
                    total: dataList.result.total
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
                    <View style={styles.content}>
                        <View style={styles.ListView}>
                            {this.renderList()}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let List = [];
        if (this.state.List.length > 0) {
            this.state.List.forEach((v, i) => {
                List.push (
                    <View style={styles.ListViewItems} key={i}>
                        <Text style={styles.ListViewItemsTitleText}>{v.coin_remark}</Text>
                        <Text style={[styles.ListViewItemsConentText, styles.ListViewItemsConentTextTop]}>{v.repeat_code}</Text>
                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                            <Text style={[styles.ListViewItemsLeftText,{flex: 1}]}>转出去: {v.coin_num}</Text>
                            <Text style={styles.ListViewItemsLeftText}>{Utils.formatTs(v.coin_time, 'YYYY年MM月DD HH:mm')}</Text>
                        </View>
                    </View>
                )
            })
        }
        return List;
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    ListView: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    ListViewItems: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListViewItemsTitleText: {
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    ListViewItemsConentText: {
        fontSize: Utils.setSpText(14),
        color: '#2b2b2b',
    },
    ListViewItemsConentTextTop: {
        paddingTop: 10,
    },
    ListViewItemsLeftText: {
        fontSize: Utils.setSpText(13),
        color: '#8F908F'
    }
})


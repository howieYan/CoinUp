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
    AsyncStorage,
    ListView,
    TouchableOpacity
} from 'react-native';
import Utils from "../../../../Component/Utils";
import {SwRefreshListView} from 'react-native-swRefresh';
import * as api from '../../../../Component/data';
import {Loading} from "../../../../Component/Loading";
export default class SellingCurrency extends Component {
    _page= 1;
    _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
    constructor(props){
        super(props);
        this.state ={
            dataSource:this._dataSource.cloneWithRows(api.apiSellingCurrency),
            List: [],
            total: '',
            classify: 2,
            size: 10,
            isBottomMode: false,
            isListRefresh: false,
        }
        this.LoadDataFoot = this.LoadDataFoot.bind(this)
        this.onListRefresh = this.onListRefresh.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
    }
    componentDidMount () {
        Loading.show('努力加载中...');
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            this.refs.listView.beginRefresh();
            this.setState({
                isListRefresh: true
            })
        },200)
    }
    async LoadData () {
        try {
            this._page = 1
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', this.state.size);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/listAll', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                Loading.hidden();
                this.setState({
                    dataSource:this._dataSource.cloneWithRows(data.result.list),
                    List: data.result.list,
                    total: data.result.total,
                })
                if (Number(this.state.total) >= 6) {
                    this.setState({
                        isBottomMode: true
                    })
                }
            } else {
                Loading.hidden();
                Loading.Toast(data.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async LoadDataFoot () {
        try {
            this.page++
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', this.state.size);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/listAll', formData);
            if (Number(data.code === 0)) {
                if (this.state.total >= 6) {
                    this.setState({
                        List: [...this.state.List, ...data.result.list],
                        dataSource:this._dataSource.cloneWithRows([...this.state.List, ...data.result.list]),
                        isBottomMode: true,
                    })
                    this.refs.listView.endLoadMore(Number(this.state.List)  >= Number(this.state.total))
                } else {
                    this.setState({
                        isBottomMode: false,
                    })
                }
            } else {
                Loading.Toast(data.message);
            }
            Loading.Toast(data.message);
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        let {total, isBottomMode, dataSource} = this.state
        return (
            <View style={styles.content}>
                <SwRefreshListView
                    dataSource={dataSource}
                    ref="listView"
                    total={total}
                    renderRow={this.renderItems}
                    onRefresh={this.onListRefresh}
                    onLoadMore={this.onLoadMore}
                    isShowLoadMore={isBottomMode}
                />
            </View>
        );
    }
    renderItems = (rowData) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.onDetails.bind(this, rowData)}>
                <View style={styles.ListView}>
                    <View style={styles.ListViewItems}>
                        <View style={styles.ListViewHeader}>
                            <View style={[styles.content,{flexDirection: 'row',alignItems: 'center'}]}>
                                <Image style={styles.ListItemsAvatar} source={{uri: rowData.avatar}}/>
                                <Text style={styles.ListItemsUserName} numberOfLines={1}>{rowData.nickname}</Text>
                                <Image style={styles.ListItemsAlipay} source={Number(rowData.pay_type) === 1 ? require('../../../../Image/Home/AlipayIcon.png') : Number(rowData.pay_type) === 2 ? require('../../../../Image/Wechat.png') : require('../../../../Image/Home/unionpayIcon.png')}/>
                            </View>
                            <View style={styles.ListViewHeaderRight}>
                                <Text style={styles.ListViewHeaderNumber}>{Number(rowData.sell_type) === 1 ? rowData.min_price : rowData.sell_price}</Text>
                                <Text style={styles.ListViewHeaderRightTxet}>CNY</Text>
                            </View>
                        </View>
                        <View style={styles.ListViewContent}>
                            <View style={{flex: 1,}}>
                                <View style={styles.ListViewContentItems}>
                                    <Text style={styles.ListViewContentItemsNumberText}>数量</Text>
                                    <Text style={styles.ListViewContentItemsNumber}>{rowData.sell_num} </Text>
                                </View>
                                <View style={[styles.ListViewContentItems, styles.ListViewContentItemsPaddTop]}>
                                   <Text style={styles.ListViewContentItemsNumberText}>{Number(rowData.sell_type) === 1 ? '金额' : '一口价'}</Text>
                                   <Text style={styles.ListViewContentItemsNumber}>{Number(rowData.sell_type) === 2 ?  rowData.sell_price : rowData.min_price + '-'+ rowData.max_price+ 'CNY'}</Text>
                               </View>
                            </View>
                            <View style={styles.ListViewContentRight}>
                                <Text style={styles.ListViewContentRightText}>出售</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    onListRefresh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page = 1;
            this.LoadData();
            this.refs.listView.resetStatus();
            if (this.state.isListRefresh){
                end()//刷新成功后需要调用end结束刷新
            }
        },1500)
    }
    onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this.LoadDataFoot();
        },1000)
    }
    // 详情
    onDetails (record) {
        this.props.navigation.navigate('Details', {name: '出售', id: record.sell_id, status: 1})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    ListView: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    ListViewItems: {
        paddingTop: 10,
        borderBottomColor: '#F5F6F5',
        borderBottomWidth: 1,
    },
    ListViewHeader: {
        flexDirection:'row',
        alignItems: 'center',
    },
    ListItemsAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    ListItemsUserName: {
        color: '#000',
        width: 80,
        fontSize: Utils.setSpText(15),
        paddingLeft: 5,
        paddingRight: 5,
    },
    ListItemsAlipay: {
        width: 15,
        height: 15,
        borderRadius: 2,
    },
    ListItemsUnionpay: {
        marginLeft: 5,
        height: 15,
        width: 30,
    },
    ListViewHeaderRight: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ListViewHeaderNumber: {
        fontSize: Utils.setSpText(20),
        color: '#000',
        // fontWeight: 'bold'
    },
    ListViewHeaderRightTxet: {
        paddingLeft: 5,
        fontSize: Utils.setSpText(15),
        color: '#000',
    },
    ListViewContent: {
        paddingBottom: 15,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListViewContentItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListViewContentItemsNumberText: {
        fontSize: Utils.setSpText(15),
        color: '#BEC0C0',
    },
    ListViewContentItemsNumber: {
        paddingLeft: 10,
        fontSize: Utils.setSpText(15),
        color: '#000',
    },
    ListViewContentItemsPaddTop: {
        paddingTop: 15,
    },
    ListViewContentRight: {
        width: 80,
        backgroundColor: '#D73F41',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    ListViewContentRightText: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    }
})


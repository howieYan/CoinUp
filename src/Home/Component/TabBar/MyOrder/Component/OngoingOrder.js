/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    BackHandler,
    NetInfo,
    Alert, AsyncStorage, ListView
} from 'react-native';
import Utils from "../../../../../Component/Utils";
import {Loading} from "../../../../../Component/Loading";
import * as api from "../../../../../Component/data";
import {SwRefreshListView} from "react-native-swRefresh";

export default class OngoingOrder extends Component {
    _page = 1;
    _dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this._dataSource.cloneWithRows(api.apiAllOrder),
            state: 1,
            size: 8,
            List: [],
            total: null,
            isBottomMode: false,
            isListRefresh: false,
        }
        this.LoadDataFoot = this.LoadDataFoot.bind(this)
        this.onListRefresh = this.onListRefresh.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
    }


    componentDidMount() {
        let _this = this;
        Loading.show('努力加载中...');
        let timer = setTimeout(()=>{
            clearTimeout(timer);
            _this.refs.listView.beginRefresh();
            _this.setState({
                isListRefresh: true
            })
        },200)
    }

    async LoadDataList() {
        try {
            let {state, page, size} = this.state
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('state', state);
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', size);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/orderList', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                Loading.hidden();
                this.setState({
                    dataSource:this._dataSource.cloneWithRows(data.result.list),
                    List: data.result.list,
                    total: data.result.total,
                })
                if (Number(this.state.total) >= 3) {
                    this.setState({
                        isBottomMode: true
                    })
                }
            } else {
                Loading.Toast(data.message);
            }
            Loading.hidden()
        } catch (e) {
            console.log(e);
        }
    }

    async LoadDataFoot() {
        try {
            // this.setState({refreshState: RefreshState.FooterRefreshing})
            this.page++
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('state', state);
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', size);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/orderList', formData);
            if (Number(data.code === 0)) {
                Loading.hidden();
                if (this.state.total >= 3) {
                    this.setState({
                        List: [...this.state.List, ...data.result.list],
                        dataSource: this._dataSource.cloneWithRows([...this.state.List, ...data.result.list]),
                        isBottomMode: true,
                    })
                    this.refs.listView.endLoadMore(Number(this.state.List) >= Number(this.state.total))
                } else {
                    this.setState({
                        isBottomMode: false,
                    })
                }
            } else {
                Loading.hidden();
                Loading.Toast(data.message);
            }
        } catch (e) {
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
                <View style={styles.ListStyle}>
                    <View style={styles.ListItem}>
                        <View style={styles.ListItemHeader}>
                            <View style={styles.ListItemHeaderLeft}>
                                <Text style={styles.ListItemHeaderLeftText}>购买</Text>
                            </View>
                            <Text style={styles.ListItemHeaderRight}>{Number(rowData.order_state) === 1 ? '进行中' : '已完成'}</Text>
                        </View>
                        <View style={styles.ListItemContent}>
                            <View style={styles.ListItemContentItemsRow}>
                                <Text style={styles.ListItemContentItemsRowLeft}>{Number(rowData.order_type) === 1 ? '买家' : '卖家'}</Text>
                                <View style={styles.ListItemContentItemsRowRight}>
                                    <Image source={!rowData.avatar ? require('../../../../../Image/My/UserActiver.png') : {uri: rowData.avatar}}
                                           style={styles.ListItemContentItemsRowRightIcon}/>
                                    <Text style={styles.ListItemContentItemsRowRightText}
                                          numberOfLines={1}>{rowData.nickname}</Text>
                                </View>
                            </View>
                            <View style={styles.ListItemContentItemsRow}>
                                <Text style={styles.ListItemContentItemsRowLeft}>价格 ¥</Text>
                                <View style={styles.ListItemContentItemsRowRight}>
                                    <Text style={styles.ListItemContentItemsRowRightText}
                                          numberOfLines={1}>{rowData.order_price}</Text>
                                </View>
                            </View>
                            <View style={styles.ListItemContentItemsRow}>
                                <Text style={styles.ListItemContentItemsRowLeft}>数量</Text>
                                <View style={styles.ListItemContentItemsRowRight}>
                                    <Text style={styles.ListItemContentItemsRowRightText}
                                          numberOfLines={1}>{rowData.order_num}</Text>
                                </View>
                            </View>
                            <View style={styles.ListItemContentItemsRow}>
                                <Text style={styles.ListItemContentItemsRowLeft}>总金额</Text>
                                <View style={styles.ListItemContentItemsRowRight}>
                                    <Text style={styles.ListItemContentItemsRowRightText}
                                          numberOfLines={1}>{rowData.order_amount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ListItemBottom}>
                            <Text style={styles.ListItemBottomLeft}>单号：{rowData.order_code}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    onListRefresh(end) {
        let _this = this
        let timer = setTimeout(() => {
            clearTimeout(timer)
            _this._page = 1;
            _this.LoadDataList();
            _this.refs.listView.resetStatus();
            if (_this.state.isListRefresh) {
                end()//刷新成功后需要调用end结束刷新
            }
        }, 1500)
    }

    onLoadMore(end) {
        let _this = this
        let timer = setTimeout(() => {
            clearTimeout(timer)
            _this.LoadDataFoot();
        }, 1000)
    }
    // 详情
    onDetails (record) {
        this.props.navigation.navigate('OrderDetails', {name: '订单详情', orderId: record.order_id})
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#f5f6f6'
    },
    ListStyle: {
        marginTop: 5,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    ListItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    ListItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    ListItemHeaderLeft: {
        backgroundColor: '#C7ECD0',
        borderWidth: 1,
        borderColor: '#85C9AA'
    },
    ListItemHeaderLeftText: {
        padding: 5,
        color: '#5ABC87',
        fontSize: Utils.setSpText(12),
    },
    ListItemHeaderRight: {
        flex: 1,
        textAlign: 'right',
        color: '#4063D5',
        fontSize: Utils.setSpText(14),
    },
    ListItemContent: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    ListItemContentItemsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    ListItemContentItemsRowLeft: {
        flex: 1,
        color: '#8F908F',
        fontSize: Utils.setSpText(14),
    },
    ListItemContentItemsRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListItemContentItemsRowRightIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    ListItemContentItemsRowRightText: {
        color: '#000',
        fontSize: Utils.setSpText(14),
        paddingLeft: 10,
    },
    ListItemBottom: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListItemBottomLeft: {
        color: '#A1A2A1',
        fontSize: Utils.setSpText(13)
    }
})


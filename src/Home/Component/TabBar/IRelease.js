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
    AsyncStorage,
    ListView
} from 'react-native';
import Utils from "../../../Component/Utils";
import ActionButton from "react-native-action-button";
import {Loading} from "../../../Component/Loading";
import {SwRefreshListView} from 'react-native-swRefresh';
import * as api from '../../../Component/data';

export default class IRelease extends Component {
    _page = 1;
    _dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this._dataSource.cloneWithRows(api.apiIRelease),
            List: [],
            total: null,
            size: 10,
            isBottomMode: false,
            isListRefresh: false,
        }
        this.onBackButton = this.onBackButton.bind(this)
        this.onReleaseCancelled = this.onReleaseCancelled.bind(this)
        this.LoadDataFoot = this.LoadDataFoot.bind(this)
        this.onListRefresh = this.onListRefresh.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
    }

    componentDidMount() {
        Loading.show('努力加载中...');
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.refs.listView.beginRefresh();
            this.setState({
                isListRefresh: true
            })
        }, 200)
    }

    async LoadData() {
        try {
            // this.setState({refreshState: RefreshState.HeaderRefreshing})
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', this.state.size);
            console.log(formData)
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/getRelease', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.setState({
                    dataSource: this._dataSource.cloneWithRows(data.result.list),
                    List: data.result.list,
                    total: data.result.total,
                })
                if (Number(this.state.total) >= 6) {
                    this.setState({
                        isBottomMode: true
                    })
                }
            } else {
                // this.setState({refreshState: RefreshState.Failure})
                Loading.Toast(data.message);
            }
            Loading.hidden()
        } catch (e) {
            console.log(e);
        }
    }

    async LoadDataFoot() {
        try {
            this._page++
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('page', this._page);
            formData.append('size', this.state.size);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/getRelease', formData);
            if (Number(data.code === 0)) {
                if (this.state.total >= 6) {
                    this.setState({
                        dataSource: this._dataSource.cloneWithRows([...this.state.List, ...data.result.list]),
                        List: [...this.state.List, ...data.result.list],
                        isBottomMode: true,
                    })
                    this.refs.listView.endLoadMore(Number(this.state.List) >= Number(this.state.total))
                } else {
                    this.setState({
                        isBottomMode: false,
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

    render() {
        let {List, dataSource, total, isBottomMode} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon}
                                   source={require('../../../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>我的发布</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
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


                <ActionButton
                    position={'right'}
                    offsetY={50}
                    buttonColor="#E62324"
                    renderIcon={() => (
                        <View style={styles.actionButtonView}>
                            <Image style={{width: 20, height: 20}}
                                   source={require('../../../Image/Find/ActionButton.png')}/>
                            <Text style={{color: '#fff', fontSize: Utils.setSpText(12), paddingTop: 5}}>创建</Text>
                        </View>
                    )}
                    onPress={this.onReleaseCancelled}
                />
            </View>
        );
    }

    renderItems = (rowData) => {
        return (

            <View style={styles.ListView}>
                <View style={styles.ListViewItems}>
                    <View style={styles.ListViewHeader}>
                        <View style={[styles.content, {flexDirection: 'row', alignItems: 'center'}]}>
                            <Image style={styles.ListItemsAvatar}
                                   source={rowData.avatar ? {uri: rowData.avatar} : require('../../../Image/My/UserActiver.png')}/>
                            <Text style={styles.ListItemsUserName} numberOfLines={1}>{rowData.nickname}</Text>
                            <Image style={styles.ListItemsAlipay}
                                   source={Number(rowData.pay_type) === 1 ? require('../../../Image/Home/AlipayIcon.png') : Number(rowData.pay_type) === 2 ? require('../../../Image/Wechat.png') : require('../../../Image/Home/unionpayIcon.png')}/>
                        </View>
                        <View style={styles.ListViewHeaderRight}>
                            <Text
                                style={styles.ListViewHeaderNumber}>{Number(rowData.sell_type) === 1 ? rowData.min_price : rowData.sell_price}</Text>
                            <Text style={styles.ListViewHeaderRightTxet}>CNY</Text>
                        </View>
                    </View>
                    <View style={styles.ListViewContent}>
                        <View style={{flex: 1,}}>
                            <View style={styles.ListViewContentItems}>
                                <Text style={styles.ListViewContentItemsNumberText}>数量</Text>
                                <Text style={styles.ListViewContentItemsNumber}>{rowData.sell_num}</Text>
                            </View>
                            <View style={[styles.ListViewContentItems, styles.ListViewContentItemsPaddTop]}>
                                <Text
                                    style={styles.ListViewContentItemsNumberText}>{Number(rowData.sell_type) === 1 ? '金额' : '一口价'}</Text>
                                <Text
                                    style={styles.ListViewContentItemsNumber}>{Number(rowData.sell_type) === 2 ? rowData.sell_price : rowData.min_price + '-' + rowData.max_price + 'CNY'}</Text>
                            </View>
                        </View>
                        {
                            Number(rowData.sell_classify) === 1 ?
                                <View style={styles.ListViewContentRightRed}>
                                    <Text style={styles.ListViewContentRightTextRed}>出售</Text>
                                </View>
                                :
                                <View style={styles.ListViewContentRight}>
                                    <Text style={styles.ListViewContentRightText}>购买</Text>
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    // 创建
    onReleaseCancelled() {
        this.props.navigation.navigate('ReleaseCancelled', {
            name: '发布挂单', RecodeLoad: () => {
                this.LoadData();
            }
        })
    }

    // 返回
    onBackButton() {
        this.props.navigation.popToTop()
    }

    // 下拉刷新
    onListRefresh(end) {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this._page = 1;
            this.LoadData();
            this.refs.listView.resetStatus();
            if (this.state.isListRefresh) {
                end()//刷新成功后需要调用end结束刷新
            }
        }, 1500)
    }

    // 上拉刷新
    onLoadMore(end) {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.LoadDataFoot();
        }, 1000)
    }

    // onDetails(record) {
    // this.props.navigation.navigate('Details', {
    //     name: Number(record.sell_classify) === 1 ? '出售' : '购买',
    //     id: record.sell_id,
    //     status:  Number(record.sell_classify) === 1 ? 1 : 2
    // })
    // }
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
        paddingTop: (Utils.size.os === 'ios') ? 30 : 0,
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
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    actionButtonView: {
        alignItems: 'center',
        justifyContent: 'center'
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    ListItemsAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    ListItemsUserName: {
        color: '#000',
        fontSize: Utils.setSpText(15),
        width: 80,
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
        backgroundColor: '#57C38B',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    ListViewContentRightText: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    },
    ListViewContentRightRed: {
        width: 80,
        backgroundColor: '#D73F41',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    ListViewContentRightTextRed: {
        color: '#fff',
        fontSize: Utils.setSpText(16),
    }
})


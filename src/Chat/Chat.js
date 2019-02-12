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
    Alert,
    AsyncStorage,
    Animated, ListView, TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';
import Utils from "../Component/Utils";
import {connect} from 'react-redux'
import {fachRoster, fachMessageList, change_friends} from '../store/actions'
import {SwipeListView} from 'react-native-swipe-list-view';
import {Loading} from "../Component/Loading";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.data = []
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isRefreshing: false,
            modalVisible: false,
            focused: false,
            search: '',
            selectedTab: 'contacts',
            notifyCount: 0,
            presses: 0,
            LoadMessagesList: [],
            TextMessageList: [],
            DataList: [],
            historyData: 0,
            listType: 'FlatList',
            listViewData: this.data,
            data: {}
        }
    }

    async LoadData() {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            formData.append('page', 1);
            formData.append('size', 50);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/getFriends', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.setState({
                    listViewData: data.result.list
                })
            } else {
                Loading.Toast(data.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.LoadData()
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <View style={styles.headersLeft}/>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>聊天</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                <View style={styles.content}>
                    <SwipeListView
                        useFlatList
                        data={this.state.listViewData}
                        renderItem={this.renderList}
                        renderHiddenItem={this.HiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        disableRightSwipe={true}
                        onRowDidOpen={this.onRowDidOpen}
                        onSwipeValueChange={this.onSwipeValueChange}
                    />
                </View>
            </View>
        );
    }
    // 关闭抽屉
    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    // 删除好友
    deleteRow(rowMap, rowKey, record) {
        this.delFriend(rowMap, rowKey, record)
    }
    // 删除好友
    async delFriend(rowMap, rowKey, record) {
        try {
            let formData = new FormData();
            formData.append('uId', record.u_id);
            formData.append('ufId', record.uf_uid);
            let data = await Utils.LoadPost(Utils.size.url + '/api/sales/delFriend', formData);
            console.log(data)
            if (Number(data.code === 0)) {
                this.closeRow(rowMap, rowKey);
                const newData = [...this.state.listViewData];
                const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
                newData.splice(prevIndex, 1);
                this.setState({listViewData: newData});
            } else {
                Loading.Toast(data.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    onRowDidOpen = (key, rowKey, rowMap) => {
        // console.log('This row opened', key);
    }
    onSwipeValueChange = (swipeData) => {
        // console.log(swipeData)
    }
    renderList = (rowData) => {
        return (
            <TouchableHighlight onPress={this.onChatDetails.bind(this, rowData.item)} key={rowData.index}>
                <View style={styles.ListView}>
                    <View style={styles.ListViewItems}>
                        <Image
                            source={rowData.item.avatar === '' ? require('../Image/My/UserActiver.png') : {uri: rowData.item.avatar}}
                            style={styles.ListViewItemsImg}/>
                        <View style={styles.content}>
                            <Text style={styles.ListViewItemsUserName}>{rowData.item.nickname}</Text>
                        </View>
                        <View style={{alignItems: 'flex-start'}}>
                            <Text style={styles.ListViewItemsTime}>{rowData.item.uf_create_time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    HiddenItem = (data, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                  onPress={this.closeRow.bind(this, rowMap, data.item.key)}>
                    <Text style={styles.backTextWhite}>关闭</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                  onPress={this.deleteRow.bind(this, rowMap, data.item.key, data.item)}>
                    <View style={[styles.trash,]}>
                        <Image
                            source={{uri: 'https://raw.githubusercontent.com/jemise111/react-native-swipe-list-view/master/SwipeListExample/images/trash.png'}}
                            style={styles.trash}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onChatDetails(record) {
        this.props.navigation.navigate('ChatDetails', {
            name: record.nickname + '聊天',
            items: record.mob_username,
            data: record,
            chat: 'chat'
        })
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
        paddingTop: 10,
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    ListView: {
        backgroundColor: '#fff',
        paddingRight: 10,
        paddingLeft: 10,
    },
    ListViewItems: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF',
    },
    ListViewItemsImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    ListViewItemsUserName: {
        fontSize: Utils.setSpText(16),
        color: '#000',
    },
    ListViewItemsMessage: {
        flex: 1,
        paddingTop: 10,
        fontSize: Utils.setSpText(13),
        color: '#7E7F7E',
    },
    ListViewItemsTime: {
        fontSize: Utils.setSpText(12),
        color: '#7E7F7E',
    },
    separator: {
        height: 1,
        marginHorizontal: 15,
        backgroundColor: '#CCCCCC',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Utils.size.width / 4,
    },
    trash: {
        height: 25,
        width: 25,
    },
    backTextWhite: {
        color: '#FFF',
        fontSize: Utils.setSpText(18)
    },
})
const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        MessageList: state.posts.MessageList
    }
}
export default connect(mapStateToProps, {fachRoster, fachMessageList, change_friends})(Chat)

import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';

import {GiftedChat, Actions, Bubble, SystemMessage, Send} from 'react-native-gifted-chat';
import Utils from "../Component/Utils";
import ImagePickerManager from 'react-native-image-picker';
import WebIM from "../Lib/WebIM";
import {connect} from 'react-redux'
import {fachRoster, fachMessageList, change_friends} from '../store/actions'
import {Loading} from "../Component/Loading";

class ChatDetails extends React.Component {
    counter = 0
    constructor(props) {
        super(props);
        this.state = {
            messages: [], // 消息数组，用于展示消息 有特定的格式
            // loadEarlier: true,
            // typingText: '请输入你要说的话',
            isLoadingEarlier: false,
            data: {},
            user: {}
        };
        WebIM.conn.listen({
            // xmpp连接成功
            onOpened: (msg) => {
                // 出席后才能接受推送消息
                WebIM.conn.setPresence();
                console.log("%c [opened] 连接已成功建立", "color: green")
                // 获取好友信息
            },
            // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
            onPresence: (msg) => {
                console.debug('onPresence', msg)
            },
            // 失败回调
            onError: (message) => {
                console.log('失败回调', message)
                if (message && message.type === 1) {
                    alert('连接建立失败！请确认您的登录账号是否和appKey匹配。')
                }
            },
            // 处理好友申请
            onRoster: (message) => {
                console.log('处理好友申请', message)
            },
            // 连接关闭回调
            onClosed: (msg) => {
                console.log('onClosed')
            },
            // 本机网络连接成功
            onOnline: (message) => {
                console.log('本机网络连接成功', message)
            },
            // 收到文本消息
            onTextMessage: (message) => {
                this._onReceive(message, 'text')
            },
            //收到图片消息
            onPictureMessage: (message) => {
                console.log('onPictureMessage', message)
                this._onReceive(message, 'image')
                // store.dispatch(MessageActions.addMessage(message, 'img'))
            }
        })
        this._isMounted = false;
        this.onBackButton = this.onBackButton.bind(this);
        this.onSend = this.onSend.bind(this);
        // this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        // this.renderSend = this.renderSend.bind(this);
        this.onActionsEvent = this.onActionsEvent.bind(this);
        this._isAlright = null;
    }

    componentWillMount() {

    }

    // 收到消息
    _onReceive(messages, type) {
        if (type === 'text') {
            this.onReceiveText(messages) // 收到文本消息
        } else {
            this.onReceiveImage(messages) // 收到图片消息
        }

    }

    // 收到图片消息
    async onReceiveImage(messages) {
        let {items} = this.props.navigation.state.params
        let {data} = this.props.navigation.state.params
        if (messages.from === items) {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, {
                    _id: this.counter++,
                    text: null,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: data.nickname,
                        avatar: data.avatar,
                    },
                    image: messages.url
                }),
            }))
        }


    }

    // 收到文本消息
    onReceiveText(messages) {
        let {items} = this.props.navigation.state.params
        let {data} = this.props.navigation.state.params
        console.log('收到文本消息data', data)
        if (messages.from === items) {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, {
                    _id: this.counter++,
                    text: messages.data,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: data.nickname,
                        avatar: data.avatar,
                    },
                }),
            }))
        }
    }

    componentDidMount() {
        this._isMounted = true;
        // let {items} = this.props.navigation.state.params
        // console.log('this.props.navigation.state.params', this.props.navigation.state.params)
        this.LoadData()
        this.LoadHisyMessage()
    }

    // 登录环信
    async LoadData() {
        try {
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            formData.append('uId', Uid);
            let user = await Utils.LoadPost(Utils.size.url + '/api/my/getInfo', formData);
            if (Number(user.code === 0)) {
                let options = {
                    apiUrl: WebIM.config.apiURL,
                    user: user.result.mob_username,
                    pwd: user.result.mob_username,
                    appKey: WebIM.config.appkey
                };
                WebIM.conn.open(options);
                this.setState({
                    data: user.result,
                    user: user.result,
                })
            } else {
                Loading.Toast(user.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    // 获取历史消息
    async LoadHisyMessage() {
        try {
            let {data, chat} = this.props.navigation.state.params
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            if (chat === 'chat') {
                formData.append('uId', Uid);
                formData.append('sellId', null);
                formData.append('receive', data.uf_uid);
            } else {
                formData.append('uId', Uid);
                formData.append('sellId', data.sell_id);
                formData.append('receive', data.user_id);
            }
            let message = await Utils.LoadPost(Utils.size.url + '/api/sales/getChat', formData);
            console.log(message)
            if (Number(message.code === 0)) {
                let list = []
                if (message.result.list.length > 0) {
                    message.result.list.forEach((v, i) => {
                        if (Number(v.chat_type) === 1) {
                            let item = {
                                _id: v.chat_id,
                                text: v.chat_content,
                                createdAt: new Date(),
                                user: {
                                    _id: v.chat_send === Uid ? 1 : 2,
                                    name: v.nickname,
                                    avatar: v.avatar
                                },
                            }
                            list.push(item)
                        } else {
                            let item = {
                                _id: v.chat_id,
                                text: null,
                                createdAt: new Date(),
                                user: {
                                    _id: v.chat_send === Uid ? 1 : 2,
                                    name: v.nickname,
                                    avatar: v.avatar
                                },
                                image: v.chat_content
                            }
                            list.push(item)
                        }

                    })
                }

                let item = {
                    _id: Math.round(Math.random() * 1000000),
                    text: null,
                    createdAt: new Date(),
                    system: true,
                };
                console.log('历史数据', list)
                let messagesList = [...list, item];
                this.setState({
                    messages: messagesList
                })
            } else {
                Loading.Toast(message.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    // 发送按钮
    onSend(messages = []) {
        if (messages[0].image) {
            this.onSendImage(messages)
        } else {
            this.onSendText(messages)
        }
    }

    // 发送文本消息
    async onSendText(messages) {
        try {
            let {items, chat} = this.props.navigation.state.params
            let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
            let msg = new WebIM.message('txt', id);      // 创建文本消息
            let text = messages[0].text
            let {data} = this.props.navigation.state.params
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            if (chat === 'chat') {
                formData.append('uId', Uid);
                formData.append('receive', data.uf_uid);
                formData.append('type', 1);
                formData.append('message', text);
                formData.append('sellId', null);
            } else {
                formData.append('uId', Uid);
                formData.append('receive', data.user_id);
                formData.append('type', 1);
                formData.append('message', text);
                formData.append('sellId', data.sell_id);
            }
            console.log('存储发送文本消息', formData)
            let userList = await Utils.LoadPost(Utils.size.url + '/api/sales/sendChat', formData);
            console.log('存储发送文本消息', userList)
            if (Number(userList.code === 0)) {
                let _this = this;
                msg.set({
                    msg: text,                  // 消息内容
                    to: items,                          // 接收消息对象（用户id）
                    roomType: false,
                    success: function (id, serverMsgId) {
                        _this.setState(previousState => ({
                            messages: GiftedChat.append(previousState.messages, {
                                _id: this.counter++,
                                text: text,
                                createdAt: new Date(),
                                user: {
                                    _id: 1,
                                    name: _this.state.data.nickname,
                                    avatar: _this.state.data.avatar
                                },
                            }),
                        }))
                    },
                    fail: function (e) {
                        console.log("Send private text error", e);
                    }
                });
                msg.body.chatType = 'singleChat';
                WebIM.conn.send(msg.body);
            } else {
                Loading.Toast(userList.message);
            }


        } catch (e) {
            console.log(e)
        }
    }

    // 发送图片消息
    async onSendImage(record) {
        let {items} = this.props.navigation.state.params
        // let {data} = this.state
        const id = WebIM.conn.getUniqueId()
        const type = 'img'
        const to = items
        let _this = this
        const msgObj = new WebIM.message(type, id);
        msgObj.set({
            apiUrl: WebIM.config.apiURL,
            ext: {
                file_length: record.fileSize,
                filename: record.fileName || '',
                filetype: record.fileName && (record.fileName.split('.')).pop(),
                width: record.width,
                height: record.height,
            },
            file: {
                data: {
                    uri: record.uri, type: 'application/octet-stream', name: record.fileName
                }
            },
            to, roomType: '',
            onFileUploadError: function (error) {
                console.log(error)
            },
            onFileUploadComplete: function (data) {
                let image = data.uri + '/' + data.entities[0].uuid
                _this.onSendIMg(image)
            },
            success: function (id) {
                console.log(id)
            },
        });
        WebIM.conn.send(msgObj.body);
    }

    // 发送图片消息
    async onSendIMg(record) {
        try {
            let {data, chat} = this.props.navigation.state.params
            let Uid = await AsyncStorage.getItem('Uid');
            let formData = new FormData();
            if (chat === 'chat') {
                formData.append('uId', Uid);
                formData.append('receive', data.uf_uid);
                formData.append('type', 2);
                formData.append('message', record);
                formData.append('sellId', null);
            } else {
                formData.append('uId', Uid);
                formData.append('receive', data.user_id);
                formData.append('type', 2);
                formData.append('message', record);
                formData.append('sellId', data.sell_id);
            }
            console.log('存储发送图片消息', formData)
            let userList = await Utils.LoadPost(Utils.size.url + '/api/sales/sendChat', formData);
            console.log('存储发送图片消息', userList)
            if (Number(userList.code === 0)) {
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, {
                        _id: this.counter++,
                        text: null,
                        createdAt: new Date(),
                        user: {
                            _id: 1,
                            name: this.state.data.nickname,
                            avatar: this.state.data.avatar
                        },
                        image: record
                    }),
                }))
            }
        } catch (e) {
            console.log(e)
        }
    }

    renderCustomActions(props) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this.onActionsEvent}>
                <View style={styles.actionsContainer}>
                    <View style={[styles.wrapper]}>
                        <Text style={[styles.iconText]}>+</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onActionsEvent() {
        const options = {
            //底部弹出框选项
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 200,
            maxHeight: 200,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                cameraRoll: true,
            }
        }
        ImagePickerManager.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // let file;
                //
                // console.log('file', file)
                this.onSendImage(response)
                // this._fetchImage(response, file);
            }
        });
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    },
                    right: { //我方的气泡
                        backgroundColor: '#4063D5'
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

// renderCustomView(props) {
//     console.log('renderCustomView', props)
//     // return (
//     //     <CustomView
//     //         {...props}
//     //     />
//     // );
// }

    render() {
        let {name} = this.props.navigation.state.params
        let {messages, data} = this.state
        return (
            <View style={styles.content}>
                <View style={styles.headers}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.onBackButton}>
                        <View style={styles.headersLeft}>
                            <Image style={styles.headersLeftIcon}
                                   source={require('../Image/Home/headersLeftIcon.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headersCenter}>
                        <Text style={[styles.headersCenterLeftText]}>{name}</Text>
                    </View>
                    <View style={styles.headersRight}/>
                </View>
                <GiftedChat
                    messages={messages} //消息数组，用于展示消息 有特定的格式
                    onSend={this.onSend} //点击send时的回调
                    loadEarlier={false} // 是否显示加载更早的消息按钮
                    // onLoadEarlier={this.onLoadEarlier} // 加载更多消息时的回调
                    isLoadingEarlier={this.state.isLoadingEarlier} // 点击加载更早的消息时是否出现转菊花的图标
                    minInputToolbarHeight={50}
                    timeFormat={'LT'}
                    user={{
                        _id: 1,
                        name: data.nickname,
                        avatar: data.avatar,
                    }} // 配置用户信息
                    keyExtractor={(item, index) => index.toString()}
                    placeholder={'请输入'}
                    showUserAvatar={true} // 是否为当前用户呈现头像; 默认是false，仅显示其他用户的头像
                    showAvatarForEveryMessage={true} // 则只有当连续消息来自同一天的同一用户时才会显示头像; 默认是false
                    renderAvatarOnTop={true} // 在连续消息的顶部渲染消息头像，而不是底部; 默认是false
                    // renderSend={this.renderSend} // 自定义发送按钮;
                    renderActions={this.renderCustomActions} //自定义输入框左边的按钮
                    renderBubble={this.renderBubble} // 自定义气泡
                    renderSystemMessage={this.renderSystemMessage} //自定义系统消息
                    // renderCustomView={this.renderCustomView} // 在气泡内创建一个自己自定义的视图，即创建自定义的消息
                />
            </View>
        );
    }

    onBackButton() {
        this.props.navigation.goBack()
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
        fontSize: Utils.setSpText(18),
        color: '#000',
    },
    headersRight: {
        width: 50,
    },
    footerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
    actionsContainer: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#aaa',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconText: {
        color: '#aaa',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
});
const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        MessageList: state.posts.MessageList
    }
}
export default connect(mapStateToProps, {fachRoster, fachMessageList, change_friends})(ChatDetails)

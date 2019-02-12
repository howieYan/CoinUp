import * as service from '../store/service';
import {AsyncStorage} from 'react-native'

export default {
    namespace: 'notice',
    state: {
        data: [],
        messages: [],               //当前好友聊天内容
        contacts: [],               //联系人列表
        strangers: [],              //好友请求列表
        chat_history: [],           //聊天列表
        register_data: {},          //注册信息
        total_messages: {},         //全部聊天记录
        system_messages: [],        //系统信息
        has_read_messages: [],
        hasnot_read_messages: [],
        loading: false,
    },
    reducers: {
        'save_message'(state, {payload}) {
            const {user, owner: {loginname}} = payload
            const {messages, total_messages, chat_history} = service.parseMessage(state, payload)
            AsyncStorage.setItem(`${loginname}_total_messages`, JSON.stringify(total_messages))
            AsyncStorage.setItem(`${loginname}_chat_history`, JSON.stringify(chat_history))
            return {...state, messages, total_messages, chat_history};
        },
        'change_friends'(state, {payload}) {
            const {contacts} = service.parseFriends(state, payload)
            return {...state, contacts};
        },
        'save_contacts'(state, {payload}) {
            console.log(state)
            console.log(payload)
            const {contacts, strangers} = service.parseRosters(state, payload)
            return {...state, contacts, strangers};
        },

    },
    subscriptions: {},
};

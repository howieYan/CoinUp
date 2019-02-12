// import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const msgTpl = {
  base: {
    error: false,
    errorCode: '',
    errorText: '',
    // status 为空将被当做服务端的数据处理，处理成sent
    status: 'sending', // [sending, sent ,fail, read]
    id: '',
    // from 不能删除，决定了房间id
    from: '',
    to: '',
    toJid: '',
    time: '',
    type: '', // chat / groupchat
    body: {},
    ext: {},
    bySelf: false,
  },
  txt: {
    type: 'txt',
    msg: ''
  },
  img: {
    type: 'img',
    file_length: 0,
    filename: '',
    filetype: '',
    length: 0,
    secret: '',
    width: 0,
    height: 0,
    url: '',
    thumb: '',
    thumb_secret: ''
  }
}

// 统一消息格式：本地发送
function parseFromLocal(type, to, message = {}, bodyType) {
  let ext = message.ext || {}
  let obj = copy(message, msgTpl.base)
  let body = copy(message, msgTpl[bodyType])
  return {
    ...obj,
    type,
    to,
    id: WebIM.conn.getUniqueId(),
    body: {
      ...body, ...ext, type: bodyType
    }
  }
}
// 统一消息格式：服务端
function parseFromServer(message = {}, bodyType) {
  let ext = message.ext || {}
  let obj = copy(message, msgTpl.base)
  // body 包含：所有message实体信息都放到body当中，与base区分开
  // body 包含：ext 存放用户自定义信息，比如图片大小、宽高等
  let body = copy(message, msgTpl[bodyType])
  switch (bodyType) {
    case 'txt':
      return {
        ...obj, status: 'sent',
        body: {
          ...body, ...ext, msg: message.data, type: 'txt',
        }
      }
      break;
    case 'img':
      return {
        ...obj, status: 'sent',
        body: {
          ...body, ...ext, type: 'img'
        }
      }
      break;
  }
}

function copy(message, tpl) {
  let obj = {}
  Object.keys(tpl).forEach((v) => {
    obj[v] = message[v] || tpl[v]
  })
  return obj
}

const {Types, Creators} = createActions({
  addMessage: ['message', 'bodyType'],
  updateMessageStatus: ['message', 'status'],
  // ---------------async------------------
  sendTxtMessage: (chatType, chatId, message = {}) => {
    return (dispatch, getState) => {
      const pMessage = parseFromLocal(chatType, chatId, message, 'txt')
      const {body, id, to} =  pMessage
      const {type, msg} = body
      const msgObj = new WebIM.message(type, id);
      console.log(pMessage)
      msgObj.set({
        //TODO: cate type == 'chatrooms'
        msg, to, roomType: false,
        success: function () {
          dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
        },
        fail: function () {
          dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
        }
      });

      // TODO: 群组聊天需要梳理此参数的逻辑
      // if (type !== 'chat') {
      //   msgObj.setGroup('groupchat');
      // }

      WebIM.conn.send(msgObj.body);
      dispatch(Creators.addMessage(pMessage, type))
    }
  },
  sendImgMessage: (chatType, chatId, message = {}, source = {}) => {
    return (dispatch, getState) => {
      let pMessage = null
      const id = WebIM.conn.getUniqueId()
      const type = 'img'
      const to = chatId
      const msgObj = new WebIM.message(type, id);
      msgObj.set({
        apiUrl: WebIM.config.apiURL,
        ext: {
          file_length: source.fileSize,
          filename: source.fileName || '',
          filetype: source.fileName && (source.fileName.split('.')).pop(),
          width: source.width,
          height: source.height,
        },
        file: {
          data: {
            uri: source.uri, type: 'application/octet-stream', name: source.fileName
          }
        },
        to, roomType: '',
        onFileUploadError: function (error) {
          console.log(error)
          dispatch(Creators.updateMessageStatus(pMessage, 'fail'))
        },
        onFileUploadComplete: function (data) {
          console.log(data)
          url = data.uri + '/' + data.entities[0].uuid;
          dispatch(Creators.updateMessageStatus(pMessage, 'sent'))
        },
        success: function (id) {
          console.log(id)
        },
      });

      // TODO: 群组聊天需要梳理此参数的逻辑
      // if (type !== 'chat') {
      //   msgObj.setGroup('groupchat');
      // }

      WebIM.conn.send(msgObj.body);
      pMessage = parseFromLocal(chatType, chatId, msgObj.body, 'img')
      // uri只记录在本地
      pMessage.body.uri = source.uri
      // console.log('pMessage', pMessage, pMessage.body.uri)
      dispatch(Creators.addMessage(pMessage, type))
    }
  },
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  byId: {},
  chat: {},
  groupChat: {},
  extra: {}
})

/* ------------- Reducers ------------- */
/**
 * 添加信息
 * @param state
 * @param message object `{data,error,errorCode,errorText,ext:{weichat:{originType:webim}},from,id,to,type}`
 * @param bodyType enum [txt]
 * @returns {*}
 */
export const addMessage = (state, {message, bodyType = 'txt'}) => {
  !message.status && (message = parseFromServer(message, bodyType))
  const {username = ''} = state.user || {}
  const {type, id, to, status} = message
  // 消息来源：没有from默认即为当前用户发送
  const from = message.from || username
  // 当前用户：标识为自己发送
  const bySelf = from == username
  // 房间id：自己发送或者不是单聊的时候，是接收人的ID， 否则是发送人的ID
  const chatId = bySelf || type !== 'chat' ? to : from
  state = state.setIn(['byId', id], {
    ...message,
    bySelf,
    time: +new Date(),
    status: status,
  })
  const chatData = state[type] && state[type][chatId] ? state[type][chatId].asMutable() : []
  chatData.push(id)

  state = state
    .setIn([type, chatId], chatData)
  return state
}

/**
 * updateMessageStatus 更新消息状态
 * @param state
 * @param message object
 * @param status enum [sending, sent ,fail]
 * @returns {*}
 */
export const updateMessageStatus = (state, {message, status = ''}) => {
  const {id} = message

  return state
    .setIn(['byId', id, 'status'], status)
    .setIn(['byId', id, 'time'], +new Date())
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MESSAGE]: addMessage,
  [Types.UPDATE_MESSAGE_STATUS]: updateMessageStatus,
})

/* ------------- Selectors ------------- */

import {GET_ROSTER, TEXT_MESSAGE} from './type'
import WebIM from '../Lib/WebIM'
import {AsyncStorage} from 'react-native'
import * as service from './service';

export function fachRoster() {
    return function (dispatch) {
        WebIM.conn.getRoster({
            success: (roster) => {
                dispatch({
                    type: GET_ROSTER,
                    payLoad: roster
                })
            },
            error: (error) => {
                console.log(error)
            }
        })
    }
}

export function fachMessageList(record) {
    return function (dispatch) {
        dispatch({
            type: TEXT_MESSAGE,
            payLoad: record
        })
    }

}
export function change_friends(state, { payload }) {
      const { contacts } = service.parseFriends(state, payload)
      return { ...state, contacts };
}

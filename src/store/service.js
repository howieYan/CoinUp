import moment from 'moment'
import {AsyncStorage} from 'react-native'
import Utils from "../Component/Utils";

export function parseMessage(name, payload, owner) {
    console.log('2----------service', name)
    console.log('2----------service', payload)
    let messages = []
    if (name !== owner.loginname) {
        messages.push(payload)
        AsyncStorage.setItem(name, JSON.stringify(messages))
    }
    return messages
}

export function parseFriends(state, payload) {
    const {name, subscription} = payload
    payload.avatar = 'https://facebook.github.io/react/img/logo_og.png'
    let contacts = state.contacts.filter(contact => contact.name !== name)
    switch (subscription) {
        case 'remove':
            break;
        case 'both':
            contacts = [payload, ...state.contacts];
            break;
        default:
            break;
    }
    return {contacts}
}

export function parseRosters(state, rosters) {
    const {contacts, strangers} = state
    rosters.map(roster => {
        roster.avatar = 'https://facebook.github.io/react/img/logo_og.png'
        if (roster.subscription === 'both' || roster.subscription === 'to') contacts.push(roster)
        // else strangers.push(roster)
    })
    return {contacts, strangers}
}

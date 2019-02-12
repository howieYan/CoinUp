/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import Utils from './Utils';
export default class UserAgreement extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.name,
        headerTintColor: '#000',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight: <View />,
    })
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount () {
        this.LoadData()
    }
    async LoadData () {
        try {
            let data = await Utils.LoadGet(Utils.size.url + '/api/settings/privacy')
            console.log(data);
            this.setState({
                data: data.result
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        let data = this.state.data
        return (
            <View style={styles.content}>
                <WebView
                    bounces={false}
                    originWhitelist={['*']}
                    scalesPageToFit={Utils.size.os === 'ios' ? false : true}
                    source={{html: data.new_content,  baseUrl: ''}}
                    style={styles.content}
                >
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
})


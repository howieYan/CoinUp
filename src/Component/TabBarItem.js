/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';

export default class TabBarItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let {normalImage, selectedImage, focused, tintColor} = this.props;
        return (
            <Image
                source={focused ? selectedImage : normalImage}
                style={{width: 20,height: 20, tintColor: tintColor}}
            />
        );
    }
}

const styles = StyleSheet.create({
})


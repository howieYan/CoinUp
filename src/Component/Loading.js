import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import Utils from './Utils';

let sibling = undefined;

const Loading = {

    show: (text) => {
        sibling = new RootSiblings(
            <View style={styles.maskStyle} >
                <View style={styles.backViewStyle}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={{fontSize: 16, color: '#fff',paddingTop: 10,}}>{text}</Text>
                </View>
            </View>
        )
    },
    Toast: (text, isFalse) => {
        sibling = new RootSiblings(
            <View style={styles.maskStyle} >
                <View style={styles.backViewStyleBg}>
                    <Text style={{fontSize: 18, color: '#fff',paddingTop: 20,paddingBottom: 20,paddingLeft: 20,paddingRight: 20}}>{text}</Text>
                </View>
            </View>
        )
        setTimeout(
            () => {
                if (sibling instanceof RootSiblings) {
                    sibling.destroy()
                }
            }, 1000
        )

    },

    hidden: ()=> {
        if (sibling instanceof RootSiblings) {
            sibling.destroy()
        }
    }

};

const styles = StyleSheet.create({
        maskStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            width: Utils.size.width,
            height: Utils.size.height,
            alignItems: 'center',
            justifyContent: 'center'
        },
        backViewStyle: {
            backgroundColor: 'rgba(0,0,0,.8)',
            width: 120,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        backViewStyleBg: {
            backgroundColor: 'rgba(0,0,0,.8)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }
    }
)
export {Loading}

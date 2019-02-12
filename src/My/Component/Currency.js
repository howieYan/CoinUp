/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Utils from "../../Component/Utils";

export default class Currency extends Component {
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
            isCurrency: 0
        }
    }
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    {this.renderList()}
                </ScrollView>
            </View>
        );
    }
    renderList () {
        let List = [];
        let Array = [
            {name: 'CNY'},
        ];
        Array.forEach((v, i) => {
            List.push(
                <TouchableOpacity activeOpacity={0.5} key={i}  onPress={ this.onCell.bind(this, v, i)}>
                    <View style={[styles.CurrencyCell]}>
                        <View style={styles.content}>
                            <Text style={styles.CurrencyCellName}>{v.name}</Text>
                        </View>
                        {this.state.isCurrency === i ? <Image style={styles.CurrencyCellIcon} source={require('../../Image/My/YesIcon.png')}/> : null}
                    </View>
                </TouchableOpacity>
            )
        })
        return List;
    }
    onCell (record, index) {
        this.setState({
            isCurrency: index
        })

        this.onBackButton(record.name)
    }
    // 返回
    onBackButton (record) {
        this.props.navigation.state.params.RecodeLoad(record)
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    CurrencyCell: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EFF0EF'
    },
    CurrencyCellName: {
        color: '#000',
        fontSize: Utils.setSpText(16),
    },
    CurrencyCellIcon: {
        width: 20,
        height: 20,
    }
})


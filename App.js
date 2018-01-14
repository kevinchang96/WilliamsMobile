/**
 * Kevin Chang
 * (c) 2017
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions
} from 'react-native';
import Login from './App/Components/Login';
import Logout from './App/Components/Logout';
import Component2 from './App/Components/Component2';
import Settings from './App/Components/Settings';
import HttpExample from './App/Components/HttpExample';
import DiningMenus from './App/Components/DiningMenus';

export default class main extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Login />
                <Logout />
            </View>
        );
    }
}

const height = Dimensions.get('window').height * PixelRatio.get();
const weight = Dimensions.get('window').weight * PixelRatio.get();

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: "#512698",
        height: height,
    },
    searchContainer: {

    },
    footer :{

    }
});

AppRegistry.registerComponent('main', () => main );
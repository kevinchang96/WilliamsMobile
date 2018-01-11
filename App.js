/**
 * Kevin Chang
 * (c) 2017
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import Login from './App/Components/Login';
import Logout from './App/Components/Logout'
import Component2 from './App/Components/Component2';
import Settings from './App/Components/Settings';
import HttpExample from './App/Components/HttpExample';

export default class main extends Component{
    render(){
        return(
            <View>
                <Login />
                <Logout />
                <Component2 />
                <Settings />
                <HttpExample />
            </View>

        );
    }
}
AppRegistry.registerComponent('main', () => main );
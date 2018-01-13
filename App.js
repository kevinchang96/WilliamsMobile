/**
 * Kevin Chang, David Ariyibi, Dysron Marshall
 * (c) 12/2017, 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import Login from './App/Components/Login';
import Logout from './App/Components/Logout';
import Component2 from './App/Components/Component2';
import Settings from './App/Components/Settings';
import HttpExample from './App/Components/HttpExample';
//import Home from './App/Containers/Home'

export default class main extends Component{
    render(){
        return(
            <View backgroundColor={"#512698"} >
                <Login />
                <Logout />
//                <Home />
                <Component2 />
                <Settings />

            </View>
        );
    }
}

 AppRegistry.registerComponent('main', () => main );
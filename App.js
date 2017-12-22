/**
 * Kevin Chang
 * (c) 2017
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import Component1 from './App/Components/Component1';

export default class login extends Component{
    render(){
        return(
            <View>
                <Component1 />
            </View>
        );
    }
}
AppRegistry.registerComponent('login', () => login );
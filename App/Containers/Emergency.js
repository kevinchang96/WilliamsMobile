/**
 * Kevin Chang
 * (c) 06/2018
 */

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import MyHeader from '../Components/MyHeader';
import MyEmergency from '../Components/Emergency';
import styles from '../Styles/Style';

export default class Emergency extends Component{
    render() {
        return(
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation} text={"Emergency Numbers"}></MyHeader>
                <MyEmergency></MyEmergency>
           </View>
        );
    }
}

AppRegistry.registerComponent('Emergency', () => Emergency );
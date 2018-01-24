/**
 * Alex Taylor
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

export default class StudentCard extends Component{

    render(){
        return(
        <TouchableOpacity>
            <Card avatar = {{uri: this.props.img}}>
                <Text>{this.props.name}</Text>
                <Text note>Unix: {this.props.unix}</Text>
            </Card>
        </TouchableOpacity>
        );
    }
}

AppRegistry.registerComponent('StudentCard', () => StudentCard );
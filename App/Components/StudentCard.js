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
    console.log(this.props.fun);
        return(
        <TouchableOpacity>
            <Card
            flexDirection='row'>
                <Image
                 style={{height:100,width:100,marginRight:10}}
                 source= {{uri: this.props.img}}/>
                <View>
                <Text>{this.props.name}</Text>
                <Text note>Unix: {this.props.unix}</Text>
                </View>
            </Card>
        </TouchableOpacity>
        );
    }
}

AppRegistry.registerComponent('StudentCard', () => StudentCard );
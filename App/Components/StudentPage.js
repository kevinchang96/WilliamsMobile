/**
 * Alex Taylor
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

export default class StudentPage extends Component{

    render(){
        return(
            <Card flexDirection='row'>
                  <Image source={{uri: this.props.img}} style={{height: 150, width: 150, marginRight: 10}}/>
                  <View>
                  <Text>{this.props.name}</Text>
                  <Text note>Unix: {this.props.unix}</Text>
                  <Text note>SU Box: {this.props.suBox}</Text>
                  <Text note>Room: {this.props.room}</Text>
                  <Text note>Home Town: {this.props.homeTown}</Text>
                  </View>
            </Card>
        );
    }
}

AppRegistry.registerComponent('StudentPage', () => StudentPage );
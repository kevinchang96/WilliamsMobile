/**
 * Alex Taylor
 * (c) 01/2018
 *
 * David Ariyibi
 * (c) 02/2018
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
import { Card, Button } from 'react-native-elements'

export default class StudentCard extends Component{

  pressed = () => {
    const profile = fetch("https://wso.williams.edu"+this.props.id, {method:"GET", credentials: 'include',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  "Accept": "text/html"
                },
              }).then((response) => response.text()) // Transform the data into text
                .then((responseText) => {
                  const DOMParser = require('react-native-html-parser').DOMParser;
                  let doc = new DOMParser().parseFromString(responseText,'text/html');
                  this.props.pressed(doc);});
  }
  render(){
      return(
      <TouchableOpacity onPress={() => this.pressed()}>
          <Card
          flexDirection='row'>
              <Image
               style={{height:80,width:80,marginRight:10}}
               source= {{uri: this.props.img}}/>
              <View>
                  <Text style={styles.nameText}>{this.props.name}</Text>
                  <Text style={styles.unixText}>{this.props.unix}</Text>
              </View>
          </Card>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create(
{
    nameText:{
        color: '#512698',
        fontSize: 16
    },
    unixText:{
        color: 'black',
        fontSize: 14
    }
});

AppRegistry.registerComponent('StudentCard', () => StudentCard );

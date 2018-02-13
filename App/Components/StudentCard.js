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
import { Card, ListItem, Button } from 'react-native-elements'

export default class StudentCard extends Component{

  pressed = () => {
    console.log("pressed");
    this.props.pressed(this.props.unix);
  }
  render(){
      console.log(this);
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

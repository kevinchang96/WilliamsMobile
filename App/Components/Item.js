import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import { Card, Button, ListItem } from 'react-native-elements'

export default class Item extends Component{

    increment = () => { this.props.changeState(true,this.props.price,this.props.item); }

    decrement = () => { this.props.changeState(false,this.props.price,this.props.item); }

  render(){
      return(
        <View style={{flex:0, flexDirection:'row', justifyContent:'flex-end'}}>
        <Button
            buttonStyle={{height:25}}
            backgroundColor='red'
            title='-'
            onPress={this.decrement} />
            <Text style={{borderWidth:1, height: 25, width: 25, textAlignVertical:'center', textAlign:'center'}}>
            {this.props.count}
            </Text>
        <Button
            buttonStyle={{height:25}}
            backgroundColor='green'
            title='+'
            onPress={this.increment} />
        </View>
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

AppRegistry.registerComponent('Item', () => Item );
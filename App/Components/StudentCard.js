import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Text, Thumbnail, Icon, Left, Body } from 'native-base';

export default class StudentCard extends Component{

    render(){
        return(
        <TouchableOpacity>
            <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.img}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>Unix: {this.props.unix}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
        </TouchableOpacity>
        );
    }
}

AppRegistry.registerComponent('StudentCard', () => StudentCard );
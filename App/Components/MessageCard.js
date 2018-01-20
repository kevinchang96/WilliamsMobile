import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Text, Thumbnail, Icon, Left, Body } from 'native-base';

export default class MessageCard extends Component{

    render(){
        return(
            <Card style={{flex: 0}}>
            <CardItem>
              <Header>
                <Text>{this.props.title}</Text>
                <Body>
                  <Text>{this.props.message}</Text>
                  <Text note>From {this.props.src}</Text>
                </Body>
              </Header>
            </CardItem>
            </Card>
        );
    }
}

AppRegistry.registerComponent('MessageCard', () => MessageCard );
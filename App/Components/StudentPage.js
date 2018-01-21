import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Text, Thumbnail, Icon, Left, Body } from 'native-base';

export default class StudentPage extends Component{

    render(){
        return(
            <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                  <Image source={{uri: this.props.img}} style={{height: 200, width: 200, flex: 1}}/>
                  <Text>{this.props.name}</Text>
                  <Text note>Unix: {this.props.unix}</Text>
                  <Text note>SU Box: {this.props.suBox}</Text>
                  <Text note>Room: {this.props.room}</Text>
                  <Text note>Home Town: {this.props.homeTown}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
        );
    }
}

AppRegistry.registerComponent('StudentPage', () => StudentPage );
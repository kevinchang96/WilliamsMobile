/*
 * Dysron Marshall
 * (c) 01/2018
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import { Card, ListItem, Button, Divider } from 'react-native-elements'

export default class EventsCard extends Component{
    render(){
        return(
            <Card title={this.props.title}>
                <Text>{this.props.message}</Text>
                <Divider style={{ backgroundColor: '#512698' }}/>
                <Text>{this.props.from}</Text>
            </Card>
        );
    }
}
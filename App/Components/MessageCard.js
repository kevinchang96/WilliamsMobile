/*
 * Nambi Williams, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Image, View } from 'react-native';
import { Button, Card, Divider, Text} from 'react-native-elements';

export default class MessageCard extends Component{

    render(){
        return(
            <Card
                titleStyle={cardStyle.titleStyle}
                title={this.props.title}>
                <Text style={cardStyle.messageStyle}>{this.props.text}</Text>
                <Divider style={{ backgroundColor: '#512698' }}/>
                <Text style={cardStyle.srcStyle}>{this.props.src}</Text>
            </Card>

        );
    }
}

const cardStyle = StyleSheet.create({
     titleStyle:{
        color: '#512698',
        //backgroundColor: 'white',
        //fontFamily: 'Comfortaa_bold',
        fontSize: 20
     },
     messageStyle:{
        //fontFamily: 'Montserrat',
        fontSize: 18,
        marginBottom: 0,
     },
     srcStyle:{
        //fontFamily: 'Montserrat',
        fontSize: 16,
        fontStyle: 'italic'
     },
});

AppRegistry.registerComponent('MessageCard', () => MessageCard );
/*
 * Nambi Williams
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Image, View } from 'react-native';
import { Card, Button, Text} from 'react-native-elements';

export default class MessageCard extends Component{

    render(){
        return(
            <Card
                titleStyle={cardStyle.titleStyle}
                title={this.props.title}>

                <Text style={cardStyle.messageStyle}>{this.props.text}</Text>
                <Text style={cardStyle.srcStyle}>{this.props.src}</Text>
            </Card>

        );
    }
}

//titlestyle={{cardStyle.titleStyle}}>
               //<Divider style={{ backgroundColor: '#512698' }}/>

const cardStyle = StyleSheet.create({
     titleStyle:{
        color: '#512698',
        //backgroundColor: 'white',
        //fontFamily: 'Comfortaa_bold',
        fontSize: 20
     },
     messageStyle:{
        //fontFamily: 'Montserrat',
        fontSize: 15
     },
     srcStyle:{
        //fontFamily: 'Montserrat',
        fontSize: 15,
        fontStyle: 'italic'
     },
});

AppRegistry.registerComponent('MessageCard', () => MessageCard );
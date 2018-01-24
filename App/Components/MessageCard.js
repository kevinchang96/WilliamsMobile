import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Image,
  View
} from 'react-native';
import {Card, Button, Text, Divider} from 'react-native-elements';

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
        color: 'purple',
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
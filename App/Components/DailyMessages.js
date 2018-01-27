/*
 * Nambi Williams, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  DatePickerAndroid
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MessageCard from './MessageCard';

export default class DailyMessages extends Component {


    constructor(props){
        super(props);
        this.state = {
            messages: [],
            renderMessages: false,
            titlesArray: [],
            messageCards: []
        };
        this.getMessages();
    }



    getMessages = () => {

        const request = new Request('https://web.williams.edu/messages/');
        const test = request.credentials;
        //console.log("Creds: "+ test.toString() );
        fetch('https://web.williams.edu/messages/', {mode: 'no-cors'}, {method: 'GET'})
        .then((response) => response.text() ) // Transform the data into text
        .then((responseText) => {

            //console.log(responseText);
            //console.log(responseText);

            let messagecards = [];

            var DOMParser = require('react-native-html-parser').DOMParser;

            let doc = new DOMParser().parseFromString(responseText,'text/html');

            const root = doc.getElementsByClassName("webOnly");

            //console.log("Root size " + root.length);

            /*let title = root[0].firstChild.textContent;
            let text = root[0].lastChild.textContent;

            console.log(text.substring(0, text.lastIndexOf("from")));
            console.log(text.slice(text.lastIndexOf("from")+5));
            console.log(root[0]);*/

            for (let i = 0; i < root.length; i++){
                let card = this.createCard(root[i].firstChild.textContent, root[i].lastChild.textContent);
                //console.log(card);
                messagecards.push(card);
            }
           // console.log(messagecards);

            /*for (let i=0; i < root.length; i = i+2){
                console.log(root[0].textContent);
                console.log(root[0]);
            }*/



            this.setState({
                messageCards: messagecards
            });
            //console.log(this.state);

        })
        .catch((error) => {
           console.error(error);
        });

    };

    createCard(firstChild, lastChild){
        // removes the newlines
        _title = firstChild.replace(/(\r\n|\n|\r)/gm," ");
        _text = lastChild.substring(0, lastChild.lastIndexOf("from")).replace(/(\r\n|\n|\r)/gm," ");
        _src = lastChild.slice(lastChild.lastIndexOf("from")+5).replace(/(\r\n|\n|\r)/gm," ");

        let message = {
            title: _title,
            text: _text,
            src: _src
        }

        card = <MessageCard
                    title = {message.title}
                    text = {message.text}
                    src = {message.src}
               />

        //console.log(card);
        return card;
    }

    changeDate = () =>{
        try {
          const {action, year, month, day} = DatePickerAndroid.open({date: new Date()}, {mode: 'spinner'});
          console.log(date);
          if (action !== DatePickerAndroid.dismissedAction) {
            return;
          }
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }

    }

    render() {
        //this.getMessages();
        //console.log(this.state.titlesArray.length);
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{ text: 'Daily Messages', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55, marginBottom: 10}}
                />

                <Button
                    title='TODAY'
                    backgroundColor= '#512698'
                    onPress={this.changeDate}
                />

                <ScrollView>
                    {this.state.messageCards}
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE' //'#DCD0FE',
    }
})
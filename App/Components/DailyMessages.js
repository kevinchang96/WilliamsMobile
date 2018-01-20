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
  Dimensions
} from 'react-native';
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

            const root = doc.getElementsByClassName("printOnly");

            //console.log("Root size " + root.length);

            /*let title = root[0].firstChild.textContent;
            let text = root[0].lastChild.textContent;

            console.log(text.substring(0, text.lastIndexOf("from")));
            console.log(text.slice(text.lastIndexOf("from")+5));
            console.log(root[0]);*/

            for (let i = 0; i < root.length; i++){
                let card = this.createCard(root[i].firstChild.textContent, root[i].lastChild.textContent);
                console.log(card);
                messagecards.push(card);
            }
            console.log(messagecards);

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
        let message = {
            title: firstChild,
            text: lastChild.substring(0, lastChild.lastIndexOf("from")),
            src: lastChild.slice(lastChild.lastIndexOf("from")+5)
        }

        card = <MessageCard
                    title = {message.title}
                    text = {message.text}
                    src = {message.src}
               />

        console.log(card);
        return card;
    }

    render() {
        //this.getMessages();
        console.log(this.state.titlesArray.length);
        return (
            <View>
                 <ScrollView>
                     {this.state.messageCards}
                 </ScrollView>
            </View>

        );
    }
}

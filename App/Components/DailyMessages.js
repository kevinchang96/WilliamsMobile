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


export default class DailyMessages extends Component {


    constructor(props){
        super(props);
        this.state = {
            messages: [],
            renderMessages: false,
            titlesArray: [],
        };
        this.getMessages();
    }



    getMessages = () => {

        const request = new Request('https://web.williams.edu/messages/');
        const test = request.credentials;
        console.log("Creds: "+ test.toString() );
        fetch('https://web.williams.edu/messages/', {mode: 'no-cors'}, {method: 'GET'})
        .then((response) => response.text() ) // Transform the data into text
        .then((responseText) => {

            console.log(responseText);
            //console.log(responseText);
            var DOMParser = require('react-native-html-parser').DOMParser;

            let doc = new DOMParser().parseFromString(responseText,'text/html');

            const titles = doc.getElementsByTagName("b");

            const sources = doc.getElementsByTagName("em");

            const test = doc.getElementsByClassName("printOnly");

            var titlesarray = [];

            for (var i=1; i < titles.length; i = i+2){
                titlesarray[i] = titles[i].textContent;
                console.log(titlesarray[i]);
                console.log("LENGTH " + titlesarray.length);
            }

            this.setState({
                titlesArray: titlesarray
            });
            console.log(this.state);
        })
        .catch((error) => {
           console.error(error);
        });

    };

    render() {
        //this.getMessages();
        console.log(this.state.titlesArray.length);
        return (
            <View>
                 <Text>{this.state.titlesArray}</Text>
            </View>
        );
    }
}

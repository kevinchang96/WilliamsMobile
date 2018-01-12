import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

export default class DailyMessages extends Component {

    state = {
       data: ''
    }

    getMessages = () => {

        const request = new Request('https://web.williams.edu/messages/');
        const test = request.credentials;
        console.log("Creds: "+ test.toString() );
        fetch('https://web.williams.edu/messages/', {
            method: 'GET',
        })
        .then((response) => response.text() ) // Transform the data into text
        .then((responseText) => {
            console.log(responseText);
            var DOMParser = require('react-native-html-parser').DOMParser;

            let doc = new DOMParser().parseFromString(responseText,'text/html');
            //var title = doc.getElementsByTagName("b");
            var test = 'test'
            var source = doc.getElementsByTagName("EM");
            console.log("Title: " + test);

            this.setState({
                data: test
            })
        })
        .catch((error) => {
           console.error(error);
        });

    };

    render() {
        return (
          <View>
             <Text>
                Daily Messages
                {this.state.data}
             </Text>
          </View>
        );
    }
}

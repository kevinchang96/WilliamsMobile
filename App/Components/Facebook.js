import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import StudentSuggestionCard from './StudentSuggestionCard';

export default class Facebook extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchFor: 'Search',
            studentCards: []
        };
    }

    render(){
        return(
            <View>
                <TextInput
                    style=  {{color : "white", fontSize: 20}}
                    placeholder = {this.state.searchFor}
                    placeholderTextColor = "white"
                    onChangeText = {searchFor => this.setState({searchFor})}
                />
                <Button
                    title="Search"
                    color="gold"
                    onPress={this.submitForm}
                />
                <ScrollView>
                    {this.state.studentCards}
                </ScrollView>
            </View>
        );
    }

    /*utf8=%E2%9C%93&authenticity_token=vCWKS%2BPUDQSTYHJiKGizW72El3tY5UpFm3m0amsJxVkk5YJoJIVS8AlTVkCjfbvep3xcxM0DDc8xyMDFmxxkyg%3D%3D&search=balls&commit=Search*/

    submitForm = () => {
        fetch('https://wso.williams.edu/facebook', {
            method: 'GET'
        })
        .then((response) => response.text() ) // Transform the data into text
            .then((responseText) => {
                // Parse the text here
                //console.log(responseText);
                var DOMParser = require('react-native-html-parser').DOMParser;

                let doc = new DOMParser().parseFromString(responseText,'text/html');
                var input = doc.getElementsByTagName("input");
                //console.log("Tags: " + input);
                var paramList = [input.length];
                var key;
                var value;

                for( i = 0; i < input.length; i++ ){
                    // Iterate through parameters
                    key = input[i].getAttribute("name");
                    value = input[i].getAttribute("value");

                    if( key == 'search' )
                        value = this.state.searchFor;

                    paramList[i] = key + "=" + encodeURIComponent(value);

                    //console.log("Attr: " + input[i]);
                 }

                 var str = '';

                 for( i = 0; i < paramList.length; i++ ){
                    if( str.length == 0 ){
                        str = str + paramList[i];
                    } else {
                        str = str + '&' + paramList[i];
                    }
                 }

                 console.log( "Result: " + str + "\nContent length: " + str.length );
                 this.getPeople(str);
              })

              .catch((error) => {
                 console.error(error);
              });
    };

    selected = (url) => {
        fetch(url, {
            method: 'GET'
        })
        .then((response) => response.text() ) // Transform the data into text
        .then((responseText) => {
            // Parse the text here
            //console.log(responseText);
            var DOMParser = require('react-native-html-parser').DOMParser;

            let doc = new DOMParser().parseFromString(responseText,'text/html');
            var input = doc.getElementsByTagName("input");
            //console.log("Tags: " + input);
            var key;

          })

    }
    getPeople(result){
        fetch('https://wso.williams.edu/facebook', {
                method: 'POST',
                headers: {
                'Host': 'wso.williams.edu',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://wso.williams.edu/facebook',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Number.parseInt(result.length,10)
                },
                body: result
        })
        .then((response) => response.text() ) // Transform the data into text
            .then((responseText) => {
                //console.log("Response 2 = " + responseText);
                var DOMParser = require('react-native-html-parser').DOMParser;

                let doc = new DOMParser().parseFromString(responseText,'text/html');
                var input = doc.getElementsByTagName("a");
                //console.log("Tags: " + input);

                var students = [input.length - 12];

                if(input.length > 14){
                    for( i = 0; i < input.length - 1; i += 2 ){
                        // Iterate through parameters
                        if(i < 12)
                            continue;

                        let student = {
                                name: input[i].textContent,
                                unix: input[i + 1].textContent,
                                info: input[i].getAttribute("href")
                            };

                        card = <StudentSuggestionCard
                                    name = {student.name}
                                    info = {student.info}
                                    key = {student.unix}
                                    selected={(url) => selected}
                               />
                        students[i-12] = card;

                        console.log("Student: " + student.name);
                        console.log("Unix: " + student.unix);
                        console.log("Input length: " + input.length)

                        //console.log("Attr: " + input[i]);
                     }
                     this.setState({studentCards: students})
                 }
                 else{

                 }
        })

    }
}
AppRegistry.registerComponent('Facebook', () => Facebook );
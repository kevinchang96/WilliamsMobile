/**
 * Alex Taylor
 * (c) 01/2018
 */

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
import StudentCard from './StudentCard'
import StudentPage from './StudentPage'

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
            <View style= {{flex: 1, backgroundColor: "#512698"}}>
                <TextInput
                    style=  {{color: "white", fontSize: 20}}
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
                var DOMParser = require('react-native-html-parser').DOMParser;

                let doc = new DOMParser().parseFromString(responseText,'text/html');
                var input = doc.getElementsByTagName("a");
                var hasTable = doc.getElementsByTagName("thead");

                var students = [input.length - 12];

                if(hasTable.length > 0){      //if the web page is a table of students
                    for( i = 0; i < input.length - 1; i += 2 ){
                        if(i < 12)
                            continue;

                        let student = {
                                name: input[i].textContent,
                                unix: input[i + 1].textContent,
                                img: "https://wso.williams.edu/pic/" + input[i + 1].textContent,
                                info: input[i].getAttribute("href")
                            };

                        card = <StudentCard
                                    name = {student.name}
                                    unix = {student.unix}
                                    img = {student.img}
                                    key = {student.info}
                               />
                        students[i-12] = card;

                        console.log("Student: " + student.name);
                        console.log("Unix: " + student.unix);
                        console.log("Input length: " + input.length)
                     }
                     this.setState({studentCards: students})
                 }
                 else if (input.length == 14){ //only one student is returned

                    var nameInput = doc.getElementsByTagName("h3");
                    var h4Input = doc.getElementsByTagName("h4");
                    var h5Input = doc.getElementsByTagName("h5");
                    let student = {
                        name: nameInput[0].textContent,
                        unix: h4Input[0].textContent, //gets unix
                        suBox: '',
                        room: '',
                        homeTown: '',
                        img: "https://wso.williams.edu/pic/" + h4Input[0].textContent
                    }
                    if(h4Input.length == 4){
                        student.suBox = h4Input[1].textContent;
                        student.room = h4Input[2].textContent;
                        student.homeTown = h4Input[3].textContent;
                    }
                    else {
                        x = h5Input.length - h4Input.length;
                        for(i = 1; i < h4Input.length; i++){
                            console.log("Text Content: " + h5Input[i+x].textContent);
                            if(h5Input[i+x].textContent == "SU Box:"){
                                student.suBox = h4Input[i].textContent;
                            }
                            else if(h5Input[i+x].textContent == "Room:"){
                                student.room = h4Input[i].textContent;
                            }
                            else if(h5Input[i+x].textContent == "Hometown:"){
                                student.homeTown = h4Input[i].textContent;
                            }
                        }
                    }
                    card = <StudentPage
                                name = {student.name}
                                unix = {student.unix}
                                suBox = {student.suBox}
                                room = {student.room}
                                homeTown = {student.homeTown}
                                img = {student.img}
                                key = {student.unix}
                           />
                    students[0] = card;

                    this.setState({studentCards: students})
                    console.log("Input length: " + input.length)
                 }
                 else{
                    for( i = 0; i < input.length - 1; i++ ){
                        if(i < 13)
                            continue;

                        let student = {
                            name: input[i].textContent,
                            unix: input[i+1].textContent,
                            img: "https://wso.williams.edu/pic/" + input[i+1].textContent,
                            info: input[i].getAttribute("href")
                        }
                        card = <StudentCard
                                    name = {student.name}
                                    unix = {student.unix}
                                    img = {student.img}
                                    key = {student.info}
                               />
                        students[i-13] = card;
                        i+=2;
                    }
                    this.setState({studentCards: students});
                    console.log("Input length: " + input.length);
                }

        })
    }
}
AppRegistry.registerComponent('Facebook', () => Facebook );
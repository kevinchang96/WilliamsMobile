/**
 * Alex Taylor, David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button, FormInput, Header, Icon, SearchBar } from 'react-native-elements'
import StudentCard from './StudentCard'
import StudentPage from './StudentPage'

export default class Facebook extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchFor: 'Search',
            studentCards: [],
            token: ''
        };
    }

    render(){
        return(
            <View style= {{flex: 1, backgroundColor: "#eeeeee"}}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{ text: 'Facebook', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                />

                <FormInput
                    style=  {{color: "white", fontSize: 20}}
                    placeholder = {this.state.searchFor}
                    placeholderStyle = {{color: "white"}}
                    autoCorrect={false}
                    onChangeText = {searchFor => this.setState({searchFor})}
                />

                <Button
                    title="SEARCH"
                    backgroundColor="#512698"
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    onPress={() => this.getPeople(this.state.searchFor)}
                />

                <ScrollView>
                    {this.state.studentCards}
                </ScrollView>
            </View>
        );
    }

    getPeople(result){
      fetch("https://wso.williams.edu/facebook",
        {method:"POST",
          credentials: 'include',
          headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  "Accept": "text/html"
            },
          body: "search=" + result
      }).then((response) => response.text() ) // Transform the data into text
            .then((responseText) => {
                var DOMParser = require('react-native-html-parser').DOMParser;

                let doc = new DOMParser().parseFromString(responseText,'text/html');
                var input = doc.getElementsByTagName("a");
                //console.log("Input: "+ input);
                //console.log("Input length: "+ input.length);
                var hasTable = doc.getElementsByTagName("thead");
                var hasResults = doc.getElementsByTagName("br");
                var students = [input.length - 12];

                if(hasResults.length == 1){
                    text = <Text style=  {{color: "black", fontSize: 20}} key = 'one'>No Results</Text>
                    students[0] = text;
                    this.setState({studentCards: students})
                    return;
                }

                if(hasTable.length > 0){      //if the web page is a table of students
                    for( i = 0; i < input.length - 1; i += 2 ){
                        if(i < 12)
                            continue;

                        let student = {
                                name: input[i + 1].textContent,
                                unix: input[i + 2].textContent,
                                img: "https://wso.williams.edu/pic/" + input[i + 2].textContent,
                                info: input[i].getAttribute("href")
                            };

                        card = <StudentCard
                                    name = {student.name}
                                    unix = {student.unix}
                                    img = {student.img}
                                    key = {student.info}
                               />
                        students[i-12] = card;

                        //console.log("Student: " + student.name);
                      //  console.log("Unix: " + student.unix);
                      //  console.log("Img: " + student.img);
                      //  console.log("Input length: " + input.length)
                     }
                     this.setState({studentCards: students})
                 }
                 else if (input.length == 15){ //only one student is returned

                    var nameInput = doc.getElementsByTagName("h3");
                    //console.log("Name input: "+ nameInput[0].textContent);
                    var h4Input = doc.getElementsByTagName("h4");
                    var h5Input = doc.getElementsByTagName("h5");
                    let student = {
                        name: nameInput[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim(),
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
//console.log("Text Content: " + h5Input[i+x].textContent);
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
                    //console.log("Input length: " + input.length)
                 }
                 else{
                    for( i = 0; i < input.length - 1; i++ ){
                        if(i < 13)
                            continue;

                        let student = {
                            name: input[i+1].textContent,
                            unix: input[i+2].textContent,
                            img: "https://wso.williams.edu/pic/" + input[i+2].textContent,
                            info: input[i].getAttribute("href")
                        }

                        card = <StudentCard
                                    name = {student.name}
                                    unix = {student.unix}
                                    img = {student.img}
                                    key = {student.info}
                               />
                               console.log(card.key)
                        students[i-13] = card;
                        i+=2;
                    }
                    this.setState({studentCards: students});
                    //console.log("Input length: " + input.length);
                }

        })
    }

    clickButton(url){
        fetch(url, {method: 'GET'})
        .then((response) => response.text() ) // Transform the data into text
            .then((responseText) => {

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
                  //  console.log("Text Content: " + h5Input[i+x].textContent);
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
            console.log(students);
            this.setState({studentCards: students})
        })
    }
}
AppRegistry.registerComponent('Facebook', () => Facebook );

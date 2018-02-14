/**
 * Alex Taylor, David Ariyibi, Kevin Chang, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Platform,
  FlatList,
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
        };
    }

    getPeople = (url="https://wso.williams.edu/facebook", result=null) => {
      fetch(url,
        {method:"POST",
          credentials: 'include',
          headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  "Accept": "text/html"
            },
          body: "search=" + ((result) ? result : this.state.searchFor)
      }).then((response) => response.text() ) // Transform the data into text
            .then((responseText) => {
                const DOMParser = require('react-native-html-parser').DOMParser;
                let doc = new DOMParser().parseFromString(responseText,'text/html');
                const input = doc.getElementsByTagName("a");
                //console.log("Input: "+ input);
                //console.log("Input length: "+ input.length);
                const hasTable = doc.getElementsByTagName("thead");
                const hasResults = doc.getElementsByTagName("br");
                let students = [];
                // console.log("hasTable");
                // console.log(hasTable);
                // console.log("hasResults");
                // console.log(hasResults);
                // console.log("input");
                // console.log(input);
                if(hasResults.length == 1){ // No results
                    students.push(<Text style={styles.noResults}>No Results</Text>);
                }
                if(hasTable.length){      // Table of students without pictures
                    for( i = 12; i < input.length - 1; i += 2 ){
                        const name = input[i + 1].textContent;
                        const unix = input[i + 2].textContent;
                        const img = "https://wso.williams.edu/pic/" + input[i + 2].textContent;
                        const info = input[i+2].getAttribute("href");
                        const id = input[i+1].getAttribute("href");
                        students.push(<StudentCard name={name} unix={unix}
                                                  img={img} info={info} key={id}
                                                  pressed={(id) => this.cardPressed(id)}/>);
                     }
                 }
                 else if (input.length == 15){ // 1 student returned
                    students.push(this.getStudentPage(doc));
                 }
                 else{
                    for( i = 13; i < input.length - 1; i++ ){
                        const name = input[i+1].textContent;
                        const unix = input[i+2].textContent;
                        const img = "https://wso.williams.edu/pic/" + input[i+2].textContent;
                        const info = input[i].getAttribute("href");
                        const id = input[i+1].getAttribute("href"); // = "/facebook/users/XXXX"
                        //console.log(card.key)
                        students.push(card = <StudentCard name={name}
                                              unix={unix} info={info} img={img} key={id}
                                              pressed={(id) => this.cardPressed(id)}/>);

                        i+=2;
                    }
                }
                //console.log(students);
                this.setState({studentCards: students});
        })
    }
    getStudentPage = (doc) => {
      var nameInput = doc.getElementsByTagName("h3");
      //console.log("Name input: "+ nameInput[0].textContent);
      var h4Input = doc.getElementsByTagName("h4");
      var h5Input = doc.getElementsByTagName("h5");
      const name = nameInput[0].textContent.replace(/(\r\n|\n|\r)/gm,"").trim();
      const unix = h4Input[0].textContent; //gets unix
      let suBox = '';
      let room = '';
      let homeTown = '';
      const img = "https://wso.williams.edu/pic/" + h4Input[0].textContent
      if(h4Input.length == 4){
          suBox = h4Input[1].textContent;
          room = h4Input[2].textContent;
          homeTown = h4Input[3].textContent;
      }
      else {
          x = h5Input.length - h4Input.length;
          for(i = 1; i < h4Input.length; i++){
            //console.log("Text Content: " + h5Input[i+x].textContent);
              if(h5Input[i+x].textContent == "SU Box:"){
                  suBox = h4Input[i].textContent;
              }
              else if(h5Input[i+x].textContent == "Room:"){
                  room = h4Input[i].textContent;
              }
              else if(h5Input[i+x].textContent == "Hometown:"){
                  homeTown = h4Input[i].textContent;
              }
          }
      }
      return <StudentPage name={name} unix={unix}
                    suBox={suBox} room={room}
                    homeTown={homeTown} img={img}/>;
    }

    cardPressed = (id) => {
      fetch("https://wso.williams.edu"+id, {method:"GET", credentials: 'include',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Accept": "text/html"
                  },
                }).then((response) => response.text()) // Transform the data into text
                  .then((responseText) => {
                    const DOMParser = require('react-native-html-parser').DOMParser;
                    let doc = new DOMParser().parseFromString(responseText,'text/html');
                    console.log(doc);
                    this.setState({studentCards:[this.getStudentPage(doc)]})});
    }

    render(){
        return(
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{text: 'Facebook', style:{ fontSize: 22, color: '#ffffff' }}}
                    outerContainerStyles={{backgroundColor: '#512698', padding: 10, height: 55}}
                />
                <View style={styles.searchArea}>
                  <FormInput
                      containerStyle={styles.form}
                      placeholder={"Look up a person..."}
                      autoCorrect={false}
                      onChangeText={searchFor => this.setState({searchFor})}
                  />
                  <Button
                      title="SEARCH"
                      backgroundColor="#512698"
                      buttonStyle={{paddingBottom: 10}}
                      onPress={() => this.getPeople()}
                  />
                </View>
                <FlatList
                    data={this.state.studentCards}
                    renderItem={({item}) => item}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee"
    },
    form: {
      color: "white",
      fontSize: 20,
      paddingBottom: 5
    },
    noResults: {
      color: "black",
      fontSize: 20
    },
    searchArea: {
      paddingBottom: 20
    }
});
AppRegistry.registerComponent('Facebook', () => Facebook );

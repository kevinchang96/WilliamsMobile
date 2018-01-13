import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground
    } from 'react-native';
import SuggestionCard from './SuggestionCard';

export default class FactrakSearch extends Component{
    constructor(props){
        super();
        this.state = {  jArr:[],
                        suggestions:[],
                        currentHTMLDoc:"",
                        currentJSON:{}  // for use if the selected suggestion is a professor
                    };
    }
    selected = (type,title,id) => {
        const dir = (type == "name") ? "professors/" : "courses/";
        const url = "https://wso.williams.edu/factrak/" + dir + id;

        fetch(url,         // NodeList after assignment
                {
                credentials: 'include',
                mode: "no-cors",
                method: "GET",
                headers: {
                    "Accept": "text/html"
                }
                }).then(function(response) {
                    if(response.status == 200) return response.text();
                }).then(function(text){
                    const DOMParser = require('react-native-html-parser').DOMParser;
                    let doc = new DOMParser().parseFromString(text,'text/html');
                    this.setState({currentHTMLDoc:doc});
                }.bind(this));

        if(this.state.html) return;     // if unsuccessful response, do not continue

        fetch(url,
            {
            credentials: 'include',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
            }).then(function(response) {
                if(response.status == 200) return response.json();
            }).then(function(jsonResponse){
                this.setState({currentJSON:jsonResponse});
            }.bind(this));

            console.log(this);
    }

    getSuggestions(text){
       fetch("https://wso.williams.edu/factrak/autocomplete.json?q=" + text,
           {
            credentials: 'include',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "application/json",
                }
            }).then(function(response) {
                //console.log(response);
                return response.json();
            }).then(function(jsonResponse){
                this.setState({jArr:jsonResponse});
                console.log(this.state.jArr);
            }.bind(this));
    }

    createSuggestionBoxes(selected){
        this.state.suggestions = this.state.jArr.map(   // array of suggestion cards
            function(current,i){
                //console.log(current);
                let type = Object.keys(current)[0];
                return(<SuggestionCard id={current['id']}
                        title={current['name'] || current['title']} type={type} key={i}
                        selected={selected}/>);
            }
        )
        return this.state.suggestions;
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput onChangeText={(text) => this.getSuggestions(text)}
                    placeholder="Search for a professor or course..." />
                </View>
                <View style={styles.suggestionsContainer}>
                    {/*<Text>There are: {this.state.jArr.length} items to be displayed</Text>*/}
                    {this.createSuggestionBoxes(this.selected)}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'white',
        //borderColor: 'black',
        //borderWidth: 2,
    },
    searchBox: {
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        //borderColor: '',
        //borderWidth: 4
    },
    suggestionsContainer: {
        //backgroundColor: 'white',
        //borderColor: 'black',
        //borderWidth: 2,

    },
});

AppRegistry.registerComponent('FactrakSearch', () => login );
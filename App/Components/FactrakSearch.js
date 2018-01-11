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
import FactrakSearch from './FactrakSearch';
import SuggestionCard from './SuggestionCard';

export default class FactrackSearch extends Component{
    constructor(props){
        super();
        this.state = {jArr:[],suggestions:[]}
    }
    getSuggestions(text){
       fetch("https://wso.williams.edu/factrak/autocomplete.json?q=" + text,
       {
        credentials: 'include',
        mode: "no-cors",
        method: "GET",
        headers: {
            "Accept": "application/json"
            }
        }).then(function(response) {
            console.log(response);
            return response.json();
        }).then(function(jsonResponse){
            console.log(jsonResponse);
            this.state.jArr = (jsonResponse) ? jsonResponse : "";
        }).catch(function(error) {
             console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }
    createSuggestionBoxes(jsonResponse){
        this.state.suggestions = this.state.jArr.map(
            function(current){
                let keys = Object.keys(current);
                return(<SuggestionCard id={current['id']}
                        title={current['name'] || current['title']}/>);
            }
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput onChangeText={(text) => this.getSuggestions(text)}
                    placeholder="Search for a professor or course..." />
                </View>
                <View style={styles.suggestionsContainer}>
                    <Text>There are: {this.state.jArr.length} items to be displayed</Text>
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
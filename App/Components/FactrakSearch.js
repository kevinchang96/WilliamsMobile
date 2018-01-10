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
            return response.json();
        }).then(function(jsonResponse){
            this.state.jArr = (jsonResponse) ? jsonResponse : [];
            console.log(this.state.jArr);
        }).catch(function(error) {
             console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }
    createSuggestionBoxes(jsonResponse){
        {/*Some suggestions are dead links, so might do the check here instead of in
            SuggestionCard*/}
        this.state.suggestions = this.state.jArr.map(
            function(current){
                let keys = Object.keys(current);
                return(<SuggestionCard value={current[0]} id={current['id']}
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
                    <Text>{this.state.jArr.length+1}</Text>
                    <Text>{this.state.jArr.length}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        height: 600
    },
    searchBox: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: 'gold',
        borderWidth: 4
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,

    },
});

AppRegistry.registerComponent('FactrakSearch', () => login );
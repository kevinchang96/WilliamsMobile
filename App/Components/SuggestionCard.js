import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    } from 'react-native';

export default class SuggestionCard extends Component{
    render(){
        const dir = (this.props.type == "name") ? "professors/" : "courses/";
        const url = "https://wso.williams.edu/factrak/" + dir + this.props.id;
        let html;
        fetch(url,{credentials: 'include', mode: "no-cors", method: "GET",
                   headers: {
                       "Accept": "text/html"
                       }
                   }).then(function(response) {
                        return response.text();
                   }).then(function(text){
                        html = text;
                   });
        let json;
        fetch(url,{credentials: 'include', mode: "no-cors", method: "GET",
                   headers: {
                       "Accept": "application/json"
                       }
                   }).then(function(response) {
                        return response.json();
                   }).then(function(jsonResponse){
                        if(jsonResponse.status) json = null;
                        else json = jsonResponse;
                   });
        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text>{this.props.title}</Text>
                {/* onPress will need to add page navigation upon pressing*/}
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'black',
    }
});

AppRegistry.registerComponent('SuggestionCard', () => login );
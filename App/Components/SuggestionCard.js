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
    // this.props.id
    // this.props.title

    render(){
        const dir = (this.props.type == "name") ? "professors/" : "courses/";
        const url = "https://wso.williams.edu/factrak/" + dir + this.props.id;
        let html;           // NodeList after assignment
        fetch(url,
            {
            credentials: 'same-origin',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "text/html"
            }
            }).then(function(response) {
                return response.text();
            }).then(function(text){
                html = text;
            });
        let json;           // for use if the selected suggestion is a professor
        fetch(url,
            {
            credentials: 'same-origin',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
            }).then(function(response) {

                return response.json();
            }).then(function(jsonResponse){
                if(jsonResponse.status) json = null;    // if we receive a json with status error
                else json = jsonResponse;
            });
        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} html={html}
                json={json}>
                <Text>{this.props.title}</Text>
                {/* onPress will remove suggestions and pass props to comment window */}
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // borderColor: 'black',
    }
});

AppRegistry.registerComponent('SuggestionCard', () => login );
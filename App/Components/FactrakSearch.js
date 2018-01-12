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
import Cookie from 'react-native-cookie';

export default class FactrakSearch extends Component{
    constructor(props){
        super();
        this.state = {jArr:[],suggestions:[]};
    }

    getSuggestions(text){
        /*Cookie.get("https://wso.williams.edu/",
            '_WSOonRails_session').then((cookie) => console.log(cookie));
        */

        Cookie.set("https://wso.williams.edu",'_WSOonRails_session',this.state.cookies,{
            path: "/factrak/autocomplete.json"+text,
            domain: 'wso.williams.edu'
        }).then(() => console.log('success'));

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
    createSuggestionBoxes(){
        this.state.suggestions = this.state.jArr.map(   // array of suggestion cards
            function(current){
                console.log(current);
                key = Object.keys(current)[0];
                return(<SuggestionCard id={current['id']}
                        title={current['name'] || current['title']} type={key}/>);
            }
        );
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput onChange={console.log(this.createSuggestionBoxes())}
                    placeholder="Search for a professor or course..." />
                </View>
                <View style={styles.suggestionsContainer}>
                    <Text>There are: {this.state.jArr.length} items to be displayed</Text>
                    {/*console.log(this.state.suggestions)*/}
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
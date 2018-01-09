import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
    } from 'react-native';
import SuggestionCard from './SuggestionCard';


export default class SearchBar extends Component{
    constructor(props){
        super();
        this.state = {arr:[]}
    }
    getSuggestions(text){
        let xhttp = new XMLHttpRequest();
        url = "https://wso.williams.edu/factrak/autocomplete.json?q=" + text;
        xhttp.open("GET", url, true);
        xhttp.send();
        this.setState({ arr: JSON.parse(xhttp.response) });
    }

    render(){
        let suggestions = this.state.arr.map(function(current,index){
            let keys = Object.keys(a);
            if(keys[0] == 'title'){
                return <View>
                            <SuggestionCard type='course' info={keys}/>
                        </View>
            }else{
                return <View>
                            <SuggestionCard type='professor' info={keys}/>
                        </View>
            }
        });

        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput onChangeText={(text) => this.getSuggestions()}
                    placeholder="Search for a professor or course..."
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text>Go</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
    },
    searchBox: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: 30,
        height: 30,
    }
});

AppRegistry.registerComponent('SearchBar', () => login );
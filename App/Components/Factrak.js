/*
 * Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { Alert, AppRegistry, AsyncStorage, Platform, StyleSheet, Text, View} from 'react-native';
import SuggestionCard from './SuggestionCard';
import FactrakCommentWindow from './FactrakCommentWindow';
import {StackNavigator} from 'react-navigation';
import { FormInput, List } from 'react-native-elements';
import Login from './Login';


export class Factrak extends Component{

    constructor(props){
        super();
        this.state = {
                        suggestions: [],        // array of suggestion cards
                        html: "",               // html text to be converted into document object
                        renderComments: false,  // indicates whether to render comments or not
                        title: "",               // name of the course/professor
                        showText: <View></View>
        };
    }

    componentDidUpdate(){
        if(this.state.renderComments){              // a check for dead links/unsuccessful requests
            this.setState({renderComments:false});
            // send html to comment window
            this.props.navigation.navigate('FactrakCommentWindow',
                {html : this.state.html, title : this.state.title});
        }
    }

    fetchHTML(url,title){
        fetch(url,
            {
            credentials: 'include',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "text/html"
            }
            }).then(response => {
                if(response.status == 200) response.text().then((text) => {
                    // if successful fetch, continue
                    this.setState({html : text});
                    this.setState({title : title});
                    this.setState({renderComments : true});
                });
            });
    }

    async checkIfLoggedIn(){
        try{
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if( isLoggedIn != '1' ){
                console.log("We have yet to log in!");
                this.setState({showText:
                                <Text style={{textAlign:'center'}}>You must log in first</Text>});
            }
                console.log(isLoggedIn);
                console.log(this);
        } catch (error) {
            console.log( "An error has occurred! " + error );
        }

    }

    handleSelection = (type,title,id) => {
        console.log(id);
        const dir = (type == "name") ? "professors/" : "courses/";
        const url = "https://wso.williams.edu/factrak/" + dir + id;
        this.fetchHTML(url,title);
    }

    getSuggestions = (text) => {
       fetch("https://wso.williams.edu/factrak/autocomplete.json?q=" + text,
           {
            credentials: 'include',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "application/json",
                }
            }).then(response => {
                //console.log(response);
                return response.json();
            }).then(jsonResponse => {
                this.createSuggestionBoxes(jsonResponse,this.handleSelection);
            }).catch((err) => {
                    console.log(err);
                    // should route to the login screen
            });
    }

    createSuggestionBoxes = (jArr,handler) => {
        const suggestions = jArr.map(
            function(current,i){
                let type = Object.keys(current)[0];     // either name (professor) or title (course)
                return(<SuggestionCard id={current['id']}
                        title={current['name'] || current['title']} type={type} key={i}
                        selected={handler}/>);
            }
        );
        this.setState({suggestions:suggestions})
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <FormInput
                        onChangeText={(text) => this.getSuggestions(text)}
                        placeholder="Search for a professor or course..."
                        autoCorrect={false}
                        onFocus={() => this.checkIfLoggedIn()}
                    />
                </View>
                {this.state.showText}
                <View style={styles.suggestionsContainer}>
                    <List>
                        {this.state.suggestions}
                    </List>
                </View>
            </View>
        );
    }
}

const factrakCommentWindow = ({navigation}) => (
    <FactrakCommentWindow navigation={navigation}/>
);

const FactrakNavigator = StackNavigator({
    Home: { screen: Factrak },
    FactrakCommentWindow: { screen: factrakCommentWindow,
                            navigationOptions: ({navigation}) => ({
                                title: `${navigation.state.params.title}`
                            })}
});

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'white',
        //borderColor: 'black',
        //borderWidth: 2,
    },
    searchBox: {
        //borderColor: '',
        //borderWidth: 4
    },
    suggestionsContainer: {
        //backgroundColor: 'white',
        //borderColor: 'black',
        //borderWidth: 2,

    },
});
export default FactrakNavigator;
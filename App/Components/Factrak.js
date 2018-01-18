import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Button
    } from 'react-native';
import SuggestionCard from './SuggestionCard';
import FactrakCommentWindow from './FactrakCommentWindow';
import {StackNavigator} from 'react-navigation';


export default class Factrak extends Component{

    constructor(props){
        super();
        this.state = {
                        jArr: [],               // JSON objects: {name/title: , id:#}
                        suggestions: [],        // array of suggestion cards
                        html: "",               // html text to be converted into document object
                        renderComments: false,  // indicates whether to render comments or not
        };
    }

    componentDidUpdate(){
        if(this.state.renderComments){              // a check for dead links/unsuccessful requests
            this.setState({renderComments:false});
            this.props.comments(this.state.html);   // callback func - send html to comment window
        }
    }

    fetchHTML(url){
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
                    this.setState({renderComments:true});
                });
            });
    }

    selected = (type,title,id) => {
        const dir = (type == "name") ? "professors/" : "courses/";
        const url = "https://wso.williams.edu/factrak/" + dir + id;
        this.fetchHTML(url);
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
            }).then(response => {
                //console.log(response);
                return response.json();
            }).then(jsonResponse => {
                this.setState({jArr:jsonResponse});
                //console.log(this.state.jArr);
            });
    }

    createSuggestionBoxes(selected){
        this.state.suggestions = this.state.jArr.map(
            function(current,i){
                //console.log(current);
                let type = Object.keys(current)[0];     // either name (professor) or title (course)
                return(<SuggestionCard id={current['id']}
                        title={current['name'] || current['title']} type={type} key={i}
                        selected={selected}/>);
            }
        );
        return this.state.suggestions;
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <TextInput
                        onChangeText={(text) => this.getSuggestions(text)}
                        placeholder="Search for a professor or course..."
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.suggestionsContainer}>
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
        //borderColor: '',
        //borderWidth: 4
    },
    suggestionsContainer: {
        //backgroundColor: 'white',
        //borderColor: 'black',
        //borderWidth: 2,

    },
});

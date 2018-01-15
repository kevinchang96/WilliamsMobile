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


export default class FactrakSearch extends Component{

    constructor(props){
        super();
        this.state = {
                        jArr: [],
                        suggestions: [],
                        html: "",
                        renderComments: false,
        };
    }

    componentDidUpdate(){
        if(this.state.renderComments){
            this.setState({renderComments:false});
            this.passHTML(this.state.html);
        }
    }

    passHTML(html){
        console.log(this);
        return this.props.comments(html);
    }

    fetchHTML(url){
        fetch(url,         // NodeList after assignment
            {
            credentials: 'include',
            mode: "no-cors",
            method: "GET",
            headers: {
                "Accept": "text/html"
            }
            }).then(response => {
                if(response.status == 200) response.text().then((text) => {
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
        this.state.suggestions = this.state.jArr.map(   // array of suggestion cards
            function(current,i){
                //console.log(current);
                let type = Object.keys(current)[0];
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

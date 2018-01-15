import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class Facebook extends Component{

    constructor(props){
        super(props);
        this.state = {
            jArr: []
        };
    }

    render(){
        return(
            <View>
                <TextInput placeholder="Find yo mans"/>
                <Button
                    onPress={this.getPeople}
                    title="Search"
                />
            </View>
        );
    }

    getPeople = () => {
        fetch('https://wso.williams.edu/facebook', {
                method: 'POST',
                headers: {
                'Host': 'wso.williams.edu',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://wso.williams.edu/facebook',
                'Cache-Control': 'max-age=0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Number.parseInt(result.length,10)
                },
                body: result
        })
    }
}
AppRegistry.registerComponent('Facebook', () => Facebook );
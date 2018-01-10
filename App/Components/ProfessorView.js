import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import

export default class ProfessorView extends Component{

    render(){
    let DomParser = require('react-native-html-parser').DOMParser;
    let doc = new DomParser().parseFromString(this.props.html,'text/html');
    {/*So we have this.props.json and this.props.html -- all we need to produce content*/}
    {/*.comment .comment-content p      -- description*/}
    {/*.comment .comment-content p      -- description*/}

        return(
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,

    });
}



AppRegistry.registerComponent('ProfessorView', () => Factrak);
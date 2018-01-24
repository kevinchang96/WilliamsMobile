/*
 * Dysron Marshall
 * (c) 01/2018
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements'

export default class SuggestionCard extends Component{

    sendData = () => {
        this.props.selected(this.props.type,this.props.title,this.props.id);
    }
    render(){
        return(
            <TouchableOpacity>
                <ListItem
                    onPress={this.sendData}
                    title={this.props.title}
                    subtitle={(this.props.type == 'title') ? 'Course':'Professor'}
                />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // borderColor: 'black',
    }
});

AppRegistry.registerComponent('SuggestionCard', () => login );
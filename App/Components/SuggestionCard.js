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

export default class SuggestionCard extends Component{

    sendData = () => {
        this.props.selected(this.props.type,this.props.title,this.props.id);
    }
    render(){
        return(
            <TouchableOpacity style={styles.container}
                onPress={this.sendData}>
                {/* onPress will trigger navigation pass props to comment window */}
                <Text>{this.props.title}</Text>
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
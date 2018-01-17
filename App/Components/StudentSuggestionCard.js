import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class StudentSuggestionCard extends Component{

    selected = () => {
            this.props.selected(this.props.info);
    }

    render(){
        return(
            <TouchableOpacity style = {styles.container}>
                onPress = {this.selected}
                <Text style = {styles.text}> {this.props.name} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "white",
  },
  text: {
    color: "white",
    fontSize: 30
  }
});

AppRegistry.registerComponent('StudentSuggestionCard', () => StudentSuggestionCard );
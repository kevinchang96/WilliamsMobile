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

    selected = () => {
        this.props.selected(this.props.type,this.props.title,this.props.id);
    }
    render(){
        return(
            <TouchableOpacity style={styles.container}
                onPress={this.selected}>
                {/* onPress will trigger navigation pass props to comment window */}
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // borderColor: 'black',
    }
});

AppRegistry.registerComponent('SuggestionCard', () => login );
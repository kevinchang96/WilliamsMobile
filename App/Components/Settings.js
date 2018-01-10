import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Settings extends Component{
    render(){
        return(
            <View>
                <Text>This is the Settings.</Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('Settings', () => Settings );
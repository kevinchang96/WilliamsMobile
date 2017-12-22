import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Component1 extends Component{
    render(){
        return(
            <View>
                <Text>This is Component1</Text>
            </View>
        );
    }
}
AppRegistry.registerComponent('Component1', () => Component1 );
import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { Button } from 'react-native-elements';


export default class DiningMenus extends Component {

    render() {
        return (
        <View
                paddingTop={10}>
                    <Button
                      title='Log Out'
                      onPress={this._logout}
                      backgroundColor={'blue'}
                      />
                 </View>
        );
    }


}

AppRegistry.registerComponent('DiningMenus', () => DiningMenus );
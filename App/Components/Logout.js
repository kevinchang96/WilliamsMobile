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


export default class Logout extends Component {

    render() {
        return (
        <View
        paddingTop={10}>
            <Button
              title='Log Out'
              onPress={this._logout}
              outline={true}
              />
         </View>
        );
    }

    _logout = () => {
        // Logout
        fetch('https://wso.williams.edu/account/logout', {
             method: 'GET',
             headers: {
               'Host': 'wso.williams.edu',
               'Connection': 'keep-alive',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
               'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
               'Accept-Language': 'en-US,en;q=0.8',
               'Referer': 'https://wso.williams.edu/'
             },
          })
          .then(
            function(response) {
            console.log(response.headers);
            }
          )
          /*.then((response) => response.text() ) // Transform the data into text
          .then((responseText) => {
             // Parse the text here
             console.log(responseText);
          })*/
          .catch((error) => {
             console.error(error);
          });
    };
}

AppRegistry.registerComponent('Logout', () => Logout );
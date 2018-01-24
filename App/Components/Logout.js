/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, ScrollView, View, TextInput, TouchableHighlight } from 'react-native';
import { Button, Header, Overlay } from 'react-native-elements';


export default class Logout extends Component {

    constructor(props){
            super(props);
            this.state = {
                isVisible: false
            }
        }

    render() {
        return (
        <View style={styles.container}>
            <Header
                 centerComponent={{ text: 'Goodbye', style: { fontSize: 22, color: '#ffffff' } }}
                 outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}}
             />

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
                if( response.status != "200" ){
                    //this.setState({isVisible: true});
                    console.log("Error");
                }
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

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#512698',
        alignItems: 'center',
    },
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
        backgroundColor: '#512698',
    },
    icon: {
        width: 100,
        height: 100,
    },
});

AppRegistry.registerComponent('Logout', () => Logout );
/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Platform, StyleSheet, Text, ScrollView, View, TextInput, TouchableHighlight } from 'react-native';
import { Button, Header, Overlay } from 'react-native-elements';


export default class Logout extends Component {

    constructor(props){
            super(props);
            this.state = {
                isVisible: false,
                buttonDisabled: false
            }
        }

    componentDidMount(){
        this._isLoggedIn();
    }

    async _loggedOut(){
        try{
            await AsyncStorage.setItem('isLoggedIn', '0');
            //this.setState({buttonDisabled: true});
            console.log("Set pref => logged out!");
        } catch (error) {
            console.log( "An error has occurred! " + error );
        }
    }

    async _isLoggedIn(){
        try{
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if( isLoggedIn == '1' ){
                this.setState({buttonDisabled: false});
                console.log("We have already logged in!");
            } else {
                this.setState({buttonDisabled: true});
                console.log("We have yet to log in!");
            }
        } catch (error) {
            console.log( "An error has occurred! " + error );
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
              disabled={this.state.buttonDisabled}
              disabledStyle={styles.disabled}
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
                } else {
                    this._loggedOut();
                }
            }.bind(this)
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
    disabled: {
        backgroundColor: '#9678B6',
        borderColor: '#9678B6' //Purple mountain majesty
    },
});

AppRegistry.registerComponent('Logout', () => Logout );
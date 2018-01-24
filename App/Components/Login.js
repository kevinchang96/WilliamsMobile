/**
 * Kevin Chang, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Platform, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button, FormInput, Header } from 'react-native-elements';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
                username: '',
                password: '',
                cookies: '',
                text: '',
                buttonDisabled: false
        }
    }

    componentDidMount(){
        this._isLoggedIn();
    }

    async _loggedIn(){
        try{
            await AsyncStorage.setItem('isLoggedIn', '1');
            this.setState({buttonDisabled: true});
            console.log("Set pref => logged in!");
        } catch (error) {
            console.log( "An error has occurred! " + error );
        }
    }

    async _rememberMe(){
        try{
            await AsyncStorage.setItem('username', this.state.username);
            await AsyncStorage.setItem('password', this.state.password);
            console.log("Set pref => username/password!");
        } catch (error) {
            console.log( "An error has occurred! " + error );
        }
    }

    async _isLoggedIn(){
        try{
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if( isLoggedIn == '1' ){
                this.setState({buttonDisabled: true});
                console.log("We have already logged in!");
            } else {
                this.setState({buttonDisabled: false});
                console.log("We have yet to log in!");
            }
        } catch (error) {
            console.log( "An error has occurred! " + error );
        }
    }

    someFn(x){
            return this.props.callbackFromParent(x);
    }

    render() {
        return (
        <View style={styles.container}>
            <Header
                 centerComponent={{ text: 'Welcome!', style: { fontSize: 22, color: '#ffffff' } }}
                 outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}}
             />

            <View style={styles.container}>
                <Text>{this.state.text}</Text>

                <FormInput
                    value={this.state.username}
                    placeholder='Username'
                    placeholderTextColor={'white'}
                    onChangeText={username => this.setState({username})}
                    onSubmitEditing={(event) => {this.refs.passwordInput.focus()}} />

                <FormInput
                    secureTextEntry={true}
                    ref='passwordInput'
                    placeholder='Password'
                    placeholderTextColor={'white'}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={this._submitForm} />

                <Button
                  title='Submit'
                  backgroundColor={'#9678B6'} //Purple mountain majesty
                  disabled={this.state.buttonDisabled}
                  disabledStyle={styles.disabled}
                  onPress={this._submitForm}
                  outline={this.state.buttonDisabled}
                  />
            </View>
         </View>
        );
    }

    _submitForm = () => {
        const {username,password,cookies} = this.state
        //console.log("State information: " + JSON.stringify(this.state));
        //console.log("Username: "+ username);
        //console.log("Password: "+ password);

        // Get form parameters
        fetch('https://wso.williams.edu/account/login', {
             method: 'GET',
          })
          .then((response) => response.text() ) // Transform the data into text
          .then((responseText) => {
          // Parse the text here
             //console.log(responseText);
             var DOMParser = require('react-native-html-parser').DOMParser;

             let doc = new DOMParser().parseFromString(responseText,'text/html');
             var input = doc.getElementsByTagName("input");
             //console.log("Tags: " + input);
             var paramList = [input.length];
             for( i = 0; i < input.length; i++ ){
                // Iterate through parameters
                var key = input[i].getAttribute("name");
                var value = input[i].getAttribute("value");

                if( key == 'username' ){ value = username; }
                else if( key == 'password' ){ value = password; }

                paramList[i] = key + "=" + encodeURIComponent(value);
                console.log("Attr: " +input[i]);
             }
             var result = '';
             for( i = 0; i < paramList.length; i++ ){
                if( result.length == 0 ){ result = result + paramList[i]; }
                else { result = result + '&' + paramList[i]; }
             }
             console.log( "Result: " + result + "\nContent length: " + result.length );
             this._loginPost(result);
          })
          .catch((error) => {
             console.error(error);
          });
    };

    _loginPost(result){
        fetch('https://wso.williams.edu/account/login?class=login', {
              method: 'POST',
              headers: {
              'Host': 'wso.williams.edu',
              'Connection': 'keep-alive',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.8',
              'Referer': 'https://wso.williams.edu/account/login',
              'Cache-Control': 'max-age=0',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Number.parseInt(result.length,10)
              },
              body: result
           })
           .then(
            function(response) {
               //console.log(response.headers);
               //console.log( response._bodyInit );
               //console.log("T/F"+response._bodyInit.contains("https://pchanger.williams.edu/pchecker/"));
               //console.log(response.headers.get("set-cookie"));
               var setCookies = response.headers.get("set-cookie");
               //console.log( "Set-Cookies: " + setCookies );

               if( !response._bodyInit.contains("https://pchanger.williams.edu/pchecker/") ){
                // Correct login attempt
                this.setState( {cookies: setCookies, text: ""} );
                this._loggedIn();
                this._rememberMe();
               } else {
                // Incorrect login attempt
                this.setState({text: "Incorrect username or password! Please try again."});
               }

               //console.log("State information: " + JSON.stringify(this.state));
            }.bind(this)
           )
       .catch((error) => {
          console.error(error);
       });
    }
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
        backgroundColor: '#512698'
    }
});


AppRegistry.registerComponent('Login', () => Login );
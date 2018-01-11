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


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
                username: '',
                password: '',
                cookies: '',
            }
    }


    render() {
        return (
        <View>
            <TextInput
                placeholder="Username"
                value={this.state.username}
                onChangeText={username => this.setState({username})}
                onSubmitEditing={(event) => {this.refs.passwordInput.focus()}}
            />

            <TextInput
                secureTextEntry={true}
                ref='passwordInput'
                placeholder="Password"
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                onSubmitEditing={this._submitForm}
            />

            <TouchableHighlight onPress={this._submitForm}>
                <Text>Log In</Text>
            </TouchableHighlight>

         </View>
        );
    }

    _submitForm = () => {
        const {username,password,cookies} = this.state
        // Other stuff
        console.log("State information: " + JSON.stringify(this.state));
        console.log("Username: "+ username);
        console.log("Password: "+ password);

        // Get form parameters
        fetch('https://wso.williams.edu/account/login', {
             method: 'GET',
          })
          .then((response) => response.text() ) // Transform the data into text
          .then((responseText) => {
          // Parse the text here
             console.log(responseText);
             var DOMParser = require('react-native-html-parser').DOMParser;

             let doc = new DOMParser().parseFromString(responseText,'text/html');
             var input = doc.getElementsByTagName("input");
             console.log("Tags: " + input);
             var paramList = [input.length];
             for( i = 0; i < input.length; i++ ){
                // Iterate through parameters
                var key = input[i].getAttribute("name");
                var value = input[i].getAttribute("value");

                if( key == 'username' )
                    value = username;
                else if( key == 'password' )
                    value = password;
                else if( key == 'utf8' )
                    value = '%E2%9C%93';
                else if ( key == 'authenticity_token' ){
                    value = value.replace(new RegExp('=','g'),"%3D");
                    value = value.replace('+',"%2B");
                    value = value.replace(new RegExp('/','g'),"%2F");
                    //console.log("Auth_token: "+ value);
                    //console.log("Replaced: " + value.replace(new RegExp('=','g'),"%3D"))
                }
                
                const utf8 = require('utf8');
                //paramList[i] = key + "=" + utf8.encode(value);
                paramList[i] = key + "=" + value;
                paramList[i] = key + "=" + encodeURIComponent(value);

                //console.log("UTF8 encoding: "+ utf8.encode(value) );
                console.log("Attr: " +input[i]);
             }
             var result = '';

             for( i = 0; i < paramList.length; i++ ){
                if( result.length == 0 ){
                    result = result + paramList[i];
                } else {
                    result = result + '&' + paramList[i];
                }
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
               //console.log(response.headers.get("set-cookie"));
               var setCookies = response.headers.get("set-cookie");
               console.log( "Set-Cookies: " + setCookies );
               //update = {(setCookies) => this.setState({setCookies})}
               //this.state.cookies = 'Hello';
               this.setState( {cookies: setCookies} );

               //{cookies => this.setState({cookies})};
               console.log("State information: " + JSON.stringify(this.state));
            }.bind(this)
           )
           /*.then( (response) => response.text() )
           .then( responseText => {
                console.log(responseText);
           })*/

       .catch((error) => {
          console.error(error);
       });
    }

}


AppRegistry.registerComponent('Login', () => Login );
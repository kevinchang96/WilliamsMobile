/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HttpExample extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {

      const myRequest = new Request('https://wso.williams.edu/factrak/professors/8617');
      const test = myRequest.credentials;
      console.log("Creds: "+ test.toString() );
      fetch('https://wso.williams.edu/factrak/professors/8617', {
      //fetch('https://jsonplaceholder.typicode.com/posts/1', {
         method: 'GET',
         headers: {
         'Cookie': '_WSOonRails_session=S0JVclY3emZrM1N6b3dGTCtVak1vTy8zVjJvdFFqeENNQmJ2Q2FzNTBpcDM3WkhVMDlCaDBjSm9oQkd6UTYvbjcyNklnZ2p5TXRSaDJQM0FUTnFXVzFSU1BqQkdHbzQxZ2s5eEpQWVdqeGFJajYweDkwcUI1Y1owR296WW01MVIwaW9Pcm0xR0RUZE1nSHFFelZhdFFadnQ4MHVHdStWWk1WbFlmUytvYko3QzlEVTk4QmJhb2pGc2VOa3ZaVmZ5LS1HcVU4YmVJWFZmNTlsNkxSSjF0djR3PT0%3D--e5b7f75940b5f36e3064e50aa2399fa7d3c5c4bb'
         }
      })
      .then((response) => response.text() ) // Transform the data into text
      .then((responseText) => {
      // Parse the text here
         console.log(responseText);

         this.setState({
            data: responseText
         })
      })
      .catch((error) => {
         console.error(error);
      });
   };
   render() {
      return (
         <View>
            <Text>
               {this.state.data}
            </Text>
         </View>
      )
   }
}
export default HttpExample
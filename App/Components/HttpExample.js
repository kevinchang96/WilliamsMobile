import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HttpExample extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('https://wso.williams.edu/', {
      //fetch('https://jsonplaceholder.typicode.com/posts/1', {
         method: 'GET'
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
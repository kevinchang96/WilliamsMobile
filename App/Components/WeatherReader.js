// A WIP
// Can fetch JSON from openweather
// A class which fetches JSON data from the openweathermap api, runs it through a WeatherObj and renders the information
// Will handle image fetching and nice rendering after consistently being able to render the correct plain text information
// (c) 2018 Grace Mazzarella, William Fung

<<<<<<< HEAD
// import React, { Component } from 'react';
// import { AppRegistry, View, Text } from 'react-native';
//
// export default class WeatherReader extends Component {
//     constructor(props) {
//         super(props);
//
//         // let w;
//
//         // "lon": -73.20372,  "lat": 42.712021
//         this.state = {
//                  wdata: ''
//         };
//     }
//
//     fetchWeather() {
//       const url = 'http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372';
//       fetch(url)
//       .then((response) => response.json()) // Transform the data into json
//       .then(responseJson => {
//         console.log(reponseJson);
//         this.setState({wdata: responseJson});
//       })
//       .catch((error) => {
//         // this.setState({data: 'error'});
//         console.log(error);
//       });
//     }

    // fetchWeather() {
    //   const url = 'http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372';
    //   fetch(url)
    //   .then((response) => response.json()) // Transform the data into json
    //   .then((responseJson) => {
    //      this.setState({
    //        wdata: responseJson
    //      });
    //   })
    //   .catch((error) => {
    //     // this.setState({data: 'error'});
    //     console.log(error);
    //   });
    // }
// }
=======
import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';

export default class WeatherReader extends Component {
    constructor(props) {
        super(props);

        let w;

        fetch('http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372', { // "lon": -73.20372,  "lat": 42.712021
                 method: 'GET',
              })
              .then((response) => response.json() ) // Transform the data into json
              .then((responseJson) => {
              // Parse the json here
                 w = responseJson;
              })
              .catch((error) => {
                 console.error(error);
              });

        this.state = {
                 data: w,
        }
   }
}
>>>>>>> master

//   getWeather = () => {
//
//      fetch('http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372', { // "lon": -73.20372,  "lat": 42.712021
//         method: 'GET',
//      })
//      .then((response) => response.json() ) // Transform the data into json
//      .then((responseJson) => {
//      // Parse the json here
//         this.setState({
//            data: responseJson,
//         })
//      })
//      .catch((error) => {
//         console.error(error);
//      });
//}
<<<<<<< HEAD

import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class WeatherReader extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {

     const myRequest = new Request('https://wso.williams.edu/factrak/professors/8617%27');
     const test = myRequest.credentials;
     console.log("Creds: "+ test.toString() );
      fetch('https://wso.williams.edu/factrak/professors/8617'
      )
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
=======
>>>>>>> master

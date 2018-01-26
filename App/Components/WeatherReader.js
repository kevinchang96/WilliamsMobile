// A WIP
// Can fetch JSON from openweather
// A class which fetches JSON data from the openweathermap api, runs it through a WeatherObj and renders the information
// Will handle image fetching and nice rendering after consistently being able to render the correct plain text information
// (c) 2018 Grace Mazzarella, William Fung
//
// import React, { Component } from 'react';
// import { AppRegistry, View, Text } from 'react-native';
//
// export default class WeatherReader extends Component {
//     constructor(props) {
//         super(props);
//
//         let w;
//
//         fetch('http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372', { // "lon": -73.20372,  "lat": 42.712021
//                  method: 'GET',
//               })
//               .then((response) => response.json() ) // Transform the data into json
//               .then((responseJson) => {
//               // Parse the json here
//                  w = responseJson;
//               })
//               .catch((error) => {
//                  console.error(error);
//               });
//
//         this.state = {
//                  data: w,
//         }
//    }
// }

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

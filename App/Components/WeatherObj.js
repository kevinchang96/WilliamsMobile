// A WIP
// Need to test that this actually works, possibly without hooking it up to WeatherReader.js
// A class to keep track useful information about Williamstown's current weather conditions
// (c) 2018 Grace Mazzarella, William Fung

import React, { Component } from 'react';
import {View, Text} from 'react-native';
//import WeatherReader from './WeatherReader';

export default class WeatherObj extends Component {
    constructor(props) {
      super(props);

      let raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":270.92,"pressure":1024,"humidity":86,"temp_min":270.15,"temp_max":272.15},"visibility":4828,"wind":{"speed":1.06,"deg":355.005},"clouds":{"all":90},"dt":1516204440,"sys":{"type":1,"id":2898,"message":0.0191,"country":"US","sunrise":1516191537,"sunset":1516225663},"id":4955786,"name":"Williamstown","cod":200}'); // all the data
      let temp = raw.main.temp;   // temperature in Kelvins

      // temperature conversions
      var tempF = temp*1.8 - 459.67;
      var tempC = temp - 273.15;

      // this.setState({
      //     main: raw.weather[0].main,
      //     description: raw.weather[0].description,
      //     icon: raw.weather[0].icon,
      // });
      //
      // this.setState({
      //     fahrenheit: tempF,
      //     celsius: tempC,
      //     humidity: raw.main.humidity,
      // });
      //
      // this.setState({
      //     ms: raw.wind.speed,
      //     mph: raw.wind.speed*2.2369,
      // })

      this.state = {
          main: raw.weather[0].main,           // main, eg. cloudy, sunny, etc.
          description: raw.weather[0].description,    // a somewhat accurate blurb about the weather
          icon: raw.weather[0].icon,           // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
          fahrenheit: tempF,     // temperature in Fahrenheit
          celsius: tempC,        // temperature in Celsius
          humidity: raw.main.humidity,       // percent humidity
          ms: raw.wind.speed,             // speed in m/s (metric units)
          mph: raw.wind.speed*2.2369,            // speed in mi/hr (imperial units)
      }
    }



    // storeData = () => {
    //     var raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":270.92,"pressure":1024,"humidity":86,"temp_min":270.15,"temp_max":272.15},"visibility":4828,"wind":{"speed":1.06,"deg":355.005},"clouds":{"all":90},"dt":1516204440,"sys":{"type":1,"id":2898,"message":0.0191,"country":"US","sunrise":1516191537,"sunset":1516225663},"id":4955786,"name":"Williamstown","cod":200}'); // all the data
    //     var temp = raw.main.temp;   // temperature in Kelvins
    //
    //     // temperature conversions
    //     var tempF = temp*1.8 - 459.67;
    //     var tempC = temp - 273.15;
    //
    //     this.setState({
    //         main: raw.weather[0].main,
    //         description: raw.weather[0].description,
    //         icon: raw.weather[0].icon,
    //     });
    //
    //     this.setState({
    //         fahrenheit: tempF,
    //         celsius: tempC,
    //         humidity: raw.main.humidity,
    //     });
    //
    //     this.setState({
    //         ms: raw.wind.speed,
    //         mph: raw.wind.speed*2.2369,
    //     })
    // }

    // get functions for each piece of information stored

    getMain = () => {
        return (this.state.main);
    }

    getDescription = () => {
        return (this.state.description);
    }

    getIcon = () => {
        return (this.state.icon);
    }

    getFahrenheit = () => {
        return (this.state.fahrenheit);
    }

    getCelsius = () => {
        return (this.state.celsius);
    }

    getHumidity = () => {
        return (this.state.humidity);
    }

    getMS = () => {
        return (this.state.ms);
    }

    getMPH = () => {
        return (this.state.mph);
    }

    // a render function for testing

    render() {
        //let w = '{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":270.92,"pressure":1024,"humidity":86,"temp_min":270.15,"temp_max":272.15},"visibility":4828,"wind":{"speed":1.06,"deg":355.005},"clouds":{"all":90},"dt":1516204440,"sys":{"type":1,"id":2898,"message":0.0191,"country":"US","sunrise":1516191537,"sunset":1516225663},"id":4955786,"name":"Williamstown","cod":200}';
        // this.storeData();
        // console.log(this);
        // console.log(this.state.main);
        return (
            <View>
                <Text>I am text 2</Text>
                <Text>
                  {this.state.main}
                </Text>
                <Text>{this.state.mph}</Text>
                <Text>{this.state.ms}</Text>
                <Text>{this.state.humidity}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.main}</Text>
                <Text>{this.state.main}</Text>
            </View>
        )
    }
}

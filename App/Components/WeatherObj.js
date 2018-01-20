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

      let w = new WeatherReader();
      let webInfo = w.state.data;
      let raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":268.91,"pressure":1015,"humidity":63,"temp_min":267.15,"temp_max":270.15},"visibility":16093,"wind":{"speed":3.6,"deg":270},"clouds":{"all":90},"dt":1516377240,"sys":{"type":1,"id":1289,"message":0.004,"country":"US","sunrise":1516364263,"sunset":1516398614},"id":4955786,"name":"Williamstown","cod":200}'); // all the data
      
      // temperature conversions
      let temp = raw.main.temp;   // temperature in Kelvins
      var tempF = Math.floor(temp*1.8 - 459.67);
      var tempC = Math.floor(temp - 273.15);

      this.state = {
          
          test: webInfo,

          main: raw.weather[0].main,                  // main, eg. cloudy, sunny, etc.
          description: raw.weather[0].description,    // a somewhat accurate blurb about the weather
          icon: raw.weather[0].icon,                  // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
          fahrenheit: tempF,                          // temperature in Fahrenheit, floored because it's always colder than it seems
          celsius: tempC,                             // temperature in Celsius
          humidity: raw.main.humidity,                // percent humidity
          ms: Math.ceil(raw.wind.speed),              // speed in m/s (metric units), ceiling-ed because wind chill is real
          mph: Math.ceil(raw.wind.speed*2.2369),      // speed in mi/hr (imperial units)
      }
    }

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
                <Text>{this.state.test}</Text>
            </View>
        )
    }
}

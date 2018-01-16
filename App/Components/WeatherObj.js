// A WIP
// Need to test that this actually works, possibly without hooking it up to WeatherReader.js
// A class to keep track useful information about Williamstown's current weather conditions
// (c) 2018 Grace Mazzarella

import React, { Component } from 'react';
import {View, Text} from 'react-native';

class WeatherObj extends Component {
    state = {
        main: '',           // main, eg. cloudy, sunny, etc.
        description: '',    // a somewhat accurate blurb about the weather
        icon: '',           // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
        fahrenheit: '',     // temperature in Fahrenheit
        celsius: '',        // temperature in Celsius
        humidity: '',       // percent humidity
        ms: '',             // speed in m/s (metric units)
        mph: '',            // speed in mi/hr (imperial units)
    }

    storeData = (json) => {
        var raw = JSON.parse(json); // all the data
        var temp = raw.main.temp;   // temperature in Kelvins

        // temperature conversions
        var tempF = temp*1.8 - 459.67;
        var tempC = temp - 273.15;

        this.setState({
            main: raw.weather[0].main,
            description: raw.weather[0].description,
            icon: raw.weather[0].icon,
            fahrenheit: tempF,
            celsius: temperature,
            humidity: raw.main.humidity,
            ms: raw.wind.speed,
            mph: raw.wind.speed*2.2369,
        });
    }

    // get functions for each piece of information stored

    getMain = () => {
        return (this.main);
    }

    getDescription = () => {
        return (this.description);
    }

    getIcon = () => {
        return (this.icon);
    }

    getFahrenheit = () => {
        return (this.fahrenheit);
    }

    getCelsius = () => {
        return (this.celsius);
    }

    getHumidity = () => {
        return (this.humidity);
    }

    getMS = () => {
        return (this.ms);
    }

    getMPH = () => {
        return (this.mph);
    }

    // a render function for testing
//    render() {
//        return (
//            <View>
//                <Text>{this.state}</Text>
//            </View>
//        )
//    }
}

export default WeatherObj

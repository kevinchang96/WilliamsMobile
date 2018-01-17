// A WIP
// Need to test that this actually works, possibly without hooking it up to WeatherReader.js
// A class to keep track useful information about Williamstown's current weather conditions
// (c) 2018 Grace Mazzarella

import React, { Component } from 'react';
import {View, Text} from 'react-native';
//import WeatherReader from './WeatherReader';

export default class WeatherObj extends Component {
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

    storeData = () => {
        var raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":270.92,"pressure":1024,"humidity":86,"temp_min":270.15,"temp_max":272.15},"visibility":4828,"wind":{"speed":1.06,"deg":355.005},"clouds":{"all":90},"dt":1516204440,"sys":{"type":1,"id":2898,"message":0.0191,"country":"US","sunrise":1516191537,"sunset":1516225663},"id":4955786,"name":"Williamstown","cod":200}'); // all the data
        var temp = raw.main.temp;   // temperature in Kelvins

        // temperature conversions
        var tempF = temp*1.8 - 459.67;
        var tempC = temp - 273.15;

        this.setState({
            main: raw.weather[0].main,
            description: raw.weather[0].description,
            icon: raw.weather[0].icon,
        });

        this.setState({
            fahrenheit: tempF,
            celsius: tempC,
            humidity: raw.main.humidity,
        });

        this.setState({
            ms: raw.wind.speed,
            mph: raw.wind.speed*2.2369,
        })
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

    render() {
        //let w = '{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"},{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":270.92,"pressure":1024,"humidity":86,"temp_min":270.15,"temp_max":272.15},"visibility":4828,"wind":{"speed":1.06,"deg":355.005},"clouds":{"all":90},"dt":1516204440,"sys":{"type":1,"id":2898,"message":0.0191,"country":"US","sunrise":1516191537,"sunset":1516225663},"id":4955786,"name":"Williamstown","cod":200}';
        this.storeData();
        return (
            <View>
                <Text>{this.getMain()}</Text>
            </View>
        )
    }
}

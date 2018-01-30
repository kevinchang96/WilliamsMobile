// A WIP
// Need to test that this actually works, possibly without hooking it up to WeatherReader.js
// A class to keep track useful information about Williamstown's current weather conditions
// (c) 2018 Grace Mazzarella, William Fung

import React, { Component } from 'react';
import WeatherCard from './WeatherCard.js';
import { AppRegistry, Platform, StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { Avatar, Card, Button, Header, Icon, List, ListItem, Tile } from 'react-native-elements';
//import WeatherReader from './WeatherReader';

export default class WeatherObj extends Component {
    constructor(props) {
      super(props);

      // let w = new WeatherReader();
      // let webInfo = w.state.data;
      let raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":268.91,"pressure":1015,"humidity":63,"temp_min":267.15,"temp_max":270.15},"visibility":16093,"wind":{"speed":3.6,"deg":270},"clouds":{"all":90},"dt":1516377240,"sys":{"type":1,"id":1289,"message":0.004,"country":"US","sunrise":1516364263,"sunset":1516398614},"id":4955786,"name":"Williamstown","cod":200}'); // all the data

      // temperature conversions
      let temp = raw.main.temp;   // temperature in Kelvins
      var tempF = Math.floor(temp*1.8 - 459.67);
      var tempC = Math.floor(temp - 273.15);

      this.state = {

          test: '',

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

   //  componentDidMount() {
   //   // this.fetchWeather();
   //   // this.setState({test: 'something'});
   //   let url = 'https://jsonplaceholder.typicode.com/posts/1';
   //   fetch('http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68', {method: 'GET',})
   //   .then((response) => response.json())
   //   .then((responseJson) => {
   //     this.setState({test: JSON.parse(responseJson)});
   //   })
   //   .catch((error) => {
   //     this.setState({test: 'error'});
   //     console.log(error);
   //   });
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
        return (
            <View>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{ text: 'Weather', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                />

                <Card
                    titleStyle={cardStyle.titleStyle}
                    title={'Someday, 99:00fm'}>
                    <Text style={cardStyle.text}>Currently: {this.state.main}</Text>
                    <Text style={cardStyle.text}>Temperature: {this.state.fahrenheit}°F / {this.state.celsius}°C</Text>
                    <Text style={cardStyle.text}>Humidity: {this.state.humidity}%</Text>
                    <Text style={cardStyle.text}>Wind speed: {this.state.mph} mph / {this.state.ms} mps</Text>
                </Card>

                <ScrollView>
                    <Text>Put forecast here.</Text>
                </ScrollView>
            </View>
        )
    }
};

const cardStyle = StyleSheet.create({
     titleStyle:{
         color: '#512698',
         //backgroundColor: 'white',
         //fontFamily: 'Comfortaa_bold',
         fontSize: 20
     },
     messageStyle:{
         //fontFamily: 'Montserrat',
         fontSize: 18,
         marginBottom: 0,
     },
     srcStyle:{
         //fontFamily: 'Montserrat',
         fontSize: 16,
         fontStyle: 'italic'
     },
     text:{
         color: 'black',
         fontSize: 18
     }
});

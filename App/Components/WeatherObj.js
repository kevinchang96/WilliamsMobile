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

    componentDidMount() {
      var errorMessage = "Unable to get weather information.";
      var zipcode = "01267"; //Williamstown - Massachusetts
      var query = "q=" + escape(
            "select item from weather.forecast where location") +
            "=\"" + zipcode + "\"";
      var endPointURL = "http://query.yahooapis.com/v1/public/yql?" + query  +
            "&format=json";

      fetch(endPointURL, {method: 'GET',})
      .then((response) => {
        this.setState({test: response.query.results.channel.item.description});
      })
      .catch((error) => {
        this.setState({test: errorMessage});
        console.log(error);
      });

      // script.get(endPointURL, {
      //   jsonp: "callback",
      //   preventCache: true,
      //   timeout: 3000
      // }).then(function(response) {
      //   try {
      //     // document.getElementById("someDivID").innerHTML = response.query.results.channel.item.description;
      //     this.setState({test: response.query.results.channel.item.description});
      //   } catch (exception) {
      //     alert(errorMessage);
      //   }
      // }, function(error) {
      //   this.setState({test: errorMessage});
      // });

      // response.query.results.channel.item.description

      // var queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys/";
      //
      // this.getJSON(endPointURL, function (data) {
      //
      // var results = data.query.results
      // var firstResult = results.channel.item.condition
      // console.log(firstResult);
      //
      // var location = 'Unknown' // not returned in response
      // var temp = firstResult.temp
      // var text = firstResult.text
      //
      // this.setState({test: text});

  //  })

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

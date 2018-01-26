// A WIP
// Need to test that this actually works, possibly without hooking it up to WeatherReader.js
// A class to keep track useful information about Williamstown's current weather conditions
// (c) 2018 Grace Mazzarella, William Fung

import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text } from 'react-native';
import WeatherCard from './WeatherCard';
=======
import {View, Text} from 'react-native';
//import WeatherReader from './WeatherReader';
>>>>>>> master

export default class WeatherObj extends Component {
    constructor(props) {
      super(props);

<<<<<<< HEAD


      // let w = new WeatherReader();
      // w.fetchWeather();
      // let webInfo = w.state.wdata;
      let raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":266.37,"pressure":1041,"humidity":41,"temp_min":264.15,"temp_max":268.15},"visibility":16093,"wind":{"speed":2.6,"deg":180},"clouds":{"all":1},"dt":1516981860,"sys":{"type":1,"id":2088,"message":0.0044,"country":"US","sunrise":1516968740,"sunset":1517003949},"id":4955786,"name":"Williamstown","cod":200}'); // all the data

=======
      let w = new WeatherReader();
      let webInfo = w.state.data;
      let raw = JSON.parse('{"coord":{"lon":-73.2,"lat":42.71},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":268.91,"pressure":1015,"humidity":63,"temp_min":267.15,"temp_max":270.15},"visibility":16093,"wind":{"speed":3.6,"deg":270},"clouds":{"all":90},"dt":1516377240,"sys":{"type":1,"id":1289,"message":0.004,"country":"US","sunrise":1516364263,"sunset":1516398614},"id":4955786,"name":"Williamstown","cod":200}'); // all the data
      
>>>>>>> master
      // temperature conversions
      let temp = raw.main.temp;   // temperature in Kelvins
      var tempF = Math.floor(temp*1.8 - 459.67);
      var tempC = Math.floor(temp - 273.15);

      this.state = {
<<<<<<< HEAD

          card: [],
=======
          
          test: webInfo,
>>>>>>> master

          main: raw.weather[0].main,                  // main, eg. cloudy, sunny, etc.
          description: raw.weather[0].description,    // a somewhat accurate blurb about the weather
          icon: raw.weather[0].icon,                  // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
          fahrenheit: tempF,                          // temperature in Fahrenheit, floored because it's always colder than it seems
          celsius: tempC,                             // temperature in Celsius
          humidity: raw.main.humidity,                // percent humidity
          ms: Math.ceil(raw.wind.speed),              // speed in m/s (metric units), ceiling-ed because wind chill is real
          mph: Math.ceil(raw.wind.speed*2.2369),      // speed in mi/hr (imperial units)
      }
<<<<<<< HEAD

    }
//
//    componentDidMount() {
//      // this.fetchWeather();
//      // this.setState({test: 'something'});
//      let url = 'https://jsonplaceholder.typicode.com/posts/1';
//      fetch('http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68', {method: 'GET',})
//      .then((response) => response.json())
//      .then((responseJson) => {
//        this.setState({test: JSON.parse(responseJson)});
//      })
//      .catch((error) => {
//        this.setState({test: 'error'});
//        console.log(error);
//      });
//    }

    // fetchWeather() {
    //   // http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68&lat=42.712021&lon=-73.20372
    //   let url = 'http://api.openweathermap.org/data/2.5/weather?q=01267&APPID=5001beb19a0b0fa04fb3aa969e984f68';
    //   fetch(url)
    //   .then((response) => {
    //     this.setState({test: 'some string'});
    //   })
    //   // fetch(url)
    //   // .then((response) => {
    //   //   return response.text()
    //   // }) // Transform the data into json
    //   // .then((responseJson) => {
    //   //   console.log(reponseJson);
    //   //   this.setState({test: "responseJson"});
    //   // })
    //   .catch((error) => {
    //     this.setState({test: 'error'});
    //     console.log(error);
    //   });
    // }

    // get functions for each piece of information stored

    getWeather = () => {
        let weatherCard = this.createCard();

        this.setState({
            card: weatherCard
        });
    }

    createCard(){
        let w = {
            //url: 'http://openweathermap.org/img/w/' + this.state.icon + '.png',
            icon: this.state.icon,
            curr: this.state.description,
            fahr: this.state.fahrenheit,
            cels: this.state.celsius,
            humi: this.state.humidity,
            mile: this.state.mph,
            mete: this.state.ms
        }

        card = <WeatherCard
                    //url = {w.url}
                    icon = {w.icon}
                    curr = {w.curr}
                    fahr = {w.fahr}
                    cels = {w.cels}
                    humi = {w.humi}
                    mile = {w.mile}
                    mete = {w.mete}
               />

        //console.log(card);
        return card;
        }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                        />
                    }
                    centerComponent={{ text: 'Weather', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55, marginBottom: 10}}
                />
                <ScrollView>
                    {this.state.card}
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE' //'#DCD0FE',
    }
})
=======
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
>>>>>>> master

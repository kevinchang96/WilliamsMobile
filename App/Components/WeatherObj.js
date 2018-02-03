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
      // let temp = raw.main.temp;   // temperature in Kelvins
      // var tempF = Math.floor(temp*1.8 - 459.67);
      // var tempC = Math.floor(temp - 273.15);

      this.state = {

          title: '',
          main: '',                  // main, eg. cloudy, sunny, etc.
          description: '',    // a somewhat accurate blurb about the weather
          icon: '',                  // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
          fahrenheit: '',                          // temperature in Fahrenheit, floored because it's always colder than it seems
          celsius: '',                             // temperature in Celsius
          humidity: '',                // percent humidity
          ms: '',              // speed in m/s (metric units), ceiling-ed because wind chill is real
          mph: '',      // speed in mi/hr (imperial units)

          oneDate: '',
          oneDay: '',
          oneHigh: '',
          oneLow: '',
          oneText: '',

          twoDate: '',
          twoDay: '',
          twoHigh: '',
          twoLow: '',
          twoText: '',

          threeDate: '',
          threeDay: '',
          threeHigh: '',
          threeLow: '',
          threeText: '',

          fourDate: '',
          fourDay: '',
          fourHigh: '',
          fourLow: '',
          fourText: '',

          fiveDate: '',
          fiveDay: '',
          fiveHigh: '',
          fiveLow: '',
          fiveText: '',

          // date1: '',
          // day1: '',
          // high1: '',
          // low1: '',
          // text1: '',
      }
    }

    componentDidMount() {
      this.fetchData();
   }

   convertToCelsius(tempF) {
     return (Math.ceil((tempF - 32) * (5 / 9)));
   }

   convertToMS(mph) {
     return (Math.ceil(2.237 * mph));
   }

   fetchData() {

     const endPointURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22williamstown%2C%20ma%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
     fetch(endPointURL)
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
            title: responseData.query.results.channel.item.pubDate,
            main: responseData.query.results.channel.item.title,                  // main, eg. cloudy, sunny, etc.
            description: responseData.query.results.channel.item.condition.text,    // a somewhat accurate blurb about the weather
            icon: '',                  // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
            fahrenheit: responseData.query.results.channel.item.condition.temp,                          // temperature in Fahrenheit, floored because it's always colder than it seems
            celsius: this.convertToCelsius(responseData.query.results.channel.item.condition.temp),                             // temperature in Celsius
            humidity: responseData.query.results.channel.atmosphere.humidity,                // percent humidity
            ms: this.convertToMS(responseData.query.results.channel.wind.speed),              // speed in m/s (metric units), ceiling-ed because wind chill is real
            mph: responseData.query.results.channel.wind.speed,      // speed in mi/hr (imperial units)
          })
          // call back in setState to calculate temperatureInC after temperatureGot's state is changed,
          // since setState is async, temperatureGot may still have old value due
          // this.setState(
          //   {temperatureGot: responseData.query.results.channel.item.condition.temp},
          //     function afterTemperatureGot () {this.convertTemperatureToC();}
          // )
          this.setState({
            oneDate: responseData.query.results.channel.item.forecast[1].date,
            oneDay: responseData.query.results.channel.item.forecast[1].day,
            oneHigh: responseData.query.results.channel.item.forecast[1].high,
            oneLow: responseData.query.results.channel.item.forecast[1].low,
            oneText: responseData.query.results.channel.item.forecast[1].text,

            twoDate: responseData.query.results.channel.item.forecast[2].date,
            twoDay: responseData.query.results.channel.item.forecast[2].day,
            twoHigh: responseData.query.results.channel.item.forecast[2].high,
            twoLow: responseData.query.results.channel.item.forecast[2].low,
            twoText: responseData.query.results.channel.item.forecast[2].text,

            threeDate: responseData.query.results.channel.item.forecast[3].date,
            threeDay: responseData.query.results.channel.item.forecast[3].day,
            threeHigh: responseData.query.results.channel.item.forecast[3].high,
            threeLow: responseData.query.results.channel.item.forecast[3].low,
            threeText: responseData.query.results.channel.item.forecast[3].text,

            fourDate: responseData.query.results.channel.item.forecast[4].date,
            fourDay: responseData.query.results.channel.item.forecast[4].day,
            fourHigh: responseData.query.results.channel.item.forecast[4].high,
            fourLow: responseData.query.results.channel.item.forecast[4].low,
            fourText: responseData.query.results.channel.item.forecast[4].text,

            fiveDate: responseData.query.results.channel.item.forecast[5].date,
            fiveDay: responseData.query.results.channel.item.forecast[5].day,
            fiveHigh: responseData.query.results.channel.item.forecast[5].high,
            fiveLow: responseData.query.results.channel.item.forecast[5].low,
            fiveText: responseData.query.results.channel.item.forecast[5].text,
          })
          // for (let i = 1; i < 2; i++) {
          //   this.setState({
          //     date + i: responseData.query.results.channel.item.forecast[1].date,
          //     day + i: responseData.query.results.channel.item.forecast[1].day,
          //     high + i: responseData.query.results.channel.item.forecast[1].high,
          //     low + i: responseData.query.results.channel.item.forecast[1].low,
          //     text + i: responseData.query.results.channel.item.forecast[1].text,
          //   })
          // }
      })
      .catch((error) => {
        this.setState({title: 'Unable to display weather'});
      })
      .done();
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
                    title={this.state.title}>
                    <Text style={cardStyle.text}>{'Conditions for Williamstown, MA 01267'}</Text>
                    <Text style={cardStyle.text}>Currently: {this.state.description}</Text>
                    <Text style={cardStyle.text}>Temperature: {this.state.fahrenheit}°F / {this.state.celsius}°C</Text>
                    <Text style={cardStyle.text}>Humidity: {this.state.humidity}%</Text>
                    <Text style={cardStyle.text}>Wind speed: {this.state.mph} mph / {this.state.ms} m/s</Text>
                </Card>
                <ScrollView>
                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={'Next five days:'}>
                  </Card>

                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={this.state.oneDay}>
                      <Text style={cardStyle.text}>{this.state.oneDate}</Text>
                      <Text style={cardStyle.text}>Conditions: {this.state.oneText}</Text>
                      <Text style={cardStyle.text}>Temperature: {this.state.oneHigh}°F / {this.state.oneLow}°F</Text>
                  </Card>
                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={this.state.twoDay}>
                      <Text style={cardStyle.text}>{this.state.twoDate}</Text>
                      <Text style={cardStyle.text}>Conditions: {this.state.twoText}</Text>
                      <Text style={cardStyle.text}>Temperature: {this.state.twoHigh}°F / {this.state.twoLow}°F</Text>
                  </Card>
                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={this.state.threeDay}>
                      <Text style={cardStyle.text}>{this.state.threeDate}</Text>
                      <Text style={cardStyle.text}>Conditions: {this.state.threeText}</Text>
                      <Text style={cardStyle.text}>Temperature: {this.state.threeHigh}°F / {this.state.threeLow}°F</Text>
                  </Card>
                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={this.state.fourDay}>
                      <Text style={cardStyle.text}>{this.state.fourDate}</Text>
                      <Text style={cardStyle.text}>Conditions: {this.state.fourText}</Text>
                      <Text style={cardStyle.text}>Temperature: {this.state.fourHigh}°F / {this.state.fourLow}°F</Text>
                  </Card>
                  <Card
                      titleStyle={cardStyle.titleStyle}
                      title={this.state.fiveDay}>
                      <Text style={cardStyle.text}>{this.state.fiveDate}</Text>
                      <Text style={cardStyle.text}>Conditions: {this.state.fiveText}</Text>
                      <Text style={cardStyle.text}>Temperature: {this.state.fiveHigh}°F / {this.state.fiveLow}°F</Text>
                  </Card>
                  <Text>Powered by Yahoo!</Text>
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

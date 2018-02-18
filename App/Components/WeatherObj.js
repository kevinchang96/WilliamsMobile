/**
 * Grace Mazzarella, William Fung, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Image, View, Text, ScrollView } from 'react-native';
import { Avatar, Card, Button, Divider, Header, Icon, List, ListItem, Tile } from 'react-native-elements';

export default class WeatherObj extends Component {
    constructor(props) {
      super(props);

      this.state = {

          title: '',
          main: '',           // main, eg. cloudy, sunny, etc.
          description: '',    // a somewhat accurate blurb about the weather
          icon: '',           // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
          fahrenheit: '',     // temperature in Fahrenheit, floored because it's always colder than it seems
          celsius: '',        // temperature in Celsius
          humidity: '',       // percent humidity
          ms: '',             // speed in m/s (metric units), ceiling-ed because wind chill is real
          mph: '',            // speed in mi/hr (imperial units)

          city: '',
          country: '',
          dow: '',
          forecast: [],
          footer: '',

          //storage for forecast data; found iterating through it to be troublesome and a half
//          oneDate: '',
//          oneDay: '',
//          oneHigh: '',
//          oneLow: '',
//          oneText: '',
//
//          twoDate: '',
//          twoDay: '',
//          twoHigh: '',
//          twoLow: '',
//          twoText: '',
//
//          threeDate: '',
//          threeDay: '',
//          threeHigh: '',
//          threeLow: '',
//          threeText: '',
//
//          fourDate: '',
//          fourDay: '',
//          fourHigh: '',
//          fourLow: '',
//          fourText: '',
//
//          fiveDate: '',
//          fiveDay: '',
//          fiveHigh: '',
//          fiveLow: '',
//          fiveText: '',
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
          console.log(responseData.query.results.channel);

          this.setState({
            title: responseData.query.results.channel.item.forecast[0].date,
            main: responseData.query.results.channel.item.title,                                            // main, eg. cloudy, sunny, etc.
            description: responseData.query.results.channel.item.condition.text,                            // a somewhat accurate blurb about the weather
            icon: responseData.query.results.channel.item.condition.code,                                   // http://openweathermap.org/img/w/<icon>.png pulls up a little weather icon
            fahrenheit: responseData.query.results.channel.item.condition.temp + "°F",                      // temperature in Fahrenheit, floored because it's always colder than it seems
            celsius: " / " + this.convertToCelsius(responseData.query.results.channel.item.condition.temp) + "°C",  // temperature in Celsius
            humidity: responseData.query.results.channel.atmosphere.humidity  + "%",                        // percent humidity
            ms: this.convertToMS(responseData.query.results.channel.wind.speed)  + " m/s",                  // speed in m/s (metric units), ceiling-ed because wind chill is real
            mph: responseData.query.results.channel.wind.speed  + " mph",                                   // speed in mi/hr (imperial units)

            city: responseData.query.results.channel.location.city,
            country: responseData.query.results.channel.location.country,
            dow: responseData.query.results.channel.lastBuildDate.substring(0,3),
            forecast: responseData.query.results.channel.item.forecast,                                     // list of forecast info
            footer: responseData.query.results.channel.description,
          });

//          this.setState({
//            oneDate: responseData.query.results.channel.item.forecast[1].date,
//            oneDay: responseData.query.results.channel.item.forecast[1].day,
//            oneHigh: responseData.query.results.channel.item.forecast[1].high,
//            oneLow: responseData.query.results.channel.item.forecast[1].low,
//            oneText: responseData.query.results.channel.item.forecast[1].text,
//
//            twoDate: responseData.query.results.channel.item.forecast[2].date,
//            twoDay: responseData.query.results.channel.item.forecast[2].day,
//            twoHigh: responseData.query.results.channel.item.forecast[2].high,
//            twoLow: responseData.query.results.channel.item.forecast[2].low,
//            twoText: responseData.query.results.channel.item.forecast[2].text,
//
//            threeDate: responseData.query.results.channel.item.forecast[3].date,
//            threeDay: responseData.query.results.channel.item.forecast[3].day,
//            threeHigh: responseData.query.results.channel.item.forecast[3].high,
//            threeLow: responseData.query.results.channel.item.forecast[3].low,
//            threeText: responseData.query.results.channel.item.forecast[3].text,
//
//            fourDate: responseData.query.results.channel.item.forecast[4].date,
//            fourDay: responseData.query.results.channel.item.forecast[4].day,
//            fourHigh: responseData.query.results.channel.item.forecast[4].high,
//            fourLow: responseData.query.results.channel.item.forecast[4].low,
//            fourText: responseData.query.results.channel.item.forecast[4].text,
//
//            fiveDate: responseData.query.results.channel.item.forecast[5].date,
//            fiveDay: responseData.query.results.channel.item.forecast[5].day,
//            fiveHigh: responseData.query.results.channel.item.forecast[5].high,
//            fiveLow: responseData.query.results.channel.item.forecast[5].low,
//            fiveText: responseData.query.results.channel.item.forecast[5].text,
//          });
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

    // a render function for displaying

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={cardStyle.container}>
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

                <ScrollView>
                    <Card style={cardStyle.card}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Image style={{marginLeft: 10, width: 120, height: 120}}
                                source={{uri: "http://l.yimg.com/a/i/us/we/52/" + this.state.icon + ".gif"}}/>

                            <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
                                <Text style={cardStyle.tempText}>{this.state.fahrenheit}<Text style={cardStyle.text}>{this.state.celsius}</Text></Text>
                                <Text style={cardStyle.condText}>{this.state.description}</Text>
                            </View>
                        </View>

                        <Divider style={{ backgroundColor: 'gray' }}/>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 20, marginRight: 20}}>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Icon
                                  name='date-range'
                                  color='gray'
                                  size={30}/>
                                <Text style={cardStyle.underText}>{this.state.dow}</Text>
                            </View>

                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Icon
                                  name='toys'
                                  color='gray'
                                  size={30}/>
                                <Text style={cardStyle.underText}>{this.state.mph}</Text>
                            </View>

                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Icon
                                  name='hot-tub'
                                  color='gray'
                                  size={30}/>
                                <Text style={cardStyle.underText}>{this.state.humidity}</Text>
                            </View>
                        </View>
                    </Card>

                    <List
                      containerStyle={{marginTop: 0, marginBottom: 10, backgroundColor: "#eeeeee"}}>
                      {
                        this.state.forecast.map((l, i) => (
                          <Card style={cardStyle.card}>
                              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <View style={{flexDirection: 'row'}}>
                                      <Image style={{width: 30, height: 30}}
                                        source={{uri: "http://l.yimg.com/a/i/us/we/52/" + l.code + ".gif"}}/>
                                      <Text style={cardStyle.titleStyle}>   {l.day}</Text>
                                  </View>
                                  <Text style={cardStyle.text}>{l.text}</Text>
                                  <Text style={cardStyle.text}>{l.high}°  {l.low}°</Text>
                              </View>

                          </Card>
                        ))
                      }
                    </List>

                    <View style={cardStyle.footerText}>
                        <Text>{this.state.footer}</Text>
                    </View>
                </ScrollView>

                {/*<ScrollView>
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

                    <Card
                        titleStyle={cardStyle.titleStyle}
                        title={'Powered by Yahoo!'}>
                        <Text style={cardStyle.text}>{this.state.fiveDate}</Text>
                        <Text style={cardStyle.text}>Conditions: {this.state.fiveText}</Text>
                        <Text style={cardStyle.text}>Temperature: {this.state.fiveHigh}°F / {this.state.fiveLow}°F</Text>
                    </Card>

                    <Card style={cardStyle.card}
                        titleStyle={cardStyle.titleStyle}
                        title={this.state.fiveDay}>
                        <Text style={cardStyle.text}>{this.state.fiveDate}</Text>
                        <Text style={cardStyle.text}>Conditions: {this.state.fiveText}</Text>
                        <Text style={cardStyle.text}>Temperature: {this.state.fiveHigh}°F / {this.state.fiveLow}°F</Text>
                    </Card>
                </ScrollView>*/}
            </View>
        )
    }
};

const cardStyle = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    titleStyle:{
        color: '#512698',
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
    tempText:{
        color: 'black',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: -10,
    },
    condText:{
        color: '#512698',
        fontSize: 24
    },
    underText:{
        marginTop: 5,
        color: 'gray',
        fontSize: 20
    },
    footerText:{
        color: 'gray',
        fontSize: 1,
        alignItems: 'center',
    },
    text:{
        color: 'black',
        fontSize: 20
    },
    card:{
        marginTop: 0,
        marginBottom: 5,
    }
});

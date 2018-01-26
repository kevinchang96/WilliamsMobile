import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Text, Thumbnail, Icon, Left, Body } from 'native-base';

export default class WeatherCard extends Component {
  render() {
    console.log(this);
    return (
      <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                //<Thumbnail source={'http://openweathermap.org/img/w/' + {this.props.icon} + '.png'} />
                <Body>
                  <Text>Currently: {this.props.curr}</Text>
                  <Text>Temperature: {this.props.fahr}°F / {this.props.cels}°C</Text>
                  <Text>Humidity: {this.props.humi}%</Text>
                  <Text>Wind speed: {this.props.mile} mph / {this.props.mete} m/s</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('WeatherCard', () => WeatherCard );

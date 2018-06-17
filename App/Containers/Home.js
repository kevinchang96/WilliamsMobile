/**
 * Kevin Chang
 * (c) 12/2017
 *
 * David Ariyibi, Dysron Marshall, William Fung
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup, Card, Header, Icon, List, ListItem, Tile } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Settings from '../Components/Settings';
import DiningMenus from '../Components/DiningMenus';
import WebViewComponent from '../Components/WebViewComponent';
import DiningList from '../Components/DiningList';
import WeatherObj from '../Components/WeatherObj';
import DailyMessages from '../Components/DailyMessages';
import HomeList from '../Components/HomeList';
import HomeHeader from '../Components/HomeHeader'
import styles from '../Utils/Style'

class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='home'
                color={tintColor} />
        ),
    };

    state = {
        index: 0
    }

    updateIndex = (index) => {
        this.setState({index})
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeHeader navigation={this.props.navigation}></HomeHeader>
                <HomeList navigation={this.props.navigation}></HomeList>
            </View>
        );
    }
}

const campusMap = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const dailyMessages = ({navigation}) => ( <DailyMessages navigation={navigation} /> );

const diningMenus = ({navigation}) => ( <DiningMenus navigation={navigation}/> );

const feedback = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const glow = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const ephsports = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const settings = ({navigation}) => ( <Settings screenProps={navigation}/> );

const social = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const weather = ({navigation}) => ( <WeatherObj navigation={navigation}/> );

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: settings },
    DiningMenus: { screen: diningMenus },
    DailyMessages: {screen: dailyMessages },
    Glow: { screen: glow },
    EphSports: { screen: ephsports },
    CampusMap: { screen: campusMap },
    Social: { screen: social },
    Weather: { screen: weather },
    Feedback: { screen: feedback },
},{
    headerMode: 'none',
//    initialRouteName: 'homeScreen'
});

export default RootNavigator;

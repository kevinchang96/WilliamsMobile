/**
 * Kevin Chang
 * (c) 06/2018
 */
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from '../Components/WebViewComponent';

import MyHeader from '../Components/MyHeader';
import styles from '../Styles/Style';
import LinkList from '../Components/LinkList';

class Links extends Component{

    render(){
    const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation} text={"Links"}></MyHeader>
                <LinkList navigation={this.props.navigation}></LinkList>
            </View>
        );
    }
}

const fastFacts = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const sarah = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const ephr = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const campusMap = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const laundryView = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const routeShout = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const brta = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const az = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const courseCatalog = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const ephSports = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const socialMedia = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const LinkNavigator = StackNavigator({
    Home: { screen: Links },
    FastFacts: { screen: fastFacts },
    CampusMap: { screen: campusMap },
    LaundryView: { screen: laundryView },
    RouteShout: { screen: routeShout },
    BRTA: { screen: brta },
    AZ: { screen: az },
    CourseCatalog: { screen: courseCatalog },
    EphSports: { screen: ephSports },
    SocialMedia: { screen: socialMedia },
    Sarah: { screen: sarah },
    Ephr: { screen: ephr },
    },
    { headerMode: 'none' }
);

AppRegistry.registerComponent('Links', () => Links );

export default LinkNavigator;
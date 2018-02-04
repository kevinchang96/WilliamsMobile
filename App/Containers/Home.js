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
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                            underlayColor='#512698'/>
                    }
                    centerComponent={
                        <Image source={require('../Assets/williams2.png')}
                            style={{width: 173, height: 30}} />
                    }
                    rightComponent={
                        <Icon
                            name='settings'
                            color='white'
                            onPress={() => navigate('Settings')}
                            underlayColor='#512698'/>
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                />

                <ScrollView style={styles.scrollContainer}>
                    <Tile
                        imageSrc={require('../Assets/Williams_College_students.jpg')}
                        title="WEATHER"
                        caption="Check the Forecast"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}
                    >
                        <Button
                            rounded
                            icon={{name: 'wb-cloudy'}}
                            onPress={() => navigate('Weather')}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='FORECAST' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/n.jpg')}
                        title="TODAY'S MENU"
                        caption="Daily Dining Needs"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'restaurant'}}
                            backgroundColor='#512698'
                            onPress={() => {this.props.navigation.navigate('DiningList')}}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='DINING' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/schedule_box.png')}
                        title="DAILY MESSAGES"
                        caption="#1 Source of Information"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'line-weight'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('DailyMessages')}
                            title='MORE' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/Screen-Shot.png')}
                        title="SOCIAL WILLIAMS"
                        caption=""
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'share'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('Social', {url: 'https://www.williams.edu/social/', title: 'Social Williams'})}
                            title='LOOK & SHARE' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/Canvas-Mobile-App-Icon.png')}
                        title="GLOW"
                        caption="Because Grades"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'input'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('Glow', {url: 'https://glow.williams.edu/login/ldap', title: 'Glow'})}
                            title='LOGIN' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/colleges-maps.jpg')}
                        title="CAMPUS MAP"
                        caption="Sign Up for Tours!"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'place'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('CampusMap', {url: 'http://map.williams.edu/map/?id=640', title: 'Campus Map'})}
                            title='EXPLORE' />
                    </Tile>

                    <Tile
                        imageSrc={require('../Assets/622053-636434848199382271-16x9.jpg')}
                        title="FEEDBACK"
                        activeOpacity={1}
                        contentContainerStyle={{marginBottom: 20}}>
                        <Button
                            icon={{name: 'edit'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('Feedback', {url: 'https://goo.gl/forms/lxgT7UtuGuYDKr5z2', title: 'Feedback'})}
                            title='GIVE INPUT' />
                    </Tile>
                </ScrollView>
            </View>
        );
    }
}

const campusMap = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const dailyMessages = ({navigation}) => ( <DailyMessages navigation={navigation} /> );

const diningMenus = () => ( <DiningMenus /> );

const feedback = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const glow = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const settings = ({navigation}) => ( <Settings screenProps={navigation}/> );

const social = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const weather = ({navigation}) => ( <WeatherObj navigation={navigation}/> );

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: settings },
    DiningMenus: { screen: diningMenus },
    DailyMessages: {screen: dailyMessages },
    Glow: { screen: glow },
    CampusMap: { screen: campusMap },
    Social: { screen: social },
    Weather: { screen: weather },
    Feedback: { screen: feedback },
},{
    headerMode: 'none',
//    initialRouteName: 'homeScreen'
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE'
    },
    scrollContainer: {
        flex: 1,
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },
    btn: {
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    btnImage: {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    },
    icon: {
        width: 24,
        height: 24,
    }
});

export default RootNavigator;

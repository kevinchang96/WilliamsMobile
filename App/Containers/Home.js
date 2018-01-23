/**
 * Kevin Chang
 * (c) 12/2017
 *
 * David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup, Card, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Settings from '../Components/Settings';
import DiningMenus from '../Components/DiningMenus';
import WebViewComponent from '../Components/WebViewComponent';
import DiningList from '../Components/DiningList';
import WeatherReader from '../Components/WeatherReader';
import EventsHelper from '../Components/EventsHelper';

class HomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='home'
                color='white' />
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

        const diningHoursList = [
           {
             id: '211',
             name: "Whitmans' Marketplace"
           },{
             id: '3',
             name: "Driscoll"
           },{
             id: '5',
             name: "Mission"
           },{
             id: '14',
             name: "Eco Cafe"
           },{
             id: '23',
             name: "Grab n Go"
           },{
             id: '25',
             name: "'82 Grill"
           }
         ]

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                    }
                    centerComponent={
                        <Image source={require('../Assets/williams2.png')}
                            style={{width: 173, height: 30}} />
                    }
                    rightComponent={
                        <Icon
                            name='settings'
                            color='white'
                            onPress={() => navigate('Settings')} />
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}}
                />

                <ScrollView style={styles.scrollContainer}>
                    <Card
                        title='WEATHER'
                        image={require('../Assets/weather-week-report.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current weather stuff.
                        </Text>
                        <Button
                            rounded
                            icon={{name: 'wb-cloudy'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='FORECAST' />
                    </Card>

                    <Card
                        title="TODAY'S MENU"
                        image={require('../Assets/cutlery.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current dining stuff.
                        </Text>
                        <Button
                            icon={{name: 'local-dining'}}
                            backgroundColor='#512698'
                            onPress={() => navigate('DiningList')}
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='DINING' />
                    </Card>

                    <Card
                        title='DAILY MESSAGES'
                        image={require('../Assets/text.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current daily messages stuff.
                        </Text>
                        <Button
                            icon={{name: 'line-weight'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress={() => navigate('EventsHelper')}
                            title='MORE' />
                    </Card>

                    <Card
                        title='HELLO WORLD'
                        image={require('../Assets/williamsldpi.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                            icon={{name: 'code'}}
                            backgroundColor='#512698'
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VIEW NOW' />
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

const settings = () => ( <Settings/> );

const diningMenus = () => ( <DiningMenus /> );

const diningList = () => ( <DiningList /> );

const eventsHelper = () => ( <EventsHelper /> );

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: settings },
    DiningMenus: { screen: diningMenus },
    DiningList: { screen: diningList },
    EventsHelper: {screen: eventsHelper }
},{
    headerMode: 'none',
//    initialRouteName: 'homeScreen'
});

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#DDDDDD', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },
    btn: {
//        position: 'absolute',
//        right: 25,
//        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
//        padding: 15
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
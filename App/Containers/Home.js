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
        const homeList = [
          {
            id: 0,
            image: require('../Assets/RS34677_2014_Mountain_Day_KQ_0138-1024x683.jpg'),
            title: "WEATHER",
            nav: () => navigate('Weather'),
            bicon: {name: 'wb-cloudy'},
            btitle: 'FORECAST',
          },{
            id: 1,
            image: require('../Assets/n.jpg'),
            title: "DINING",
            nav: () => navigate('DiningList'),
            bicon: {name: 'restaurant'},
            btitle: 'DINING',
          },{
            id: 2,
            image: require('../Assets/Williams-College-cancels-.jpg'),
            title: "DAILY MESSAGES",
            nav: () => navigate('DailyMessages'),
            bicon: {name: 'line-weight'},
            btitle: 'MORE',
          },{
            id: 7,
            image: require('../Assets/20170914-155442-EAG-L-WILLIAMSPREVI_08011.jpg'),
            title: "EPH SPORTS",
            nav: () => navigate('EphSports', {url: 'http://ephsports.williams.edu/landing/index', title: 'Eph Sports'}),
            bicon: {name: 'dribble'},
            btitle: 'MORE',
          },{

            id: 4,
            image: require('../Assets/Canvas-Mobile-App-Icon.png'),
            title: "GLOW",
            nav: () => navigate('Glow', {url: 'https://glow.williams.edu/login/ldap', title: 'Glow'}),
            bicon: {name: 'input'},
            btitle: 'LOGIN',
          },{
            id: 5,
            image: require('../Assets/13-hollander.jpg'),
            title: "CAMPUS MAP",
            nav: () => navigate('CampusMap', {url: 'http://map.williams.edu/map/?id=640', title: 'Campus Map'}),
            bicon: {name: 'place'},
            btitle: 'EXPLORE',
          },{
            id: 3,
            image: require('../Assets/Screen-Shot.png'),
            title: "SOCIAL WILLIAMS",
            nav: () => navigate('Social', {url: 'https://www.williams.edu/social/', title: 'Social Williams'}),
            bicon: {name: 'share'},
            btitle: 'TAKE A LOOK',
          },{
            id: 6,
            image: require('../Assets/zlav4ewnj03q4e00.jpg'),
            title: "FEEDBACK",
            nav: () => navigate('Feedback', {url: 'https://goo.gl/forms/lxgT7UtuGuYDKr5z2', title: 'Feedback'}),
            bicon: {name: 'edit'},
            btitle: 'HELP US OUT',
          }
        ]

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
                    <List containerStyle={{marginTop: 0, marginBottom: 0, backgroundColor: "#eeeeee"}}>
                      {
                        homeList.map((l, i) => (
                          <Tile
                              featured
                              imageSrc={l.image}
                              title={l.title}
                              activeOpacity={1}
                              onPress={l.nav}
                              captionStyle={{fontSize: 0}}
                              titleStyle={{fontSize: 30, justifyContent: 'center', alignContents: 'center'}}
                              containerStyle={{height: 200, justifyContent: 'center', alignContents: 'center', marginTop: 5}}
                              contentContainerStyle={{marginBottom: 10}}>

                              <Button
                                  rounded
                                  icon={l.bicon}
                                  onPress={l.nav}
                                  backgroundColor='#512698'
                                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                  title={l.btitle} />
                          </Tile>
                        ))
                      }
                    </List>
                </ScrollView>
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

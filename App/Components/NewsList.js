/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';
import DailyMessages from './DailyMessages';

class NewsList extends Component{
    render() {
        const { navigate } = this.props.navigation;

        const dmList = [
          {
            name: "Daily Messages",
            screen: 'DM',
            icon: require('../Assets/paper_plane.png')
          }
        ]

        const eventsList = [
          {
            url: 'https://events.williams.edu/',
            name: "Williams Events Page",
            screen: 'Events',
            icon: require('../Assets/0f7109a.png')
          }
        ]

        const newsList = [
          {
            url: 'http://williamsrecord.com/',
            name: "Williams Record",
            screen: 'Record',
            icon: require('../Assets/record_logo.png')
          },{
            url: 'http://williamsalternative.com/',
            name: "Williams Alternative",
            screen: 'Alternative',
            icon: require('../Assets/wa_logo2.png')
          },{
            url: 'http://www.berkshireeagle.com/',
            name: "Berkshire Eagle",
            screen: 'Eagle',
            icon: require('../Assets/berkshireeagle.jpg')
          }
        ]

        return(
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => this.props.navigation.navigate('DrawerToggle')}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{ text: 'Events & News', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}} />

                <ScrollView style={styles.scrollContainer}>
                    <List containerStyle={{marginTop: 10, marginBottom: 10}}>
                      {
                        dmList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            onPress={() => navigate(l.screen)}
                          />
                        ))
                      }
                    </List>

                    <List containerStyle={{marginTop: 0, marginBottom: 10}}>
                      {
                        eventsList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            rightIcon={{name: 'open-in-browser'}}
                            onPress={() => {console.log(l.screen);navigate(l.screen,{url: l.url, title: l.name})} }
                          />
                        ))
                      }
                    </List>

                    <List containerStyle={{marginTop: 0, marginBottom: 10}}>
                      {
                        newsList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            rightIcon={{name: 'open-in-browser'}}
                            onPress={() => {console.log(l.screen);navigate(l.screen,{url: l.url, title: l.name})} }
                          />
                        ))
                      }
                    </List>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#512698', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },
});

const dm = ({navigation}) => ( <DailyMessages navigation={navigation}/> );

const events = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const record = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const alternative = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const eagle = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );


const NewsNavigator = StackNavigator({
    Home: { screen: NewsList },
    Record: { screen: record },
    Alternative: { screen: alternative },
    Events: { screen: events },
    Eagle: { screen: eagle },
    DM: { screen: dm },
  },{ headerMode: 'none' }
);

AppRegistry.registerComponent('NewsList', () => NewsList );

export default NewsNavigator;
/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';

class LinkList extends Component{
    static navigationOptions = {
        drawerLabel: 'Links',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='link'
                color='white' />
        ),
    };

    render() {
        const { navigate } = this.props.navigation;
        const resourceList = [
            {
                id: '55',
                name: "Campus Map",
                screen: 'CampusMap',
                url: 'http://map.williams.edu/map/?id=640',
                icon: <Icon name='map' />
            },{
                id: '56',
                name: "Laundry View",
                screen: 'LaundryView',
                url: 'http://m.laundryview.com/lvs.php',
                icon: <Icon name='local-laundry-service' />
            },{
                id: '57',
                name: "Route Shout",
                screen: 'RouteShout',
                url: 'http://m.routeshout.com/',
                icon: <Icon name='directions-bus' />
            },{
                id: '58',
                name: "BRTA Routes",
                screen: 'BRTA',
                url: 'http://brta.routematch.com:52079/portal/fr2/index.jsf',
                icon: <Icon name='directions' />
            },{
                id: '59',
                name: "A-Z Directories",
                screen: 'AZ',
                url: 'https://www.williams.edu/a-z/',
                icon: <Icon name='apps' />
            },{
                id: '60',
                name: "Course Catalog",
                screen: 'CourseCatalog',
                url: 'https://catalog.williams.edu/',
                icon: <Icon name='import-contacts' />
            },{
                id: '61',
                name: "Eph Sports",
                screen: 'EphSports',
                url: 'https://ephsports.williams.edu/',
                icon: <Icon name='fitness-center' />
            }
        ]

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => this.props.navigation.navigate('DrawerToggle')}
                        />
                    }
                    centerComponent={
                        <Image
                            source={require('../Assets/williams2.png')}
                            style={{width: 173, height: 30}}
                        />
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                <Header
                    centerComponent={{ text: 'Links', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                <ScrollView style={styles.scrollContainer}>
                    <List containerStyle={{marginBottom: 10}}>
                      {
                        resourceList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            onPress={() => {console.log(l.screen);navigate(l.screen,{url: l.url})} }
                          />
                        ))
                      }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const campusMap = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const laundryView = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const routeShout = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const brta = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const az = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const courseCatalog = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const ephSports = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const LinkNavigator = StackNavigator({
    Home: { screen: LinkList },
    CampusMap: { screen: campusMap },
    LaundryView: { screen: laundryView },
    RouteShout: { screen: routeShout },
    BRTA: { screen: brta },
    AZ: { screen: az },
    CourseCatalog: { screen: courseCatalog },
    EphSports: { screen: ephSports }
    },
    { headerMode: 'none' }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
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
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }
});

AppRegistry.registerComponent( 'LinkList', () => LinkList );

export default LinkNavigator;
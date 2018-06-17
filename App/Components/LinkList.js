/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, ScrollView, View } from 'react-native';
import { Avatar, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';
import styles from '../Utils/Style';

export default class LinkList extends Component{
    render() {
        const { navigate } = this.props.navigation;
        const resourceList = [
            {
                id: '53',
                name: "Fast Facts",
                screen: 'FastFacts',
                url: 'https://communications.williams.edu/media-relations/fast-facts/',
                icon: <Icon name='lightbulb-outline' />
            },{
                id: '54',
                name: "Social Media Directory",
                screen: 'SocialMedia',
                url: 'https://communications.williams.edu/social-media-directory/',
                icon: <Icon name='share' />
            },{
                id: '52',
                name: "Student Academic Records",
                screen: 'Sarah',
                url: 'https://sarah.williams.edu/',
                icon: <Icon name='folder-open' />
            },{
                id: '51',
                name: "Human Resources",
                screen: 'Ephr',
                url: 'http://ephr.williams.edu/',
                icon: <Icon name='supervisor-account' />
            },{
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
                <ScrollView style={styles.scrollContainer}>
                    <List containerStyle={{marginTop: 10, marginBottom: 0}}>
                      {
                        resourceList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            rightIcon={{name: 'open-in-browser'}}
                            onPress={() => {navigate(l.screen,{url: l.url, title: l.name})} }
                          />
                        ))
                      }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

AppRegistry.registerComponent( 'LinkList', () => LinkList );
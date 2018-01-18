import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';

class LinkList extends Component{
    render() {
        const { navigate } = this.props.navigation;
        const resourceList = [
            {
              id: '55',
              name: "Campus Map",
              screen: 'campusMap',
              url: 'http://map.williams.edu/map/?id=640'
            },{
              id: '56',
              name: "LaundryView",
              screen: 'laundryView',
              url: 'http://m.laundryview.com/lvs.php'
            },{
              id: '57',
              name: "RouteShout",
              screen: 'routeShout',
              url: 'http://m.routeshout.com/'
            },{
              id: '58',
              name: "BRTA Routes",
              screen: 'brta',
              url: 'http://brta.routematch.com:52079/portal/fr2/index.jsf'
            },{
              id: '59',
              name: "A-Z Directories",
              screen: 'az',
              url: 'https://www.williams.edu/a-z/'
            },{
              id: '60',
              name: "Course Catalog",
              screen: 'courseCatalog',
              url: 'https://catalog.williams.edu/'
            }
        ]

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Header
                        centerComponent={
                            <Image source={require('../Assets/williams2.png')}
                            style={{width: 173, height: 30}} />
                        }
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                    <Header
                        centerComponent={{ text: 'Links', style: { fontSize: 22, color: '#ffffff' } }}
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                    <List containerStyle={{marginBottom: 10}}>
                      {
                        resourceList.map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.name}
                            onPress={() => {navigate(l.screen,{url: l.url})} }
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

const LinkNavigator = StackNavigator({
    Home: { screen: LinkList },
    CampusMap: { screen: campusMap },
    LaundryView: { screen: laundryView },
    RouteShout: { screen: routeShout },
    BRTA: { screen: brta },
    AZ: { screen: az },
    CourseCatalog: { screen: courseCatalog }
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

export default LinkNavigator;
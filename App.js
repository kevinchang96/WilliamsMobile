/**
 * David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import { Card, Button, Header, Icon, List, ListItem } from 'react-native-elements';


import LinkList from './App/Components/LinkList';
import NewsList from './App/Components/NewsList';
import HomeScreen from './App/Containers/Home';
import WSO from './App/Components/WSO';
import Emergency from './App/Components/Emergency';
import About from './App/Components/About';
import DiningList from './App/Components/DiningList';

const drawers = DrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    color={tintColor} />
            ),
        }),
    },
    DiningList: {
        screen: DiningList,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Dining',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='restaurant'
                    color={tintColor} />
            ),
        })
    },
    NewsList: {
        screen: NewsList,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Events & News',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='today'
                    color={tintColor} />
            ),
        })
    },
    WSO: {
        screen: WSO,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'WSO',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='language'
                    color={tintColor} />
            ),
        })
    },
    LinkList: {
        screen: LinkList,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Links',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='link'
                    color={tintColor} />
            ),
        })
    },
    Emergency: {
        screen: Emergency,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Emergency Numbers',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='warning'
                    color={tintColor} />
            ),
        })
    },
},{
    initialRouteName: 'HomeScreen',
    drawerPosition: 'left',
    drawerBackgroundColor: '#512698',
    contentOptions: {
        activeTintColor: '#ffcc33',
        inactiveTintColor: 'white',
        itemsContainerStyle: {
            marginVertical: 0,
        },
        iconContainerStyle: { opacity: 1 }
    },

});

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
    },
    icon: {
        width: 24,
        height: 24,
    }
});

export default drawers;


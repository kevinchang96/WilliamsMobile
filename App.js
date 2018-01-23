/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerNavigator, TabNavigator, } from 'react-navigation';

import LinkList from './App/Components/LinkList';
import NewsList from './App/Components/NewsList';
import HomeScreen from './App/Containers/Home';
import WSO from './App/Components/WSO';
import Emergency from './App/Components/Emergency';

const drawers = DrawerNavigator({
    HomeScreen: { screen: HomeScreen },
    NewsList: { screen: NewsList },
    WSO: { screen: WSO },
    LinkList: { screen: LinkList },
    Emergency: { screen: Emergency },
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


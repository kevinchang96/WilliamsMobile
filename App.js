/**
 * David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerItems, DrawerNavigator, SafeAreaView, TabNavigator } from 'react-navigation';
import { Avatar, Card, Button, Header, Icon, List, ListItem, Tile } from 'react-native-elements';

import LinkList from './App/Components/LinkList';
import NewsList from './App/Components/NewsList';
import HomeScreen from './App/Containers/Home';
import WSO from './App/Components/WSO';
import Emergency from './App/Components/Emergency';
import About from './App/Components/About';
import DiningList from './App/Components/DiningList';

const CustomComponents = (props) => (
  <ScrollView style={styles.container}>
    <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginTop: 20, marginBottom: 10}}>
      <Avatar
        large
        rounded
        source={{uri: "https://wso.williams.edu/pic/kc13"}}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        containerStyle={{marginRight: 10}}
      />

      <View style={{flex: 1, flexDirection: 'column', marginTop: 5}}>
        <Text style={styles.text}>Ephraim Williams</Text>
        <Text style={styles.subText}>ew18</Text>
      </View>
    </View>

    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

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
    contentComponent: CustomComponents,
    headerMode: 'float',
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
        flex: 1,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subText: {
        color: 'white',
        fontSize: 16
    }
});
console.disableYellowBox = true
export default drawers;


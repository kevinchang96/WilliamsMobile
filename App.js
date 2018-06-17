/**
 * David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

 /**
  * Kevin Chang
  * (c) 06/2018
  */

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerItems, DrawerNavigator, SafeAreaView, TabNavigator } from 'react-navigation';
import { Avatar, Card, Button, Header, Icon, List, ListItem, Tile } from 'react-native-elements';

import LinkList from './App/Containers/Links';
import NewsList from './App/Components/NewsList';
import HomeScreen from './App/Containers/Home';
import WSO from './App/Components/WSO';
import Emergency from './App/Containers/Emergency';
import About from './App/Components/About';
import DiningList from './App/Containers/Dining';

retrieveFromStorage = async(value) => {
    try {
        const val = await AsyncStorage.getItem(value);
        if(val) return val;
        return null;
    }
    catch (error) {console.log(error)}
}
const unix = retrieveFromStorage('unix');
const username = retrieveFromStorage('username');

const CustomComponents = (props) => (
  <ScrollView style={styles.container}>
    <ImageBackground style={styles.backgroundImage}
        source={require('./App/Assets/800px_COLOURBOX19515073_.png')}>
        <View style={styles.profile}>
          <Avatar
            large
            rounded
            source={{uri:'https://wso.williams.edu/pic/' + unix._55}}
            onPress={() => console.log(unix._55)}
            activeOpacity={0.7}
            containerStyle={{marginRight: 10}} />

          {/*<View style={{flex: 1, flexDirection: 'column', marginTop: 25}}>
            <Text style={styles.text}>{unix._55}</Text>
          </View>*/}
        </View>
    </ImageBackground>

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
        itemsContainerStyle: { marginVertical: 0 },
        iconContainerStyle: { opacity: 1 }
    },

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
//        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        marginLeft: 10,
        color: 'white',
        fontSize: 22,
        fontWeight: 'normal',
        textShadowColor: '#aaaaaa',
        textShadowRadius: 20,
    },
    backgroundImage: {
        flex: 1,
        //resizeMode: 'cover', // or 'stretch'
    }
});
console.disableYellowBox = true
export default drawers;

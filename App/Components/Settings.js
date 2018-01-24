/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import About from './About';
import Login from './Login';
import Logout from './Logout';

class Settings extends Component{
    render(){
        const { navigate } = this.props.navigation;

        const settingsList = [
            {
                name: 'About App',
                screen: 'About',
                icon: <Icon name='info' />
            },{
                name: 'Log In',
                screen: 'Login',
                icon: <Icon name='check' />
            },{
                name: 'Log Out',
                screen: 'Logout',
                icon: <Icon name='close' />
            }
        ]

        return(
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()} />
                    }
                    centerComponent={{ text: 'Settings', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', padding: 10, height: 55}} />

                <List containerStyle={{marginTop: 10}}>
                  {
                    settingsList.map((l, i) => (
                      <ListItem
                        key={i}
                        avatar={l.icon}
                        title={l.name}
                        onPress={() => navigate(l.screen)}
                      />
                    ))
                  }
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
//        justifyContent: 'center',
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
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }

});

const about = () => ( <About /> );

const login = () => ( <Login /> );

const logout = () => ( <Logout /> );

const SettingsNavigator = StackNavigator({
    Home: { screen: Settings },
    About: { screen: about },
    Login: { screen: login },
    Logout: { screen: logout },
},{
    headerMode: 'none',
});

export default SettingsNavigator;
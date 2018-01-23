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
                name: 'Log In',
                screen: 'Login',
            },{
                name: 'Log Out',
                screen: 'Logout',
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
                    centerComponent={
                        <Image source={require('../Assets/williams2.png')}
                        style={{width: 173, height: 30}} />
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                <Header
                    centerComponent={{ text: 'Settings', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                <List containerStyle={{marginBottom: 20}}>
                  {
                    settingsList.map((l, i) => (
                      <ListItem
                        key={i}
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
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
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

const login = () => ( <Login /> );

const logout = () => ( <Logout /> );

const SettingsNavigator = StackNavigator({
    Home: { screen: Settings },
    Login: { screen: login },
    Logout: { screen: logout },
},{
    headerMode: 'none',
});

export default SettingsNavigator;
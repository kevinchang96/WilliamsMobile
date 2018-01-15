/**
 * Kevin Chang
 * (c) 2017
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, Button} from 'react-native';
import Login from './App/Components/Login';
import Logout from './App/Components/Logout'
import Settings from './App/Components/Settings';
import FactrakSearch from './App/Components/FactrakSearch';
import SuggestionCard from './App/Components/SuggestionCard';
import FactrakCommentWindow from './App/Components/FactrakCommentWindow';
import {StackNavigator} from 'react-navigation';


class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Welcome',
    });

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
        <Button
            title="Go to Login"
            onPress={() => navigate('Login')}
        />
        <Button
            title="Go to Logout"
            onPress={() => navigate('Logout')}
        />
        <Button
            title="Go to Factrak"
            onPress={() => navigate('Factrak')}
        />
        </View>
    );
  }
}

const login = () => (
    <Login />
);

const logout = () => (
    <Logout />
);

const factrak = ({navigation}) => (
    <FactrakSearch comments={(html) => navigation.navigate('FactrakCommentWindow',{html:html})}/>
);

const factrakCommentWindow = ({navigation}) => (
    <FactrakCommentWindow navigation={navigation}/>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login:{
    screen: login,
  },
  Logout: {
    screen: logout,
  },
  Factrak: {
    screen: factrak
  },
  FactrakCommentWindow: {
    screen: factrakCommentWindow,
  }

});

export default RootNavigator;

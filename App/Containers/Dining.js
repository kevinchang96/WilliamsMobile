/**
 * Kevin Chang
 * (c) 06/2018
 */

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import WebViewComponent from '../Components/WebViewComponent';
import DiningMenus from '../Components/DiningMenus';
import ItemCalculator from '../Components/ItemCalculator';
import GrillMenu from '../Components/GrillMenu';

import MyHeader from '../Components/MyHeader';
import DiningList from '../Components/DiningList';
import styles from '../Utils/Style';


class Dining extends Component{
    render() {
        return(
            <View style={styles.container}>
                <MyHeader navigation={this.props.navigation} text={"Dining List"}></MyHeader>
                <DiningList navigation={this.props.navigation}></DiningList>
           </View>
        );
    }
}

const webViewPost = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const itemCalculator = ({navigation}) => ( <ItemCalculator navigation={navigation}/> );

const diningMenus = ({navigation}) => ( <DiningMenus navigation={navigation}/> );

const grillMenu = ({navigation}) => ( <GrillMenu navigation={navigation}/> );

const DiningNavigator = StackNavigator({
    Home: { screen: Dining },
    DiningMenus: { screen: diningMenus },
    WebViewPost: { screen: webViewPost },
    ItemCalculator: { screen: itemCalculator },
    GrillMenu: { screen: grillMenu }
  },
    { headerMode: 'none' }
);

AppRegistry.registerComponent('Dining', () => Dining );

export default DiningNavigator;
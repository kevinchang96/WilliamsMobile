/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import WebViewComponent from './WebViewComponent';
import DiningMenus from './DiningMenus';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import ItemCalculator from './ItemCalculator';
import GrillMenu from '../Components/GrillMenu';

class DiningList extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
         const diningHallList = [
           {
             id: '208',
             name: "Whitmans' Marketplace",
             screen: 'DiningMenus',
             icon: <Icon name='local-dining' />,
           },{
             id: '27',
             name: "Driscoll",
             screen: 'DiningMenus',
             icon: <Icon name='local-dining' />,
           },{
             id: '29',
             name: "Mission",
             screen: 'DiningMenus',
             icon: <Icon name='local-dining' />,
           },{
             id: '38',
             name: "Eco Cafe",
             screen: 'DiningMenus',
             icon: <Icon name='directions-run' />
           },{
             id: '209',
             name: "Grab & Go",
             screen: 'DiningMenus',
             icon: <Icon name='directions-run' />
           }
         ]

         const otherHallList = [
           {
             id: '25',
             name: "'82 Grill",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S25&date=today',
             screen: 'GrillMenu',
             icon: <Icon name='local-pizza' />
           }
         ]

         const snackBarList = [
           {
             id: '24',
             name: "Lee Snack Bar Calculator",
             url: 'https://dining.williams.edu/lee-after-dark/',
             screen: "ItemCalculator",
             flag: true
           },{
             id: '221',
             name: "Whitmans' Late Night Calculator",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S221&date=today',
             screen: "ItemCalculator",
             flag: false
           }
         ]

         const getAppList = [
           {
             name: "GET Website",
             url: 'https://get.cbord.com/williamscollege/full/prelogin.php',
             screen: 'WebViewPost',
           }
         ]

         return(
             <View style={styles.container}>
                  <Header
                      leftComponent={
                          <Icon
                              name='menu'
                              color='white'
                              onPress={() => this.props.navigation.navigate('DrawerToggle')}
                              underlayColor='#512698'/>
                      }
                      centerComponent={{ text: 'Dining', style: { fontSize: 22, color: '#ffffff' } }}
                      outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                      underlayColor='#512698'/>

                 <ScrollView style={styles.scrollContainer}>
                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         diningHallList.map((l, i) => (
                           <ListItem
                             avatar={l.icon}
                             key={i}
                             title={l.name}
                             onPress={() => {navigate(l.screen, {id: l.id, title: l.name})} }
                           />
                         ))
                       }
                     </List>

                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         otherHallList.map((l, i) => (
                           <ListItem
                             avatar={l.icon}
                             key={i}
                             title={l.name}
                             onPress={() => navigate(l.screen)}
                           />
                         ))
                       }
                     </List>

                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         snackBarList.map((l, i) => (
                           <ListItem
                             avatar={<Icon name='monetization-on' />}
                             key={i}
                             title={l.name}
                             onPress={() => navigate(l.screen,{flag: l.flag})}
                           />
                         ))
                       }
                     </List>

                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                        {
                          getAppList.map((l, i) => (
                            <ListItem
                              avatar={
                                <Image
                                    source={require('../Assets/getlogo-150x150.png')}
                                    style={{width: 24, height: 24}}
                                />
                              }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
//        justifyContent: 'center',
        backgroundColor: '#EEEEEE' //'#DCD0FE',
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

const webViewPost = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const itemCalculator = ({navigation}) => ( <ItemCalculator navigation={navigation}/> );

const diningMenus = ({navigation}) => ( <DiningMenus navigation={navigation}/> );

const grillMenu = ({navigation}) => ( <GrillMenu navigation={navigation}/> );

const DiningNavigator = StackNavigator({
    Home: { screen: DiningList },
    DiningMenus: { screen: diningMenus },
    WebViewPost: { screen: webViewPost },
    ItemCalculator: { screen: itemCalculator },
    GrillMenu: { screen: grillMenu }
  },
    { headerMode: 'none' }
);

export default DiningNavigator;

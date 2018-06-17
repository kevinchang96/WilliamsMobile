/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, ScrollView, View } from 'react-native';
import { Avatar, Icon, List, ListItem } from 'react-native-elements';

import MyHeader from '../Components/MyHeader';
import styles from '../Utils/Style';

export default class DiningList extends Component{
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

AppRegistry.registerComponent('DiningList', () => DiningList );
/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import WebViewComponent from './WebViewComponent';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import ItemCalculator from './ItemCalculator';

class DiningList extends Component{
    constructor(props){
        super(props);
    }

    render() {
    const { navigate } = this.props.navigation;
         const diningHallList = [
           {
             id: '211',
             name: "Whitmans' Marketplace",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S211&date=today',
             screen: 'WebViewPost',
           },{
             id: '3',
             name: "Driscoll",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S3&date=today',
             screen: 'WebViewPost',
           },{
             id: '5',
             name: "Mission",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S5&date=today',
             screen: 'WebViewPost',
           },{
             id: '14',
             name: "Eco Cafe",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S14&date=today',
             screen: 'WebViewPost',
           },{
             id: '23',
             name: "Grab n Go",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S23&date=today',
             screen: 'WebViewPost',
           },{
             id: '25',
             name: "'82 Grill",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S25&date=today',
             screen: 'WebViewPost',
           }
         ]

         const snackBarList = [
           {
             id: '24',
             name: "Lee Snack Bar Calculator",
             url: 'https://dining.williams.edu/lee-after-dark/',
             screen: "ItemCalculator",
           },{
             id: '221',
             name: "Whitmans' Late Night Calculator",
             url: 'http://nutrition.williams.edu/NetNutrition/Home.aspx?unit=S221&date=today',
             screen: "ItemCalculator",
           }
         ]

         const getAppList = [
           {
             name: "GET Website",
             url: 'https://idp.williams.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1',
             screen: 'WebViewPost',
           }
         ]

         return(
             <View style={styles.container}>
             {console.log(this)}
                  <Header
                      leftComponent={
                          <Icon
                              name='menu'
                              color='white'
                              onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                      }
                      centerComponent={{ text: 'Dining', style: { fontSize: 22, color: '#ffffff' } }}
                      outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                  />

                 <ScrollView style={styles.scrollContainer}>
                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         diningHallList.map((l, i) => (
                           <ListItem
                             avatar={<Icon name='local-dining' />}
                             key={i}
                             title={l.name}
                             onPress={() => {navigate(l.screen,{url: l.url})} }
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
                             onPress={() => navigate(l.screen)}
                           />
                         ))
                       }
                     </List>

                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                        {
                          getAppList.map((l, i) => (
                            <ListItem
                              avatar={<Image
                                          source={require('../Assets/getlogo-150x150.png')}
                                          style={{width: 24, height: 24}} />
                                     }
                              key={i}
                              title={l.name}
                              rightIcon={{name: 'launch'}}
                              onPress={() => {navigate(l.screen,{url: l.url})} }
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

const itemCalculator = () => ( <ItemCalculator /> );

const DiningNavigator = StackNavigator({
    Home: { screen: DiningList },
    WebViewPost: { screen: webViewPost },
    ItemCalculator: { screen: itemCalculator }
  },
    { headerMode: 'none' }
);

export default DiningNavigator;
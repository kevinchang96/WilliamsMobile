/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';

export default class DiningList extends Component{
    render() {
         const diningHallList = [
           {
             id: '211',
             name: "Whitmans' Marketplace"
           },{
             id: '3',
             name: "Driscoll"
           },{
             id: '5',
             name: "Mission"
           },{
             id: '14',
             name: "Eco Cafe"
           },{
             id: '23',
             name: "Grab n Go"
           },{
             id: '25',
             name: "'82 Grill"
           }
         ]

         const snackBarList = [
           {
             id: '24',
             name: "Lee Snack Bar Calculator"
           },{
             id: '221',
             name: "Whitmans' Late Night Calculator"
           }
         ]

         const getAppList = [
           {
             name: "GET Website",
             url: 'https://get.cbord.com/williamscollege/full/prelogin.php'
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
                     centerComponent={{ text: 'Dining', style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                 <ScrollView style={styles.scrollContainer}>
                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         diningHallList.map((l, i) => (
                           <ListItem
                             avatar={<Icon name='local-dining' />}
                             key={i}
                             title={l.name}
                           />
                         ))
                       }
                     </List>

                     <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                       {
                         snackBarList.map((l, i) => (
                           <ListItem
                             avatar={<Icon name='exposure' />}
                             key={i}
                             title={l.name}
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

AppRegistry.registerComponent('DiningList', () => DiningList );
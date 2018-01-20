/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';

export default class Emergency extends Component{
    static navigationOptions = {
        drawerLabel: 'Emergency Numbers',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='warning'
                color='white' />
        ),
    };

    render() {
         return(
             <View style={styles.container}>
                 <Header
                     leftComponent={
                         <Icon
                             name='menu'
                             color='white'
                             onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                     }
                     centerComponent={
                         <Image source={require('../Assets/williams2.png')}
                         style={{width: 173, height: 30}} />
                     }
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                 <Header
                     centerComponent={{ text: 'Emergency Numbers', style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                 <ScrollView style={styles.scrollContainer}>
                     <Text>
                         Fill with hard-coded numbers or Webview to https://www.williams.edu/mobile-content/emergency-numbers/
                     </Text>
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

AppRegistry.registerComponent('Emergency', () => Emergency );
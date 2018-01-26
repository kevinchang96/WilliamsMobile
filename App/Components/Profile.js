/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

export default class Profile extends Component{
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='info'
                color='white' />
        ),
    };

    render() {
        const infoList = [
            {
              title: 'App Version',
              sub: '0.2.0'
            }
        ]

        const workerList = [
            {
              name: 'David Ariyibi',
              role: 'Co-leader/Lead Front-End Engineer',
              pic: ''
            },{
              name: 'Kevin Chang',
              role: 'Co-leader/Lead Back-End Engineer',
              pic: ''
            },{
              name: 'William Fung',
              role: 'Mobile Engineer - Forecast',
              pic: ''
            },{
              name: 'Dysron Marshall',
              role: 'Mobile Engineer - Factrack',
              pic: ''
            },{
              name: 'Grace Mazzarella',
              role: 'Mobile Engineer - Weather',
              pic: ''
            },{
              name: 'Alex Taylor',
              role: 'Mobile Engineer - Facebook',
              pic: ''
            },{
              name: 'Nambi Williams',
              role: 'Mobile Engineer - Daily Messages',
              pic: ''
            },{
              name: 'Professor Jeannie Albrecht',
              role: 'Advisor',
              pic: ''
            }
        ]

        return(
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={
                        <Image source={require('../Assets/williams2.png')}
                        style={{width: 173, height: 30}} />
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45, marginBottom: 20}} />

                <ScrollView style={styles.scrollContainer}>\
                    <List containerStyle={{ marginTop: 0, marginBottom: 10 }}>
                      {
                        infoList.map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.title}
                            subtitle={l.sub}

                          />
                        ))
                      }
                    </List>

                    <List containerStyle={{ marginTop: 0, marginBottom: 10 }}>
                      {
                        workerList.map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.role}
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
    headerTextRed: {
        color: 'red',
        fontSize: 22,
        textAlign: 'center',
    },
    headerTextBlack: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    },
    text: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});
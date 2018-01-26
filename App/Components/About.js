/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

export default class About extends Component{
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='info'
                color={tintColor} />
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
            },{
              name: 'Kevin Chang',
              role: 'Co-leader/Lead Back-End Engineer',
            },{
              name: 'William Fung',
              role: 'Mobile Engineer',
            },{
              name: 'Dysron Marshall',
              role: 'Mobile Engineer',
            },{
              name: 'Grace Mazzarella',
              role: 'Mobile Engineer',
            },{
              name: 'Alex Taylor',
              role: 'Mobile Engineer',
            },{
              name: 'Nambi Williams',
              role: 'Mobile Engineer',
            },{
              name: 'Professor Jeannie Albrecht',
              role: 'Advisor',
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
                    centerComponent={{ text: 'About', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55, marginBottom: 0}} />

                <ScrollView style={styles.scrollContainer}>
                    <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
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

                    <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
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
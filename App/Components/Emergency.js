/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, Icon, List, ListItem } from 'react-native-elements';

export default class Emergency extends Component{
    static navigationOptions = {
        drawerLabel: 'Emergency Numbers',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='warning'
                color={tintColor} />
        ),
    };

    _call = ( phone ) => {
        Linking.openURL( phone ).catch(err => console.error('An error occurred', err))
    }

    render() {
        const emergencyList = [
            {
              name: "Police, Ambulance, Fire",
              number: '413-458-5646',
              phone: 'tel:4134585646'
            },{
              name: "Campus Safety & Security: Emergency",
              number: '413-597-3551',
              phone: 'tel:4135973551'
            },{
              name: "Campus Safety & Security: Non-Emergency",
              number: '413-597-4444',
              phone: 'tel:4135974444'
            },{
              name: "RASAN - Rape & Sexual Assault Network",
              number: '413-597-4100',
              phone: 'tel:4135974100'
            },{
              name: "Student Escort Service",
              number: '413-597-4400',
              phone: 'tel:4135974400'
            }
        ]
        return(
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                    }
                    centerComponent={{ text: 'Emergency Numbers', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45, marginBottom: 10}} />

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.text}>
                        Call these numbers to save a life, report a fire, or stop a crime.
                    </Text>

                    <List containerStyle={{ marginTop: 0, marginBottom: 0 }}>
                      {
                        emergencyList.map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.number}
                            rightIcon={{name: 'call'}}
                            onPress={() => {this._call( l.phone )} }
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
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
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

AppRegistry.registerComponent('Emergency', () => Emergency );
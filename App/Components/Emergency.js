/**
 * David Ariyibi, Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import styles from '../Utils/Style';
import EmergencyNumbers from '../Components/EmergencyNumbers';

export default class Emergency extends Component{
    _call = ( phone ) => {
        Linking.openURL( phone ).catch(err => console.error('An error occurred', err))
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.text}>
                        Call these numbers to save a life, report a fire, or stop a crime.
                    </Text>

                    <List containerStyle={{ marginTop: 0, marginBottom: 0 }}>
                      {
                        EmergencyNumbers.map((l, i) => (
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

AppRegistry.registerComponent('Emergency', () => Emergency );
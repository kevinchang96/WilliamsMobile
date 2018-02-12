/**
 * Alex Taylor
 * (c) 01/2018
 *
 * David Ariyibi
 * (c) 02/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

export default class StudentPage extends Component{

    render(){
        return(
            <Card flexDirection='row'>
                <Image source={{uri: this.props.img}} style={{height: 120, width: 120, marginRight: 10}}/>
                <View>
                    <Text style={styles.nameText}>{this.props.name}</Text>

                    <Text style={styles.subText}>Unix</Text>
                    <Text>{this.props.unix}</Text>

                    <Text style={styles.subText}>SU Box</Text>
                    <Text>{this.props.suBox}</Text>

                    <Text style={styles.subText}>Room</Text>
                    <Text>{this.props.room}</Text>

                    <Text style={styles.subText}>Hometown</Text>
                    <Text>{this.props.homeTown}</Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create(
{
    nameText:{
        color: '#512698',
        fontSize: 14
    },
    subText:{
        color: 'grey',
        fontSize: 12,
        marginTop: 5
    }
});

AppRegistry.registerComponent('StudentPage', () => StudentPage );
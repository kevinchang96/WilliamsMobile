/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, PixelRatio, Dimensions, Animated } from 'react-native';
import { Button, ButtonGroup, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DiningMenus extends Component {

    constructor(){
        super()
        this.state = { breakfastArray: [], brunchArray: [], lunchArray: [], dinnerArray: [], mealArray: [] }
    }

    componentDidMount(){
        this._getMeal();
    }

    _getMeal = () => {
        var data = 'https://dining.williams.edu/wp-json/dining/service_units/'
        fetch( data+'27',
        { method: 'GET' })
        .then( (res) => res.json())
        .then( (responseJson) => {
            this._parseArray(responseJson);
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
        });
    }

    _parseArray = (data) => {
        var array0 = [], array1 = [], array2 = [], array3 = [];
        data.map( (l, i) => {
            switch( l.meal ){
                case "BREAKFAST":   array0.push( <ListItem
                                                     key={i}
                                                     title={l.formal_name}
                                                     hideChevron={true}
                                                    /> );
                                    //console.log("Item: " + l.formal_name);
                                    break;
                case "BRUNCH":      array1.push( <ListItem
                                                     key={i}
                                                     title={l.formal_name}
                                                     hideChevron={true}
                                                    /> );
                                    //console.log("Item: " + l.formal_name);
                                    break;
                case "LUNCH":       array2.push( <ListItem
                                                     key={i}
                                                     title={l.formal_name}
                                                     hideChevron={true}
                                                    /> );
                                    //console.log("Item: " + l.formal_name);
                                    break;
                case "DINNER":      array3.push( <ListItem
                                                     key={i}
                                                     title={l.formal_name}
                                                     hideChevron={true}
                                                    /> );
                                    //console.log("Item: " + l.formal_name);
                                    break;
            }
        });
        this.setState({breakfastArray: array0, lunchArray: array2, dinnerArray: array3 });
    }

    render() {
        return (
        <View paddingTop={10}>
            <ScrollView>
                <ListItem
                    key={0}
                    title={'Breakfast'}
                    hideChevron={true}
                    />
                <List containerStyle={{ marginTop: 0, marginBottom: 5 }}>
                   { this.state.breakfastArray }
                 </List>
                 <ListItem
                     key={1}
                     title={'Lunch'}
                     hideChevron={true}
                 />
                <List containerStyle={{ marginTop: 0, marginBottom: 5 }}>
                   { this.state.lunchArray }
                 </List>
                 <ListItem
                      key={2}
                      title={'Dinner'}
                      hideChevron={true}
                  />
                  <List containerStyle={{ marginTop: 0, marginBottom: 5 }}>
                     { this.state.dinnerArray }
                   </List>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    viewHolder:
    {
        height: 55,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },

    text:
    {
        color: 'white',
        fontSize: 25
    }
});

AppRegistry.registerComponent('DiningMenus', () => DiningMenus );
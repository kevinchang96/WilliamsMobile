/**
 * Kevin Chang, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, PixelRatio, Dimensions, Animated } from 'react-native';
import { Button, Card, Header, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DiningMenus extends Component {

    constructor(){
        super()
        this.state = {
            mealArray: [],
            cardArray: [],
            stateIndex: 0,
            titleArray: [],
        }
    }

    componentDidMount(){
        this._getMeal();
    }

    _getMeal = () => {
        var data = 'https://dining.williams.edu/wp-json/dining/service_units/'
        fetch( data + this.props.navigation.state.params.id,
        { method: 'GET' })
        .then( (res) => res.json())
        .then( (responseJson) => {
            this._parseArray(responseJson);
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
        });
    }

    _groupBy = (arr, property) => {
        return arr.reduce(function(memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }

    _parseArray = (data) => {
        var meals = this._groupBy(data, "meal");
        var titles = [];
        var cards = [];
        var temp = [];

        for (var meal in meals) {
            if (meals.hasOwnProperty(meal)) {
                meals[meal] = this._groupBy(meals[meal], "course");
                titles.push(meal);
                temp = meals[meal];

                var cardList = []
                for (var course in temp) {
                    if (temp.hasOwnProperty(course)) {
                        cardList.push(<Card title={course}
                                         titleStyle={{color: '#512698', fontSize: 20, marginBottom: 0}}
                                         dividerStyle={{height: 0}}
                                         containerStyle={{marginTop: 10, marginBottom: 10}}>
                                         <List containerStyle={{padding: 0, marginTop: 0, marginBottom: 0}}>
                                           {
                                             temp[course].map((l, i) => (
                                               <ListItem
                                                 key={i}
                                                 title={l.formal_name}
                                                 subtitle={l.portion_size}
                                                 hideChevron={true}
                                               />
                                             ))
                                           }
                                         </List>
                                      </Card>);
                    }
                }
                cards.push(cardList);
            }
        }
        this.setState({ mealArray: meals, cardArray: cards, titleArray: titles });
    }

    incrementState(){
        this.setState({ stateIndex: (this.state.stateIndex + 1) % this.state.titleArray.length });
    }

    decrementState(){
        this.setState({ stateIndex: (this.state.stateIndex + this.state.titleArray.length - 1) % this.state.titleArray.length });
    }

    render() {
        return (
        <View style={styles.container}>
            <Header
                leftComponent={<Icon name='chevron-left' color='white' onPress={() => this.props.navigation.goBack()} underlayColor='#512698'/>}
                centerComponent={{ text: this.props.navigation.state.params.title, style: { fontSize: 22, color: '#ffffff' } }}
                outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                rightComponent={<Icon name='chevron-right' color='#512698' />}
            />

            <Header
                leftComponent={<Icon name='chevron-left' color='white' onPress={() => this.decrementState()} />}
                centerComponent={{ text: this.state.titleArray[Math.abs(this.state.stateIndex)],
                                   style: { fontSize: 20, color: '#ffffff' } }}
                outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}}
                underlayColor='#512698'
                rightComponent={<Icon name='chevron-right' color='white' onPress={() => this.incrementState()} />}
            />

            <ScrollView>
                {this.state.cardArray[this.state.stateIndex]}
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
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
//        paddingTop: (Platform.OS == 'ios') ? 20 : 0
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
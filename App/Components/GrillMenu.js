/**
 * Kevin Chang, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, PixelRatio, Dimensions, Animated } from 'react-native';
import { Button, Card, Header, Icon, List, ListItem } from 'react-native-elements';
import GrillList from '../Resources/GrillList.json';
import GrillSubsList from '../Resources/GrillSubsList.json';
import GrillWingsList from '../Resources/GrillWingsList.json';
import GrillPizzaSauce from '../Resources/GrillPizzaSauce.json';

export default class GrillMenu extends Component {

    constructor(){
        super()
        this.state = {
            stateArray: [[],[],[]],
            sauceArray: [GrillList,[],[]],
            stateIndex: 0,
            titleArray: ['Pizza/Nachos/Salad','Subs','Wings'],
            sub1Array: ['Toppings (3 - Pizza, 2 - Nachos/Salad)', '', ''],
            sub0Array: ['Sauce (Pizza Only)', '', ''],
        }
    }

    componentDidMount(){
        //this._getMeal();
        this._loadData();
    }

    _loadData = () => {
        var temp = [];
        temp.push(GrillPizzaSauce);
        temp.push(GrillSubsList);
        temp.push(GrillWingsList);
        this.setState({ stateArray: temp });
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
                centerComponent={{ text: "\'82 Grill", style: { fontSize: 22, color: '#ffffff' } }}
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
                <Card title={this.state.sub0Array[this.state.stateIndex]}
                    titleStyle={{color: '#512698', fontSize: 20, marginTop: 10, marginBottom: 0}}
                    dividerStyle={{height: 0}}
                    containerStyle={{ marginTop: 5, marginBottom: 5, padding: 0 }}>
                    <List containerStyle={{padding: 0, marginTop: 0, marginBottom: 0}}>
                      {
                        this.state.stateArray[this.state.stateIndex].map((l, i) => (
                          <ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.description}
                            hideChevron={true}
                           />
                        ))
                      }
                    </List>
                </Card>

                <Card title={this.state.sub1Array[this.state.stateIndex]}
                    titleStyle={{color: '#512698', fontSize: 20, marginTop: 10, marginBottom: 0}}
                    dividerStyle={{height: 0}}
                    containerStyle={{ marginTop: 5, marginBottom: 5, padding: 0 }}>
                    <List containerStyle={{padding: 0, marginTop: 0, marginBottom: 0}}>
                      {
                        this.state.sauceArray[this.state.stateIndex].map((l, i) => (
                           <ListItem
                             key={i}
                             title={l.name}
                             subtitle={l.description}
                             hideChevron={true}
                           />
                        ))
                      }
                    </List>
                </Card>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create(
{
    container:{
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
//        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
    viewHolder:{
        height: 55,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    text:{
        color: 'white',
        fontSize: 25
    },
    subtitle:{
        marginTop: 10,
        marginLeft: 20,
        color: '#512698',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

export default class About extends Component{
    constructor(){
        super()
        this.state = {
            workerList: [],
            acknowList: [],
            workerTitle: '',
            acknowTitle: '',
        }
    }

    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='info'
                color={tintColor} />
        ),
    };


    showEasterEgg = () => {
        const easterList0 = [
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
            }
        ]

        const easterList1 = [
            {
              name: 'Professor Jeannie Albrecht',
              role: 'Advisor',
            },{
              name: 'Nambi Williams',
              role: 'Mobile Engineer',
            }
        ]

        var easterList2 = [];

        var easterList2 = easterList0.map((l, i) => (
                            <ListItem
                              key={i}
                              title={l.name}
                              subtitle={l.role}
                              hideChevron={true}
                            />
                          ));

        var easterList3 = [];

        var easterList3 = easterList1.map((l, i) => (
                            <ListItem
                              key={i}
                              title={l.name}
                              subtitle={l.role}
                              hideChevron={true}
                            />
                          ));

        this.setState({ workerList: easterList2,
                        acknowList: easterList3,
                        workerTitle: 'Contributors',
                        acknowTitle: 'Acknowledgements' });
    }

    render() {
        const infoList = [
            {
              title: 'App Version',
              sub: '0.2.0'
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
                            onLongPress={this.showEasterEgg}
                            hideChevron={true}
                          />
                        ))
                      }
                    </List>

                    <Text>{this.workerTitle}</Text>

                    <List containerStyle={{padding: 0, marginTop: 0, marginBottom: 0}}>
                        {this.workerList}
                    </List>

                    <Text>{this.acknowTitle}</Text>

                    <List containerStyle={{padding: 0, marginTop: 0, marginBottom: 0}}>
                        {this.acknowList}
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
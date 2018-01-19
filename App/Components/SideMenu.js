import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';

export default class SideMenu extends Component{
    static navigationOptions = {
        drawerLabel: 'SideMenu',
        drawerIcon: () => (
            <Image
                source={require('../Assets/star.png')}
                style={styles.icon} />
        ),
    };
    render(){
        const list = [
          {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
          },
          {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
          },
        ]

        return(
            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home" />

                <List containerStyle={{marginBottom: 20}}>
                  {
                    list.map((l, i) => (
                      <ListItem
                        avatar={{uri:l.avatar_url}}
                        key={i}
                        title={l.name}
                      />
                    ))
                  }
                </List>
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
    btnImage: {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    },
    icon: {
        width: 24,
        height: 24,
    }
});

AppRegistry.registerComponent('SideMenu', () => SideMenu );
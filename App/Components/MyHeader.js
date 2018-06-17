/**
 * Kevin Chang
 * (c) 06/2018
 */

 import React, { Component } from 'react';
 import { AppRegistry, Image } from 'react-native';
 import { Header, Icon } from 'react-native-elements';

 export default class MyHeader extends Component {

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Header
              leftComponent={
                  <Icon
                      name='menu'
                      color='white'
                      onPress={() => this.props.navigation.navigate('DrawerToggle')}
                      underlayColor='#512698'/>
              }
              centerComponent={{ text: this.props.text, style: { fontSize: 22, color: '#ffffff' } }}
              outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
              underlayColor='#512698'/>

        )

    }

 }

  AppRegistry.registerComponent('MyHeader', () => MyHeader );
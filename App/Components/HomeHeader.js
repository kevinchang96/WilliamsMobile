/**
 * Kevin Chang
 * (c) 06/2018
 */
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

import style from '../Utils/Style'

export default class HomeHeader extends Component {

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Header
                leftComponent={
                    <Icon
                        name='menu'
                        color='white'
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        underlayColor='#512698'/>
                }
                centerComponent={
                    <Image source={require('../Assets/williams2.png')}
                        style={{width: 173, height: 30}} />
                }
                rightComponent={
                    <Icon
                        name='settings'
                        color='white'
                        onPress={() => navigate('Settings')}
                        underlayColor='#512698'/>
                }
                outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
            />
        )
    }
}

 AppRegistry.registerComponent('HomeHeader', () => HomeHeader );
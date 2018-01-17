/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, {Component} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
//import {bind} from 'w../utils/utils';

import HomeScreen from '.../App';

class Main extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Welcome',
    });

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Animatable.Image
                    style={styles.icon}
                    animation="fadeIn"
                    source={require('../Assets/williamsldpi-white.png')}
                    iterationCount="infinite"
                    direction="alternate"
                    delay={1000}
                    onAnimationEnd={() => navigate('HomeScreen')}>

                </Animatable.Image>
            </View>
        )
    }
}

const homeScreen = () => (
    <HomeScreen/>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#512698',
    },
    icon: {
        width: 100,
        height: 100,
    },
});


export default Main;
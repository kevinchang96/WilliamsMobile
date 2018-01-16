/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, {Component} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import {bind} from 'w../utils/utils';

class Main extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Animatable.Image
                    animation="fadeIn"
                    source={require('../Assets/williamsldpi-white.png')}
                    iterationCount="infinite"
                    direction="alternate"
                    delay={1000}
                    style={styles.icon}>
                </Animatable.Image>
            </View>
        )
    }
}


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
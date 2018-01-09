import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PixelRatio,
  Dimensions
} from 'react-native';
import SearchBar from './SearchBar';

export default class Factrak extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchBar></SearchBar>
                </View>
            </View>
        );
    }
}

const height = Dimensions.get('window').height * PixelRatio.get();
const weight = Dimensions.get('window').weight * PixelRatio.get();

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height,
    },
    searchContainer: {

    }
});

AppRegistry.registerComponent('Factrak', () => Factrak);
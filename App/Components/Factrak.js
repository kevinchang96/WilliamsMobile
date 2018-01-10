import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Dimensions
} from 'react-native';
import FactrakSearch from './FactrakSearch';

export default class Factrak extends Component{
    constructor(props){
        super(props)

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <FactrakSearch />
                </View>
                <View style={styles.footer}>

                </View>
            </View>
        );
    }
}

const height = Dimensions.get('window').height * PixelRatio.get();
const weight = Dimensions.get('window').weight * PixelRatio.get();

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: 'purple',
        height: height,
    },
    searchContainer: {

    },
    footer :{

    }
});

AppRegistry.registerComponent('Factrak', () => Factrak);
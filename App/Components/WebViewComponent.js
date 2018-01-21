/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { Image, Platform, StyleSheet, View, WebView } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class WebViewComponent extends Component {
  render() {
  console.log(this.props.navigation.state.params.url);
    return (
        <View style={styles.container}>
            <Header
                centerComponent={
                    <Image source={require('../Assets/williams2.png')}
                    style={{width: 173, height: 30}} />
                }
                outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

            <WebView
                source={{uri: this.props.navigation.state.params.url}}
                style={{paddingTop: Platform.OS === 'ios' ? 20 : 0}}
                javaScriptEnabled={true}
            />

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#512698', //'#DCD0FE',
    }
});


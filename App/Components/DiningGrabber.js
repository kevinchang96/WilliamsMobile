/**
 * David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View, WebView } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class DiningGrabber extends Component {
    constructor(props){
        super();
        this.state = {
            _onMessage: "",
        };
    }
    render() {
        console.log(this.props.navigation.state.params.url);

        const jsCode = 'window.postMessage(document.getElementsByClassName("cbo_nn_itemGridTable"))'
        const jsCode2 = "window.postmessge($('body').html())"

        return (
            <View style={styles.container}>
                <View style={styles.ncontainer}>
                    <WebView
                        source={{uri: this.props.navigation.state.params.url}}
                        javaScriptEnabled={true}
                        initialScale={10}
                        onMessage={this.state._onMessage}
                        injectedJavaScript={jsCode2}
                    />
                </View>

                <View>
                    <Text>{this.state._onMessage}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    ncontainer: {
        flex: .5,
        backgroundColor: '#DDDDDD',
    }
});


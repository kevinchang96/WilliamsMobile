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
    }

    state = {
        data: ''
    }

    onMessage ( event ) {
      console.log("HTML!!!!!!!!!!!!!!1:" , event.NativeEvent.data)

//      this.setState({
//          data: event
//      })
    }

    render() {
        console.log(this.props.navigation.state.params.url);

        const jsCode = 'window.postMessage(document.getElementsByClassName("cbo_nn_page"))'
        const jsCode2 = "window.postmessge($('body').html())"

        return (
            <View style={styles.container}>
                <View style={styles.ncontainer}>
                    <WebView style={styles.webview}
                        source={{uri: this.props.navigation.state.params.url}}
                        javaScriptEnabled={true}
                        initialScale={10}
                        injectedJavaScript={jsCode2}
                        onMessage={this.onMessage}
                    />
                </View>

                <View>
                    <Text>{event.nativeEvent.data}</Text>
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
    },
    webview: {
        height: 0,
    }
});


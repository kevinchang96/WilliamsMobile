/**
 * Kevin Chang, David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { Image, Platform, StyleSheet, View, WebView } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';

export default class WebViewComponent extends Component {
    constructor(){
        super()
        this.state = {
            canGoBack: false,
            url: "",
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }

    onBack() {
      this.refs[WEBVIEW_REF].goBack();
    }

    onForward() {
      this.refs[WEBVIEW_REF].goForward();
    }

    onReload() {
      this.refs[WEBVIEW_REF].reload();
    }

    render() {
        console.log(this.props.navigation.state.params.url, this.props.navigation.state.params.title);
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'
                        />
                    }
                    centerComponent={{ text: this.props.navigation.state.params.title, style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}} />

                <WebView style={{flex: 1}}
                    source={{uri: this.props.navigation.state.params.url}}
                    javaScriptEnabled={true}
                    scalesPageToFit={false}
                    initialScale={10}
                    ref={WEBVIEW_REF}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />

                <Header
                    leftComponent={<Icon name='chevron-left' color='white' onPress={this.onBack.bind(this)} />}
                    centerComponent={<Icon name='replay' color='white' onPress={this.onReload.bind(this)} />}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 50}}
                    underlayColor='#512698'
                    rightComponent={<Icon name='chevron-right' color='white' onPress={this.onForward.bind(this)} />}
                />
            </View>
        );
    }
}

const WEBVIEW_REF = "WEBVIEW_REF";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#512698', //'#DCD0FE',
    },
    buttonStyle: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#512698'
    },
});


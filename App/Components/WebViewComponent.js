import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewComponent extends Component {
  render() {
  console.log(this.props.navigation.state.params.url);
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.url}}
        style={{marginTop: 20}}
        javaScriptEnabled={true}
      />
    );
  }
}


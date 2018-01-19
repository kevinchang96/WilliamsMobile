import React, { Component } from 'react';
import { WebView, Platform} from 'react-native';

export default class WebViewComponent extends Component {
  render() {
  console.log(this.props.navigation.state.params.url);
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.url}}
        style={{paddingTop: Platform.OS === 'ios' ? 20 : 0}}
        javaScriptEnabled={true}
      />
    );
  }
}


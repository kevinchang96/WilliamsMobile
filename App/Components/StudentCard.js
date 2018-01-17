import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class StudentCard extends Component{

    render(){
        return(
            <View>
                <Image>
                    source={{uri: this.props.photo}}
                    style={{width: 50, height: 50}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 0,
    borderColor: 'white',
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('StudentCard', () => StudentCard );
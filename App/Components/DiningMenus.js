/**
 * Kevin Chang
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  PixelRatio,
  Dimensions,
  Animated
} from 'react-native';

import { Button, ButtonGroup } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class DiningMenus extends Component {

    constructor(){
        super()
        this.state = { selectedIndex:  0, valueArray: [{menuItem:'ham'},{menuItem:'cheese'}] }
        this.index = 0
        this.menuItem = ''
        this.animatedValue = new Animated.Value(0)
        this.updateIndex = this.updateIndex.bind(this)

    }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

    addMore = () => {
        // Code to add new values in array
        this.animatedValue.setValue(0);

        let newlyAddedValue = { index: this.index }

        this.setState({ valueArray: [ ...this.state.valueArray, newlyAddedValue]}, () => {
            Animated.timing( this.animatedValue,
                {
                    toValue: 1,
                    useNativeDriver: true
                }
            ).start( () => { this.index = this.index + 1; });
        });

    }

     renderAll = () => {

        let newlyAddedValue = { menuItem: this.menuItem }

        this.setState({ valueArray: [ ...this.state.valueArray, newlyAddedValue]}, () => {
                    Animated.timing( this.animatedValue,
                        {
                            toValue: 1,
                            useNativeDriver: true
                        }
                    ).start( () => { this.menuItem = this.menuItem + 'a'; });
                });
    }


    //Cache-Control: max-age=0
    _getCookies = () => {
        fetch('http://nutrition.williams.edu/NetNutrition/1',
        {
            method: 'GET',
            headers: {
                'Host': 'nutrition.williams.edu',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'DNT': 1,
                'Referer': 'http://nutrition.williams.edu/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.9'
            },

        })
        .then(
            function(response) {
               console.log(response.headers);
               //console.log(response.headers.get("set-cookie"));
               var setCookies = response.headers.get("set-cookie");
               console.log( "Set-Cookie: " + setCookies );
               this.setState( {cookies: setCookies} );
            }.bind(this)
        )

    }

    render() {
        let newArray = this.state.valueArray.map(( item, key ) =>
        {
            return(
                <View key = { key } style = { styles.viewHolder }>
                    <Text style={styles.text}>Row { item.menuItem }{ item.index }</Text>
                </View>
            );
        });

        return (
        <View paddingTop={10}>
            <ButtonGroup
                containerBorderRadius={0}
                selectedBackgroundColor="pink"
                onPress={this.updateIndex}
                selectedIndex={ this.state.selectedIndex }
                buttons={ ['Driscoll', 'Whitman\'s', 'Mission'] }
                containerStyle={{height: 30}}
            />

            <Button
                onPress={ this._getCookies }
                raised
                buttonStyle={{backgroundColor: 'blue'}}
                textStyle={{textAlign: 'center'}}
                title={`Add More!`}
            />

            <Button
                onPress={ this.renderAll }
                raised
                buttonStyle={{backgroundColor: 'blue'}}
                textStyle={{textAlign: 'center'}}
                title={`Render All`}
            />

            <ScrollView>
                <View style = {{ flex: 1, padding: 4 }}>
                    {
                        newArray
                    }
                </View>
            </ScrollView>
        </View>
        );
    }

}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    viewHolder:
    {
        height: 55,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },

    text:
    {
        color: 'white',
        fontSize: 25
    }
});

AppRegistry.registerComponent('DiningMenus', () => DiningMenus );
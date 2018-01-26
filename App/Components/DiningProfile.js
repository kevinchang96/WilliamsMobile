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

import { Button, ButtonGroup, Header, Tile } from 'react-native-elements';

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
            <Header
                leftComponent={
                    <Icon
                        name='menu'
                        color='white'
                        onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                }
                centerComponent={{ text: 'Driscoll', style: { fontSize: 22, color: '#ffffff' } }}
                outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
            />

            <Tile
               imageSrc={{require: ('./img/path')}}
               title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
               featured
               caption="Some Caption Text"
            />

            <ButtonGroup
                containerBorderRadius={0}
                selectedBackgroundColor="pink"
                onPress={this.updateIndex}
                selectedIndex={ this.state.selectedIndex }
                buttons={ ['Driscoll', 'Whitman\'s', 'Mission'] }
                containerStyle={{height: 30}}
            />

            <Button
                onPress={ this._getMeal }
                raised
                buttonStyle={{backgroundColor: 'blue'}}
                textStyle={{textAlign: 'center'}}
                title={`Add More!`}
            />

            <Button
                onPress={ this._getCookies }
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
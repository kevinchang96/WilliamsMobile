import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Header, Button, ButtonGroup } from 'react-native-elements';

export default class Home extends Component {
    state = {
        index: 0
    }

    updateIndex = (index) => {
        this.setState({index})
    }

    render() {
        return (
            <View style={styles.container}>

                <Header
                    leftComponent={{ icon: 'menu', color: '#ffffff' }}
                    centerComponent={{ text: 'WILLIAMS MOBILE', style: { color: '#ffffff' } }}
                    rightComponent={{ icon: 'home', color: '#ffffff' }}
                    outerContainerStyles={{ backgroundColor: '#512968' }}
                />

                <ScrollView style={styles.scrollContainer}>
                    <Button
                        raised
                        icon={{name: 'home', size: 40}}
                        buttonStyle={{backgroundColor: 'blue'}}
                        textStyle={{textAlign: 'center'}}
                        title={`Welcome to\nReact Native Elements`}
                    />
                </ScrollView>

                <ButtonGroup
                    selectedBackgroundColor="pink"
                    onPress={this.updateIndex}
                    selectedIndex={this.state.index}
                    buttons={['Feed', 'WSO', 'Settings']}
                    containerStyle={{height: 30}}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },

});


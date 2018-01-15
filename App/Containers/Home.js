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

    const newsButton = () => {
        <TouchableOpacity
            activeOpacity = { 0.8 }
            style = { styles.btn }
            disabled = { this.state.disabled }
            onPress = { this.addMore } >
            <Image
                source = { require('./assets/add.png') }
                style = { styles.btnImage }
            />
        </TouchableOpacity>

        <Button
            icon={{name: 'news', size: 25}}
            buttonStyle={{backgroundColor: 'yellow'}}
            textStyle={{textAlign: 'center'}}
        />
    }
    const wsoButton = () => {
        <Button
            icon={{name: 'v-card', size: 25}}
            buttonStyle={{backgroundColor: 'yellow'}}
            textStyle={{textAlign: 'center'}}
        />
    }
    const homeButton = () =>  {
        <Button
            icon={{name: 'home', size: 25}}
            buttonStyle={{backgroundColor: 'yellow'}}
            textStyle={{textAlign: 'center'}}
        />
    }
    const linkButton = () => {
        <Button
            icon={{name: 'export', size: 25}}
            buttonStyle={{backgroundColor: 'yellow'}}
            textStyle={{textAlign: 'center'}}
        />
    }
    const otherButton = () => {
        <Button
            icon={{name: 'dots-three-horizontal', size: 25}}
            buttonStyle={{backgroundColor: 'yellow'}}
            textStyle={{textAlign: 'center'}}
        />
    }

    render() {
        const footerButtons = [{ element: newsButton },  { element: wsoButton }, { element: homeButton }, { element: linkButton }, { element: otherButton }]

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
                    selectedBackgroundColor="orange"
                    onPress={this.updateIndex}
                    selectedIndex={this.state.index}
                    buttons={footerButtons}
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
    btn: {
//        position: 'absolute',
//        right: 25,
//        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
//        padding: 15
    },
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }

});


/**
 * Kevin Chang
 * (c) 12/2017
 *
 * David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup, Card, Header, Icon } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Login from './App/Components/Login';
import Logout from './App/Components/Logout';
import Settings from './App/Components/Settings';
import Factrak from './App/Components/Factrak';
import FactrakCommentWindow from './App/Components/FactrakCommentWindow';
import DiningMenus from './App/Components/DiningMenus';
import WebViewComponent from './App/Components/WebViewComponent';
import DiningList from './App/Components/DiningList';
import LinkList from './App/Components/LinkList';
import WeatherReader from './App/Components/WeatherReader';

class HomeScreen extends Component {
//    static navigationOptions = ({navigation}) => ({
//        title: 'Welcome',
//    });

    state = {
        index: 0
    }

    updateIndex = (index) => {
        this.setState({index})
    }

    render() {
        const { navigate } = this.props.navigation;
        const footerButtons = ['HOME','NEWS','WSO','LINKS']

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='menu'
                            color='white'
                            onPress={() => navigate('LinkList')} />
                    }
                    centerComponent={
                        <Image source={require('./App/Assets/williams2.png')}
                            style={{width: 173, height: 30}} />
                    }
                    rightComponent={
                        <Icon
                            name='settings'
                            color='white'
                            onPress={() => navigate('Settings')} />
                    }
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                <ScrollView style={styles.scrollContainer}>
                    <Card
                        title='WEATHER'
                        image={require('./App/Assets/weather-week-report.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current weather stuff.
                        </Text>
                        <Button
                            rounded
                            icon={{name: 'wb-cloudy'}}
                            backgroundColor='#512698'
                            fontFamily='Lato'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='FORECAST' />
                    </Card>

                    <Card
                        title="TODAY'S MENU"
                        image={require('./App/Assets/cutlery.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current dining stuff.
                        </Text>
                        <Button
                            icon={{name: 'local-dining'}}
                            backgroundColor='#512698'
                            fontFamily='Lato'
                            onPress={() => navigate('DiningList')}
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='MENUS' />
                    </Card>

                    <Card
                        title='DAILY MESSAGES'
                        image={require('./App/Assets/text.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            This and above is where you implement all the current daily messages stuff.
                        </Text>
                        <Button
                            icon={{name: 'line-weight'}}
                            backgroundColor='#512698'
                            fontFamily='Lato'
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='MORE' />
                    </Card>

                    <Button
                        raised
                        title={`Login`}
                        rounded
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Login')} />

                    <Button
                        raised
                        title={`Logout`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Logout')} />

                    <Button
                        raised
                        title={`Factrak`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Factrak')} />

                    <Button
                        raised
                        title={`Links`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('LinkList')} />

                    <Button
                        raised
                        title={`Campus Map`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Map',{ url: 'http://map.williams.edu/map/?id=640'})} />

                    <Button
                        raised
                        title={`LaundryView`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('LaundryView',{ url: 'http://m.laundryview.com/lvs.php'})} />

                    <Card
                        title='HELLO WORLD'
                        image={require('./App/Assets/williamsldpi.png')}>
                        <Text style={{borderRadius: 5, marginBottom: 5}}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                            icon={{name: 'code'}}
                            backgroundColor='#512698'
                            fontFamily='Lato'
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VIEW NOW' />
                    </Card>
                </ScrollView>

                <ButtonGroup
                    selectedBackgroundColor="orange"
                    onPress={this.updateIndex}
                    selectedIndex={this.state.index}
                    buttons={footerButtons}
                    innerBorderStyle={{width: 0}}


                    containerStyle={{borderRadius: 0, padding: 5, height: 30}} />
            </View>
        );
    }
}

const settings = () => (
    <Settings/>
);

const login = () => (
    <Login />
);

const logout = () => (
    <Logout />
);

const diningMenus = () => (
    <DiningMenus />
);

const map = ({navigation}) => (
    <WebViewComponent navigation={navigation}/>
);

const laundryview = ({navigation}) => (
    <WebViewComponent navigation={navigation}/>
);

const diningList = () => (
    <DiningList />
);

const linkList = () => (
    <LinkList />
);

const factrak = ({navigation}) => (
    <Factrak comments={(html) => navigation.navigate('FactrakCommentWindow',{html:html})}/>
);

const factrakCommentWindow = ({navigation}) => (
    <FactrakCommentWindow navigation={navigation}/>
);

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: settings },
    Login: { screen: login },
    Logout: { screen: logout },
    DiningMenus: { screen: diningMenus },
    Map: { screen: map },
    LaundryView: { screen: laundryview },
    Factrak: { screen: factrak },
    FactrakCommentWindow: { screen: factrakCommentWindow },
    DiningList: { screen: diningList },
    LinkList: { screen: linkList }
},{
    headerMode: 'none',
//    initialRouteName: 'homeScreen'
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#DDDDDD', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
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

export default RootNavigator;

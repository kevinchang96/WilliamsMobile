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

import Settings from './App/Components/Settings';
import Factrak from './App/Components/Factrak';
import FactrakCommentWindow from './App/Components/FactrakCommentWindow';
import Facebook from './App/Components/Facebook';
import DiningMenus from './App/Components/DiningMenus';
import WebViewComponent from './App/Components/WebViewComponent';
import DiningList from './App/Components/DiningList';
import LinkList from './App/Components/LinkList';
import NewsList from './App/Components/NewsList';
import WeatherReader from './App/Components/WeatherReader';
import DailyMessages from './App/Components/DailyMessages';

class HomeScreen extends Component {
//    static navigationOptions = ({navigation}) => ({
//        title: 'Welcome',
//    });

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
          <Image
            source={require('./App/Assets/star.png')}
          />
        ),
      };

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
                            onPress={() => navigate('DrawerOpen')} />
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
                            onPress={() => navigate('DailyMessages')}
                            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='MORE' />
                    </Card>

                    <Button
                        raised
                        title={`Factrak`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Factrak')} />

                    <Button
                        raised
                        title={`Facebook`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('Facebook')} />

                    <Button
                        raised
                        title={`Links`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('LinkList')} />

                    <Button
                        raised
                        title={`News`}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                        onPress={() => navigate('NewsList')} />

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

const settings = () => ( <Settings/> );

const diningMenus = () => ( <DiningMenus /> );

const diningList = () => ( <DiningList /> );

const linkList = () => ( <LinkList /> );

const newsList = () => ( <NewsList /> );

const facebook = () => ( <Facebook /> );

const dailyMess = () => ( <DailyMessages /> );

const factrak = ({navigation}) => (
    <Factrak comments={(html) => navigation.navigate('FactrakCommentWindow',{html:html})}/>
);

const factrakCommentWindow = ({navigation}) => (
    <FactrakCommentWindow navigation={navigation}/>
);

const RootNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: settings },
    DiningMenus: { screen: diningMenus },
    Factrak: { screen: factrak },
    FactrakCommentWindow: { screen: factrakCommentWindow },
    DiningList: { screen: diningList },
    Facebook: { screen: facebook },
    LinkList: { screen: linkList },
    NewsList: { screen: newsList },
    DailyMessages: {screen: dailyMess }
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
    btnImage: {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    },
    icon: {
        width: 24,
        height: 24,
    }
});

export default RootNavigator;

/**
 * Kevin Chang
 * (c) 2017
 */

//import React, { Component } from 'react';
//import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
//import Login from './App/Components/Login';
//import Logout from './App/Components/Logout';
//import Component2 from './App/Components/Component2';
//import Settings from './App/Components/Settings';
//import HttpExample from './App/Components/HttpExample';
//import WeatherReader from './App/Components/WeatherReader';
//import WeatherObj from './App/Components/WeatherObj';
//
//export default class main extends Component{
//    render(){
//        return(
//            <View>
//                <Text>Below should be some weather:</Text>
//                <WeatherObj/>
//            </View>
//
//        );
//    }
//}
//AppRegistry.registerComponent('main', () => main );

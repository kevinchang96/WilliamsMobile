import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';

class NewsList extends Component{
    static navigationOptions = {
        drawerLabel: 'Events & News',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='today'
                color='white' />
        ),
    };

    render() {
        const { navigate } = this.props.navigation;

        const dmList = [
          {
            name: "Daily Messages",
            screen: 'DM',
            icon: require('../Assets/paper_plane.png')
          }
        ]

        const eventsList = [
          {
            url: 'https://events.williams.edu/',
            name: "Williams Events Page",
            screen: 'Events',
            icon: require('../Assets/0f7109a.png')
          }
        ]

        const newsList = [
          {
            url: 'http://williamsrecord.com/',
            name: "Williams Record",
            screen: 'Record',
            icon: require('../Assets/record_logo.png')
          },{
            url: 'http://williamsalternative.com/',
            name: "Williams Alternative",
            screen: 'Alternative',
            icon: require('../Assets/wa_logo2.png')
          },{
            url: 'http://www.berkshireeagle.com/',
            name: "Berkshire Eagle",
            screen: 'Eagle',
            icon: require('../Assets/berkshireeagle.jpg')
          }
        ]

        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Header
                        leftComponent={
                            <Icon
                                name='menu'
                                color='white'
                                onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                        }
                        centerComponent={
                            <Image
                                source={require('../Assets/williams2.png')}
                                style={{width: 173, height: 30}}
                            />
                        }
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                    <Header
                        centerComponent={{ text: 'Events & News', style: { fontSize: 22, color: '#ffffff' } }}
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                    <List containerStyle={{marginBottom: 10}}>
                      {
                        dmList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name} />
                        ))
                      }
                    </List>

                    <List containerStyle={{marginBottom: 10}}>
                      {
                        eventsList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            onPress={() => {console.log(l.screen);navigate(l.screen,{url: l.url})} }
                          />
                        ))
                      }
                    </List>

                    <List containerStyle={{marginBottom: 10}}>
                      {
                        newsList.map((l, i) => (
                          <ListItem
                            avatar={l.icon}
                            key={i}
                            title={l.name}
                            onPress={() => {console.log(l.screen);navigate(l.screen,{url: l.url})} }
                          />
                        ))
                      }
                    </List>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
//        justifyContent: 'center',
        backgroundColor: '#512698', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#DDDDDD',
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


//const dm = () => ( <DailyMessages /> );

const events = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const record = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const alternative = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const eagle = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );


const NewsNavigator = StackNavigator({
    Home: { screen: NewsList },
    Record: { screen: record },
    Alternative: { screen: alternative },
    Events: { screen: events },
    Eagle: { screen: eagle },
//    DM: { screen: dm }
    },
    { headerMode: 'none' }
);

export default NewsNavigator;
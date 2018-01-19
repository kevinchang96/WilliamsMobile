import React, { Component } from 'react';
import { AppRegistry, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';

class NewsList extends Component{
    render() {
        const { navigate } = this.props.navigation;
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
            url: 'http://ephblog.com/',
            name: "EphBlog",
            screen: 'EphBlog',
            icon: require('../Assets/ephblog.jpg')
          }
        ]

        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Header
                        centerComponent={
                            <Image source={require('../Assets/williams2.png')}
                            style={{width: 173, height: 30}} />
                        }
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />

                    <Header
                        centerComponent={{ text: 'News', style: { fontSize: 22, color: '#ffffff' } }}
                        outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

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

const record = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const alternative = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const ephBlog = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const NewsNavigator = StackNavigator({
    Home: { screen: NewsList },
    Record: { screen: record },
    Alternative: { screen: alternative },
    EphBlog: { screen: ephBlog }
    },
    { headerMode: 'none' }
);

export default NewsNavigator;
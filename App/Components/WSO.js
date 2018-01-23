/**
 * Kevin Chang, David Ariyibi
 * (c) 01/2018
 */

import React, { Component } from 'react';
import { AppRegistry, Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import WebViewComponent from './WebViewComponent';

import WSOPost from '../Components/WSOPost';
import Facebook from '../Components/Facebook';
import Factrak from '../Components/Factrak';

class WSO extends Component{
    static navigationOptions = {
        drawerLabel: 'WSO',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='language'
                color='white' />
        ),
    };


    constructor(props){
        super(props);
        this.state=
        {
           discussions:[],
           announcements:[],
           exchanges:[],
           lostNfound:[],
           jobs:[],
           rides:[]
        };
    }

    componentDidMount(){
        var html = '';
        fetch('https://wso.williams.edu/', {method: 'GET'})
        .then( (response) => response.text() )
        .then( (responseText) => {
            const parts = responseText.split('center');
            const html = parts[0] + "\'center\'" + parts[1];

            var DOMParser = require('react-native-html-parser').DOMParser;
            let doc = new DOMParser({errorHandler:{warning:function(w){console.warn(w)},error:function(w){console.log(w)},fatalError:function(w){console.log(w)}}}).parseFromString(html,'text/html');
            var input = doc.getElementsByTagName("section");
            const links = input.item(0).getElementsByTagName("a");
            console.log("Size: "+ links.item(0).attributes.item(0).value);
            var size = links.length;
            var temp = [5];
            for( var i = 1; i < 6; i++ ){
                var discussions = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent,
                    screen: 'WebViewPost'
                };
                temp[i-1] = discussions;
            };
            var temp1 = [5];
            for( var i = 7; i < 12; i++ ){
                var announcements = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent,
                    screen: 'WSOPost'
                };
                temp1[i-7] = announcements;
            };
            var temp2 = [5];
            for( var i = 13; i < 18; i++ ){
                var exchanges = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent,
                    screen: 'WSOPost'
                };
                temp2[i-13] = exchanges;
            };
            var temp3 = [5];
            for( var i = 19; i < 24; i++ ){
                var lostNfound = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent,
                    screen: 'WSOPost'
                };
                temp3[i-19] = lostNfound;
            };
            var temp4 = [5];
            for( var i = 25; i < 30; i++ ){
                var jobs = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent,
                    screen: 'WSOPost'
                };
                temp4[i-25] = jobs;
            };
            let temp5 = [5];
            for( var i = 31; i < 35; i++ ){
                var rides = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent
                };
                temp5[i-31] = rides;
            };
            this.setState(
                {
                    discussions: temp,
                    announcements: temp1,
                    exchanges: temp2,
                    lostNfound: temp3,
                    jobs: temp4,
                    rides: temp5
                }
            );
        }
        )
        .catch((error) => {
             console.error(error);
          });
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
         <View style={styles.container}>
             <Header
                 leftComponent={
                     <Icon
                         name='menu'
                         color='white'
                         onPress={() => this.props.navigation.navigate('DrawerToggle')} />
                 }
                 centerComponent={
                     <Image source={require('../Assets/williams2.png')}
                         style={{width: 173, height: 30}} />
                 }
                 outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}}
             />

             <ScrollView>
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

                 <Card title='Discussions'
                     containerStyle={{padding: 10}}>
                   {
                     this.state.discussions.map((u, i) => {
                         return(
                         <ListItem
                             key={i}
                             title={u.text}
                             hideChevron={true}
                             onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, name: 'Announcements'})} }
                          />
                         );
                     })
                   }
                   <ListItem
                     rightTitle='More'
                   />
                 </Card>

            <Card title='Announcements'
                containerStyle={{padding: 10}}>
              {
                this.state.announcements.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, name: 'Announcements'})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/announcements"})} }
              />
            </Card>

            <Card title='Exchanges'
                containerStyle={{padding: 10}}>
              {
                this.state.exchanges.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, name: 'Exchanges'})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/exchanges"})} }
              />
            </Card>

            <Card title='Lost & Found'
                containerStyle={{padding: 10}}>
              {
                this.state.lostNfound.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, name: 'Lost + Found'})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/lost_and_found"})} }
              />
            </Card>

            <Card title='Jobs'
                containerStyle={{padding: 10}}>
              {
                this.state.jobs.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, name: 'Jobs'})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/jobs"})} }
              />
            </Card>

            <Card title='Rides'
                containerStyle={{padding: 10}}>
              {
                this.state.rides.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/rides"})} }
              />
            </Card>

              </ScrollView>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
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

const webViewPost = ({navigation}) => ( <WebViewComponent navigation={navigation}/> );

const wsoPost = ({navigation}) => ( <WSOPost navigation={navigation}/> );

const factrak = ({navigation}) => (<Factrak />);

const facebook = () => (<Facebook />);

const PostNavigator = StackNavigator({
    Home: { screen: WSO },
    WebViewPost: { screen: webViewPost },
    WSOPost: { screen: wsoPost },
    Factrak: { screen: factrak },
    Facebook: { screen: facebook },
  },
    { headerMode: 'none' }
);

export default PostNavigator;
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
                color={tintColor} />
        ),
    };

    constructor(props){
        super(props);
        this.state = { wso:[[],[],[],[],[],[]] };
    }

    componentDidMount(){
        fetch('https://wso.williams.edu/', {method: 'GET'})
        .then( (response) => response.text() )
        .then( (responseText) => { this._getInfo(responseText); })
        .catch((error) => { console.error(error); });
    }

    _getInfo = ( html ) => {
        var DOMParser = require('react-native-html-parser').DOMParser;
        let doc = new DOMParser({errorHandler:{warning:function(w){console.warn(w)},error:function(w){console.log(w)},fatalError:function(w){console.log(w)}}}).parseFromString(html,'text/html');
        var input = doc.getElementsByTagName("section");
        const lists = input.item(0).getElementsByTagName("ul");
        var tempCategory = new Array(lists.length);
        for( var i = 0; i < lists.length; i++ ){
            var category = lists.item(i);
            var links = category.getElementsByTagName("a");
            var tempLinks = new Array(links.length);
            for( var j = 0; j < links.length; j++ ){
                var temp = {
                    link: links.item(j).attributes.item(0).value,
                    text: links.item(j).textContent,
                    screen: (i == 0) ? 'WebViewPost' : 'WSOPost'
                }
                tempLinks[j] = temp;
            }
            tempCategory[i] = tempLinks;
        }
        this.setState({ wso: tempCategory });
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
                         onPress={() => this.props.navigation.navigate('DrawerToggle')}
                         underlayColor='#512698'/>
                 }
                 centerComponent={{ text: 'WSO', style: { fontSize: 22, color: '#ffffff' } }}
                 outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
             />

             <ScrollView>
                 <Button
                     raised
                     title='FACEBOOK'
                     icon={{name: 'people'}}
                     buttonStyle={styles.buttonStyle}
                     onPress={() => navigate('Facebook')} />

                 <Button
                     raised
                     title='FACTRAK'
                     icon={{name: 'thumbs-up-down'}}
                     buttonStyle={styles.buttonStyle}
                     onPress={() => navigate('Factrak')} />

                 <Card title='DISCUSSIONS'
                     containerStyle={{padding: 10}}>
                   {
                     this.state.wso[0].map((u, i) => {
                         return(
                         <ListItem
                             key={i}
                             title={u.text}
                             hideChevron={true}
                             onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Discussions"})} }
                          />
                         );
                     })
                   }
                   <ListItem
                     rightTitle='More'
                     onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/discussions", title: "Discussions"})} }
                   />
                 </Card>

            <Card title='ANNOUNCEMENTS'
                containerStyle={{padding: 10}}>
              {
                this.state.wso[1].map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Announcements"})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/announcements", title: "Announcements"})} }
              />
            </Card>

            <Card title='EXCHANGES'
                containerStyle={{padding: 10}}>
              {
                this.state.wso[2].map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Exchanges"})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/exchanges", title: "Exchanges"})} }
              />
            </Card>

            <Card title='LOST & FOUND'
                containerStyle={{padding: 10}}>
              {
                this.state.wso[3].map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Lost & Found"})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/lost_and_found", title: "Lost & Found"})} }
              />
            </Card>

            <Card title='JOBS'
                containerStyle={{padding: 10}}>
              {
                this.state.wso[4].map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Jobs"})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/jobs", title: "Jobs"})} }
              />
            </Card>

            <Card title='RIDES'
                containerStyle={{padding: 10}}>
              {
                this.state.wso[5].map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.text}
                        hideChevron={true}
                        onPress={() => {navigate(u.screen,{url: "https://wso.williams.edu"+u.link, title: "Rides"})} }
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
                onPress={() => {navigate("WebViewPost",{url: "https://wso.williams.edu/rides",title: "Rides"})} }
              />
            </Card>

              </ScrollView>
         </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },
    buttonStyle: {
        borderRadius: 0,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#512698'
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

const factrak = ({navigation}) => (<Factrak screenProps={navigation}/>);

const facebook = ({navigation}) => (<Facebook navigation={navigation}/>);

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
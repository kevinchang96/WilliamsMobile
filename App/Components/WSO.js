import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card, Button, Header, Icon, List, ListItem } from 'react-native-elements';

export default class WSO extends Component{

    constructor(props){
        super(props);
        this.state=
        {
           users:[
                    {
                       name: 'brynn',
                       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                    },{
                       name: 'Kevin',
                       id: '67'
                    },{
                       name: 'David',
                       id: '68'
                    }
                 ],
           discussions:[],
           announcements:[],
           exchanges:[],
           lostNfound:[],
           jobs:[],
           rides:[]
        };
    }

    parseWSO(){
        var html = '';
        fetch('https://wso.williams.edu/', {method: 'GET'})
        .then( (response) => response.text() )
        .then( (responseText) => {
            const parts = responseText.split('center');
            //const html = responseText;
            const html = parts[0] + "\'center\'" + parts[1];

            var DOMParser = require('react-native-html-parser').DOMParser;
            let doc = new DOMParser({errorHandler:{warning:function(w){console.warn(w)},error:function(w){console.log(w)},fatalError:function(w){console.log(w)}}}).parseFromString(html,'text/html');
            //console.log(doc);
            var input = doc.getElementsByTagName("section");
            console.log( "Size: " + input.length );
            console.log( "Child: " + input.item(1) );
        }
        )
        .catch((error) => {
             console.error(error);
          });
    }

    render(){
        this.parseWSO();
        return(
         <View >
         <ScrollView>
            <Card title='Discussions'
                containerStyle={{padding: 10}}>
              {
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
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
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
              />
            </Card>

            <Card title='Exchanges'
                containerStyle={{padding: 10}}>
              {
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
              />
            </Card>

            <Card title='Lost & Found'
                containerStyle={{padding: 10}}>
              {
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
              />
            </Card>

            <Card title='Jobs'
                containerStyle={{padding: 10}}>
              {
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
              />
            </Card>

            <Card title='Rides'
                containerStyle={{padding: 10}}>
              {
                this.state.users.map((u, i) => {
                    return(
                    <ListItem
                        key={i}
                        title={u.name}
                        hideChevron={true}
                     />
                    );
                })
              }
              <ListItem
                rightTitle='More'
              />
            </Card>

          </ScrollView>
         </View>
        );
    }
}

AppRegistry.registerComponent('WSO', () => WSO );
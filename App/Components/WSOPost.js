import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Button, ButtonGroup, Card, Header, Icon } from 'react-native-elements';


export default class WSOPost extends Component{

    constructor(props){
        super(props);
        this.state={
            title:"",
            text:"",
            date:"",
            name:"",
            link:""
        }
    }

    componentDidMount(){
        fetch(this.props.navigation.state.params.url, {method: 'GET'})
        .then( (response) => response.text() )
        .then( (responseText) => {
            //console.log(responseText);
            var DOMParser = require('react-native-html-parser').DOMParser;
            let doc = new DOMParser({errorHandler:{warning:function(w){console.warn(w)},error:function(w){console.log(w)},fatalError:function(w){console.log(w)}}}).parseFromString(responseText,'text/html');
            var input = doc.getElementsByTagName("section");
            var parsePoint = input.item(0);
            var userPoint = parsePoint.getElementsByTagName("a").item(0);
            //console.log("Link: "+parsePoint.getElementsByTagName("a").item(0).attributes.item(0).value);
            this.setState(
                {
                    title: parsePoint.getElementsByTagName("h3").item(0).textContent,
                    text: parsePoint.getElementsByTagName("p").item(0).textContent,
                    name: userPoint.textContent,
                    link: "https://wso.williams.edu"+parsePoint.getElementsByTagName("a").item(0).attributes.item(0).value
                }
            );
        })
        .catch((error) => {
           console.error(error);
        });
    }

    render(){
         return(
             <View>
                 <Card title={this.props.navigation.state.params.name}
                     containerStyle={{padding: 10}}>
                   {
                        <View >
                            <ScrollView>
                                 <Text style={{borderRadius: 5, marginBottom: 5}}>
                                     {this.state.title}
                                 </Text>
                                <Text style={{borderRadius: 5, marginBottom: 5}}>
                                     {this.state.text}
                                 </Text>
                                <Text style={{borderRadius: 5, marginBottom: 5}}>
                                    Posted by: {this.state.name}
                                </Text>
                            </ScrollView>
                        </View>
                   }
                 </Card>
             </View>
         );
    }
}
AppRegistry.registerComponent('WSOPost', () => WSOPost );
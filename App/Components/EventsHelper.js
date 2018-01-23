/*
 * Dysron Marshall
 * (c) 01/2018
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import EventsCard from './EventsCard';

export default class EventsHelper extends Component {
    constructor(props){
        super(props);
        this.state = { eventsCards : [] };
    }

    componentDidMount(){
        fetch('https://web.williams.edu/messages/',{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'DNT': '1',
                    'Connection': 'keep-alive',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept-Language': 'en-US,en;q=0.8',
                },
        }).then(res => {return res.text()}).then((text) => {this.getMessages(text)});
    }

    getAudience = (element) => {
        const childNodes = element.childNodes;
        const length = childNodes.length;
        groups = [];
        for(let i = 0; i < length; i++){
            let child = childNodes[i];
            if(child.nodeValue) groups.push(child.nodeValue);
        }
        return groups.join(', ');
    }

    getMessageDetails = (element) => {
        const childNodes = element.childNodes[0].childNodes;
        const title = childNodes[0].textContent.trim().split(/\s\s+/g).join(' ');
        const fullMessage = childNodes[2].textContent.trim().split(/\s\s+/g).join(' ');
        console.log(fullMessage);
        const lastFromIndex = fullMessage.lastIndexOf(' from ');
        const message = fullMessage.slice(0,lastFromIndex);
        const from = fullMessage.slice(lastFromIndex+1);
        return {'title':title,'message':message,'from':from};
    }

    createCard = (audienceElement,tableElements, i) => {
        const audience = this.getAudience(audienceElement);             // 'Students, Faculty, etc.'
        const messageDetails = this.getMessageDetails(tableElements); // {title, message, from]}
        const card = <EventsCard title={messageDetails.title} message={messageDetails.message}
                        from={messageDetails.from} key={i}/>
        return card;
    }

    getMessages = (html) => {
        const DOMParser = require('react-native-html-parser').DOMParser;
        const doc = new DOMParser().parseFromString(html,'text/html');
        const date = doc.getElementById('date_heading').textContent;
        const audienceElements = doc.getElementsByClassName('audience message_cell_new');
        const tableElements = doc.getElementsByClassName('message_cell_new');
        const length = audienceElements.$$length;
        let cards = [];
        for(let i = 0; i < length; i++){
            cards.push(this.createCard(audienceElements[i],tableElements[i],i));
        }
        this.setState({eventsCards:cards});
    }
    render() {
        return (
            <View style={{paddingTop:Platform.OS === 'ios' ? 20 : 0}}>
                 <ScrollView>
                     {this.state.eventsCards}
                 </ScrollView>
            </View>

        );
    }
}
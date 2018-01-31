/*
 * Nambi Williams, David Ariyibi, Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ScrollView,
    Dimensions,
    FlatList,
} from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import MessageCard from './MessageCard';
import DatePicker from 'react-native-datepicker'


export default class DailyMessages extends Component {
    constructor(props){
        super(props);
        date = new Date();
        this.state = {
            initialRender: true,
            from: date,
            to: date,
            messageCards: [],
        };
    }

    componentDidMount(){
        this.getMessages({from:this.state.from, to:this.state.to, initialRender:false});
    }

    shouldComponentUpdate(nextProps, nextState){
        return  (this.state.from != nextState.from) ||
                (this.state.to != nextState.to) ||
                 this.state.initialRender;
    }

    convertDate = (dateObj) => {
        return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
    }

    changeDate = (date,pickerName) => {
        date = new Date(date.split('-'));
        if(pickerName == 'fromDate') {
            this.getMessages({from:date, to: this.state.to});
        }
        else {
            this.getMessages({from: this.state.from, to:date});
        }
    }

    getMessages = (json) => {
        const url = (json.from != json.to) ?    // if dates are the same, then viewing single date
                    'https://web.williams.edu/messages/index.php?' +    // so url is homepage
                    'search_audience_student=on&search_audience_faculty=on&' +
                    'search_audience_staff=on&begin_date=' +
                    encodeURIComponent(this.convertDate(json.from)) + '&end_date=' +
                    encodeURIComponent(this.convertDate(json.to)) + '&search_terms=&search_submit=Search' :
                    'https://web.williams.edu/messages/';
        //console.log(url);
        fetch(url, {method: 'GET'})
        .then((response) => response.text() ) // Transform the data into text
        .then((responseText) => {
            let messagecards = [];

            const DOMParser = require('react-native-html-parser').DOMParser;

            let doc = new DOMParser().parseFromString(responseText,'text/html');

            const root = doc.getElementsByClassName("webOnly");

            for (let i = 0; i < root.length; i++){
                let card = this.createCard(root[i].firstChild.textContent, root[i].lastChild.textContent,i);
                //console.log(card);
                messagecards.push(card);
            }
            this.setState(Object.assign({}, json, { messageCards: messagecards }));
        }).catch((error) => { console.error(error)} );
    };

    createCard(firstChild, lastChild, i){
        title = firstChild.replace(/(\r\n|\n|\r)/gm," ");
        text = lastChild.substring(0, lastChild.lastIndexOf("from")).replace(/(\r\n|\n|\r)/gm," ");
        src = lastChild.slice(lastChild.lastIndexOf("from")+5).replace(/(\r\n|\n|\r)/gm," ");
        card = <MessageCard title={title} text={text} src={src} key={i}/>
        return card;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <Icon
                            name='chevron-left'
                            color='white'
                            onPress={() => this.props.navigation.goBack()}
                            underlayColor='#512698'/>
                    }
                    centerComponent={{ text: 'Daily Messages', style: { fontSize: 22, color: '#ffffff' } }}
                    outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55, marginBottom: 10}}
                />
                <View style={styles.pickers}>
                    <View>
                        <Text>From</Text>
                        <DatePicker confirmBtnText="Confirm" cancelBtnText="Cancel"
                            date={this.state.from}
                            onDateChange={(date) => this.changeDate(date,'fromDate')}/>
                    </View>
                    <View>
                        <Text>To</Text>
                        <DatePicker confirmBtnText="Confirm" cancelBtnText="Cancel"
                            date={this.state.to}
                            onDateChange={(date) => this.changeDate(date,'toDate')}/>
                    </View>
                </View>
                <FlatList data={this.state.messageCards} renderItem={({item}) => item}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE' //'#DCD0FE',
    },
    pickers: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

})

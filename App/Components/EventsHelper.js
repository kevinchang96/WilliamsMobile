/**
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
     TextInput,
     TouchableHighlight,
     ScrollView,
     Dimensions,
     FlatList,
 } from 'react-native';
 import { Button, Header, Icon } from 'react-native-elements';
 import MessageCard from './MessageCard';
 import DatePicker from 'react-native-datepicker'

export default class EventsHelper extends Component {
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
      date = new Date(date);
      if(pickerName == 'fromDate') {
          this.getMessages({from:date, to: this.state.to});
      }
      else {
          this.getMessages({from: this.state.from, to:date});
      }
  }

    getAudienceAndDate = (element) => {
        const childNodes = element.childNodes;
        const length = childNodes.length;
        let groups = [];
        let date = "";
        for(let i = 0; i < length; i+=2){
            let child = childNodes[i];
            groups.push(child.textContent);
        }
        console.log(groups);
        console.log(childNodes);
        if(groups && groups[0].includes(",")){
          date = groups[0];
          groups = groups.slice(1);
        }
        return {"date": date, audience:"Audience: " + groups.join(', ')};
    }

    getMessageDetails = (element) => {
        const childNodes = element.childNodes[0].childNodes;

        const title = childNodes[0].textContent.trim().replace(/(\r\n|\n|\r)/gm," ");
        const fullMessage = childNodes[2].textContent.trim().replace(/(\r\n|\n|\r)/gm," ");
        const lastFromIndex = fullMessage.lastIndexOf(' from ');
        const message = fullMessage.slice(0,lastFromIndex);
        const from = fullMessage.slice(lastFromIndex+1);
        return {'title':title,'message':message,'from':from};
    }

    createCard = (audienceElement,tableElements, i) => {
        const audienceAndDate = this.getAudienceAndDate(audienceElement);             // 'Students, Faculty, etc.'
        const messageDetails = this.getMessageDetails(tableElements); // {title, message, from]}
        const card = <MessageCard title={messageDetails.title} text={messageDetails.message}
                      src={messageDetails.from} key={i} audience={audienceAndDate.audience}
                      date={audienceAndDate.date}/>
        return card;
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
        const DOMParser = require('react-native-html-parser').DOMParser;
        const doc = new DOMParser().parseFromString(responseText,'text/html');
        const date = doc.getElementById('date_heading').textContent;

        const audienceElements = doc.getElementsByClassName('audience message_cell_new');
        const tableElements = doc.getElementsByClassName('message_cell_new');
        const length = audienceElements.$$length;
        let cards = [];
        for(let i = 0; i < length; i++){
            cards.push(this.createCard(audienceElements[i],tableElements[i],i));
        }
        this.setState(Object.assign({}, json, { messageCards: cards }))
      }).catch((error) => { console.error(error)} );
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
                        <Text style={styles.text}>From</Text>
                        <DatePicker confirmBtnText="Confirm" cancelBtnText="Cancel"
                            format={'DD MMMM YYYY'} date={this.state.from}
                            onDateChange={(date) => this.changeDate(date,'fromDate')}/>
                    </View>

                    <View>
                        <Text style={styles.text}>To</Text>
                        <DatePicker confirmBtnText="Confirm" cancelBtnText="Cancel"
                            format={'DD MMMM YYYY'} date={this.state.to}
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
    text: {
        fontSize: 18,
        color: 'black'
    }
})

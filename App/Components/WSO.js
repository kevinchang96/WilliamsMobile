import React, { Component } from 'react';
import { AppRegistry, Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Card, Button, Header, Icon, List, ListItem } from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

export default class WSO extends Component{
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

    componentDidMount(){
        this.parseWSO();
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
            //console.log( "Size: " + input.length );
            const links = input.item(0).getElementsByTagName("a");
            var size = links.length;
            //console.log(links.item(0));
            console.log( "Child: " + links );
            console.log( "First child: " + links.item(0) );
            var temp = [5];
            for( var i = 1; i < 6; i++ ){
                var discussions = {
                    link: links.item(i).attributes.item(0).value,
                    text: links.item(i).textContent
                };
                temp[i-1] = discussions;
                //temp.push(discussions);
            };
            //this.setState( {discussions: temp} );
            var temp1 = [5];
            for( var j = 7; j < 12; j++ ){
                var announcements = {
                    link: links.item(j).attributes.item(0).value,
                    text: links.item(j).textContent
                };
                temp1[j-7] = announcements;
                //temp1.push(announcements);
            };
            //this.setState( {announcements: temp} );
            var temp2 = [5];
            for( var k = 13; k < 18; k++ ){
                var exchanges = {
                    link: links.item(k).attributes.item(0).value,
                    text: links.item(k).textContent
                };
                temp2[k-13] = exchanges;
                //temp2.push(exchanges);
            };
            //this.setState( {exchanges: temp} );
            var temp3 = [5];
            for( var l = 19; l < 24; l++ ){
                var lostNfound = {
                    link: links.item(l).attributes.item(0).value,
                    text: links.item(l).textContent
                };
                temp3[l-19] = lostNfound;
                //temp3.push(lostNfound);
            };
            //this.setState( {lostNfound: temp} );
            var temp4 = [5];
            for( var m = 25; m < 30; m++ ){
                var jobs = {
                    link: links.item(m).attributes.item(0).value,
                    text: links.item(m).textContent
                };
                temp4[m-25] = jobs;
                //temp4.push(jobs);
            };
            //this.setState( {jobs: temp} );
            let temp5 = [5];
            for( var n = 31; n < 36; n++ ){
                var rides = {
                    link: links.item(n).attributes.item(0).value,
                    text: links.item(n).textContent
                };
                temp5[n-31] = rides;
                //temp5.push(rides);
            };
            //this.setState( {rides: temp} );

            //console.log("More children: " + links.item(i));
            //href=""
            //console.log(""+links.item(i).attributes.item(0) );
            //link
            //console.log(""+links.item(i).attributes.item(0).value );

            //textContent
            //console.log(""+links.item(i).textContent );

            //this.setState({discussions:input.item(0).getElementsByTagName("a").childNodes});
            //console.log( this.state );
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
        //this.parseWSO();
        //console.log("hello");
        const { navigate } = this.props.navigation;
        console.log(this.state);
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
                <Card title='Discussions'
                    containerStyle={{padding: 10}}>
                  {
                    this.state.discussions.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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
                    this.state.announcements.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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
                    this.state.exchanges.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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
                    this.state.lostNfound.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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
                    this.state.jobs.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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
                    this.state.rides.map((u, i) => {
                        return(
                        <ListItem
                            key={i}
                            title={u.text}
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

AppRegistry.registerComponent('WSO', () => WSO );
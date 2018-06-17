/**
 * Kevin Chang
 * (c) 06/2018
 */

 import React, { Component } from 'react';
 import { AppRegistry, ScrollView } from 'react-native';
 import { Button, List, Tile } from 'react-native-elements';
 import styles from '../Utils/Style'

 export default class HomeList extends Component{

    render(){
        const { navigate } = this.props.navigation;
        const homeList = [
                          {
                            id: 0,
                            image: require('../Assets/RS34677_2014_Mountain_Day_KQ_0138-1024x683.jpg'),
                            title: "WEATHER",
                            nav: () => navigate('Weather'),
                            bicon: {name: 'wb-cloudy'},
                            btitle: 'FORECAST',
                          },{
                            id: 1,
                            image: require('../Assets/n.jpg'),
                            title: "DINING",
                            nav: () => navigate('DiningList'),
                            bicon: {name: 'restaurant'},
                            btitle: 'DINING',
                          },{
                            id: 2,
                            image: require('../Assets/Williams-College-cancels-.jpg'),
                            title: "DAILY MESSAGES",
                            nav: () => navigate('DailyMessages'),
                            bicon: {name: 'line-weight'},
                            btitle: 'MORE',
                          },{
                            id: 7,
                            image: require('../Assets/20170914-155442-EAG-L-WILLIAMSPREVI_08011.jpg'),
                            title: "EPH SPORTS",
                            nav: () => navigate('EphSports', {url: 'http://ephsports.williams.edu/landing/index', title: 'Eph Sports'}),
                            bicon: {name: 'dribble'},
                            btitle: 'MORE',
                          },{

                            id: 4,
                            image: require('../Assets/Canvas-Mobile-App-Icon.png'),
                            title: "GLOW",
                            nav: () => navigate('Glow', {url: 'https://glow.williams.edu/login/ldap', title: 'Glow'}),
                            bicon: {name: 'input'},
                            btitle: 'LOGIN',
                          },{
                            id: 5,
                            image: require('../Assets/13-hollander.jpg'),
                            title: "CAMPUS MAP",
                            nav: () => navigate('CampusMap', {url: 'http://map.williams.edu/map/?id=640', title: 'Campus Map'}),
                            bicon: {name: 'place'},
                            btitle: 'EXPLORE',
                          },{
                            id: 3,
                            image: require('../Assets/Screen-Shot.png'),
                            title: "SOCIAL WILLIAMS",
                            nav: () => navigate('Social', {url: 'https://www.williams.edu/social/', title: 'Social Williams'}),
                            bicon: {name: 'share'},
                            btitle: 'TAKE A LOOK',
                          },{
                            id: 6,
                            image: require('../Assets/zlav4ewnj03q4e00.jpg'),
                            title: "FEEDBACK",
                            nav: () => navigate('Feedback', {url: 'https://goo.gl/forms/lxgT7UtuGuYDKr5z2', title: 'Feedback'}),
                            bicon: {name: 'edit'},
                            btitle: 'HELP US OUT',
                          }
                ]

        return (
            <ScrollView style={styles.scrollContainer}>
                <List containerStyle={{marginTop: 0, marginBottom: 0, backgroundColor: "#eeeeee"}}>
                  {
                    homeList.map((l, i) => (
                      <Tile
                          featured={true}
                          imageSrc={l.image}
                          title={l.title}
                          activeOpacity={1}
                          onPress={l.nav}
                          captionStyle={{fontSize: 0}}
                          titleStyle={{fontSize: 30, justifyContent: 'center', alignContent: 'center'}}
                          containerStyle={{height: 200, justifyContent: 'center', alignContent: 'center', marginTop: 5}}
                          contentContainerStyle={{marginBottom: 10}}
                          key={i}>

                          <Button
                              rounded
                              icon={l.bicon}
                              onPress={l.nav}
                              backgroundColor='#512698'
                              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                              title={l.btitle} />
                      </Tile>
                    ))
                  }
                </List>
            </ScrollView>
        )

    }
 }

 AppRegistry.registerComponent('HomeList', () => HomeList );
/**
 * Kevin Chang
 * (c) 06/2018
 */

import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import MyHeader from '../Components/MyHeader';
import WSOList from '../Components/WSOList';
import WebViewComponent from '../Components/WebViewComponent';
import WSOPost from '../Components/WSOPost';
import Facebook from '../Components/Facebook';
import Factrak from '../Components/Factrak';
import styles from '../Utils/Style';

class WSO extends Component{
    static navigationOptions = {
        drawerLabel: 'WSO',
        drawerIcon: ({ tintColor }) => (
            <Icon
                name='language'
                color={tintColor} />
        ),
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
         <View style={styles.container}>
            <MyHeader navigation={this.props.navigation} text={"WSO"}></MyHeader>
            <WSOList navigation={this.props.navigation}></WSOList>
         </View>
        );
    }
}

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
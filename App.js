/**
 * Kevin Chang
 * (c) 2017
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions
} from 'react-native';
import Login from './App/Components/Login';
import Logout from './App/Components/Logout'
import Component2 from './App/Components/Component2';
import Settings from './App/Components/Settings';
import HttpExample from './App/Components/HttpExample';
import {FactrakComment} from './App/Components/FactrakCommentWindow';
import FactrakSearch from './App/Components/FactrakSearch';
import SuggestionCard from './App/Components/SuggestionCard';
import DiningMenus from './App/Components/DiningMenus';

export default class main extends Component{

    componentDidUpdate(){
        console.log("updated");
    }

    render(){
        return(
            <View style={styles.container}>
                <Login />
                <Logout />
                <FactrakSearch />
                {/*<FactrakComment professorName="Stewart Johnson" courseNo="MATH 150" numAgree="10"
                                     numDisagree="5" responseComponents={[<Text key={1}>Good professor.</Text>,
                                                                            <Text key={2}>Would take again.</Text>]}
                                     takeAgain="I would" wouldRecommend="I wouldn't"
                                     postedWhen="2 months ago"/>*/}
            </View>
        );
    }
}

const height = Dimensions.get('window').height * PixelRatio.get();
const weight = Dimensions.get('window').weight * PixelRatio.get();

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: "#512698",
        height: height,
    },
    searchContainer: {

    },
    footer :{

    }
});

AppRegistry.registerComponent('main', () => main );
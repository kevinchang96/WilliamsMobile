import React, { Component } from 'react';
import { AppRegistry, Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, CheckBox, Header, Icon, List, ListItem } from 'react-native-elements';
import LeesMealsList from './LeesMealsList.json';
import LeesAlaCarteList from './LeesAlaCarteList.json';
import LeesBeveragesList from './LeesBeveragesList.json';
//import LeesDessertsList from './LeesDessertsList.json';

export default class ItemCalculator extends Component{

    constructor(props){
            super(props);
            this.state=
            { currentBalance: 0.0, dataArray: [] };
        }

        componentDidMount(){
            this.loadData();
        }

        loadData(){
            this.setState({ dataArray: LeesBeveragesList })
        }

        onClick( i ){
            this.state.dataArray[i].checked = !this.state.dataArray[i].checked;
            this.forceUpdate()
        }

    render(){

        const WhitmansList = [
            {
                name: '',
                description: ''
            },{
                name: '',
                description: ''
            }
        ]

         return(
             <View style={styles.container}>
             <Header
                 leftComponent={
                     <Icon
                         name='chevron-left'
                         color='white'
                         onPress={() => this.props.navigation.goBack()} />
                 }
                  centerComponent={
                      <Image source={require('../Assets/williams2.png')}
                      style={{width: 173, height: 30}} />
                  }
                  outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 45}} />
            <ScrollView>
            <Header
             centerComponent={{ text: 'A la Carte', style: { fontSize: 22, color: '#ffffff' } }}
             outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                <List containerStyle={{ marginTop: 10, marginBottom: 0 }}>
                   {
                     this.state.dataArray.map((l, i) => (
                       <CheckBox
                         key={i}
                         title={l.name + " ($" + l.price + ")"}
                         checked={this.state.dataArray[i].checked}
                         checkedColor='green'
                         onPress={() => { this.onClick(i) } }
                       />
                     ))
                   }
                 </List>
                </ScrollView>
                <View><Text style={{borderRadius: 15, marginBottom: 15}}>This is the footer!</Text></View>
             </View>
         );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
//        justifyContent: 'center',
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
    btnImage:
    {
        resizeMode: 'contain',
        width: '100%',
        tintColor: 'white'
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
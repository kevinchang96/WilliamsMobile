import React, { Component } from 'react';
import { AppRegistry, Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, CheckBox, Header, Icon, List, ListItem } from 'react-native-elements';
import LeeMealsList from './LeeMealsList.json';
import LeeAlaCarteList from './LeeAlaCarteList.json';
import LeeBeveragesList from './LeeBeveragesList.json';
import LeeDessertsList from './LeeDessertsList.json';

export default class ItemCalculator extends Component{

    constructor(props){
            super(props);
            this.state=
            { currentBalance: 0.0, dataArray: [], fontColor: 'green' };
        }

        componentDidMount(){
            this.loadData();
        }

        loadData(){
            this.setState({ dataArray: LeeBeveragesList })
        }

        onClick( i ){
            this.state.dataArray[i].checked = !this.state.dataArray[i].checked;
            this.forceUpdate()
        }

        updatePrice( isChecked, price ){
            if( isChecked ){
                this.setState({currentBalance: Math.round((this.state.currentBalance + price)*100)/100})
            } else {
                this.setState({currentBalance: Math.round((this.state.currentBalance - price)*100)/100})
            }
        }

    render(){
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
                  outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}} />
            <ScrollView styles={styles.scrollContainer}>
            <Header
             centerComponent={{ text: 'A la Carte', style: { fontSize: 22, color: '#ffffff' } }}
             outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}} />

                <List containerStyle={{ marginTop: 5, marginBottom: 5 }}>
                   {
                     this.state.dataArray.map((l, i) => (
                       <CheckBox
                         key={i}
                         title={l.name + " - ($" + l.price + ")"}
                         checked={this.state.dataArray[i].checked}
                         checkedColor='green'
                         onPress={() => { this.onClick(i); this.updatePrice(this.state.dataArray[i].checked,l.price) } }
                       />
                     ))
                   }
                 </List>
                </ScrollView>
                <View>
                    <Card containerStyle={{ marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }}>
                        <Text style={ styles.titleText }>
                        The current balance: ${this.state.currentBalance}
                        </Text>
                    </Card>
                </View>
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
    titleText:
    {
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        marginBottom: 5,
        color: 'black'
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
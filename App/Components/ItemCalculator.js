/**
 * Kevin Chang, Dysron Marshall
 * (c) 01/2018
 */
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
            {   currentBalance: 0.0,
                stateIndex: 1,
                stateArray: [],
                dataArray: [],
                titleArray: ['A la Carte', 'Beverages', 'Desserts', 'Meals'],
                fontColor: 'green'
            };
        }

        componentDidMount(){
            this.loadData();
        }

        loadData(){
            var temp0 = LeeAlaCarteList;
            var temp1 = LeeBeveragesList;
            var temp2 = LeeDessertsList;
            var temp3 = LeeMealsList;
            var temp = [];

            temp.push(temp1);
            temp.push(temp2);
            temp.push(temp3);
            temp.push(temp0);

            this.setState({ stateArray: temp, dataArray: temp0, stateIndex: 0 });
            //this.setState({ dataArray: LeeBeveragesList });

        }

        componentWillUnmount(){
            this._clearAll();
        }

        _clearAll(){
            for( i = 0; i < this.state.stateArray.length; i++ ){
                for( j = 0; j < this.state.stateArray[i].length; j++ ){
                    this.state.stateArray[i][j].checked = false;
                }
            }
            this.setState({currentBalance: 0.0});
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

        incrementState(){
            this.setState({ stateIndex: this.state.stateIndex + 1, dataArray: this.state.stateArray[Math.abs(this.state.stateIndex%4)] });
        }

        decrementState(){
            this.setState({ stateIndex: this.state.stateIndex + 3, dataArray: this.state.stateArray[Math.abs((this.state.stateIndex-2)%4)] });
        }

    render(){
    //console.log(this.state.stateIndex);
    //console.log("Mod: "+(this.state.stateIndex%4));
    //console.log(this.state.stateIndex);
         return(
             <View style={styles.container}>
                 <Header
                     leftComponent={
                         <Icon
                             name='chevron-left'
                             color='white'
                             onPress={() => this.props.navigation.goBack()}
                             underlayColor='#512698'/>
                     }
                     centerComponent={{ text: 'Calculator', style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                 />

                 <Header
                     leftComponent={<Icon name='chevron-left' color='white' onPress={() => this.decrementState()} />}
                     centerComponent={{ text: this.state.titleArray[Math.abs(this.state.stateIndex%4)], style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}}
                     underlayColor='#512698'
                     rightComponent={<Icon name='chevron-right' color='white' onPress={() => this.incrementState()} />}
                 />

                 <ScrollView styles={styles.scrollContainer}>
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
                         <View style={styles.titleContainer}>
                             <Text style={ (this.state.currentBalance <= 7) ? styles.titleText : styles.balanceOver}>
                                 Current amount: ${this.state.currentBalance}
                             </Text>
                         </View>

                         <Button
                             title='Clear'
                             icon={{name: 'refresh'}}
                             onPress={() => {this._clearAll()}}
                         />
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
        backgroundColor: '#EEEEEE', //'#DCD0FE',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollText: {
        color: 'black',
        fontSize: 18,
    },
    titleContainer: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    balanceOver: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
/**
    * Kevin Chang, Dysron Marshall
    * (c) 01/2018
    */
import React, { Component } from 'react';
import { AppRegistry, Image, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Avatar, Button, Card, CheckBox, Header, Icon, List, ListItem } from 'react-native-elements';
import LeeMealsList from '../Resources/LeeMealsList.json';
import LeeAlaCarteList from '../Resources/LeeAlaCarteList.json';
import LeeBeveragesList from '../Resources/LeeBeveragesList.json';
import LeeDessertsList from '../Resources/LeeDessertsList.json';
import WhitmansBeveragesList from '../Resources/WhitmansBeveragesList.json';
import WhitmansDeliList from '../Resources/WhitmansDeliList.json';
import WhitmansDessertsList from '../Resources/WhitmansDessertsList.json';
import WhitmansFryerList from '../Resources/WhitmansFryerList.json';
import WhitmansGrillList from '../Resources/WhitmansGrillList.json';
import WhitmansMealList from '../Resources/WhitmansMealList.json';
import WhitmansSaladsList from '../Resources/WhitmansSaladsList.json';
import WhitmansTeppanyakiList from '../Resources/WhitmansTeppanyakiList.json';
import Item from './Item';

export default class ItemCalculator extends Component{

    constructor(props){
            super(props);
            this.state=
            {   currentBalance: 0.0,
                stateIndex: 0,
                stateArray: [[]],
                titleArray: [
                    [
                        'A la Carte',
                        'Beverages',
                        'Desserts',
                        'Meals'
                    ],[
                        'From the Deli',
                        'From the Grill',
                        'From the Fryer',
                        'Beverages',
                        'Teppanyaki',
                        'Salads',
                        'Make a Meal',
                        'Desserts'
                    ]
                ]
            };
        }

        componentDidMount(){
            this.loadData();
        }

        loadData(){
            var temp = [];
            if( this.props.navigation.state.params.flag ){
                temp.push(LeeAlaCarteList);
                temp.push(LeeBeveragesList);
                temp.push(LeeDessertsList);
                temp.push(LeeMealsList);
            } else {
                temp.push(WhitmansDeliList);
                temp.push(WhitmansGrillList);
                temp.push(WhitmansFryerList);
                temp.push(WhitmansBeveragesList);
                temp.push(WhitmansTeppanyakiList);
                temp.push(WhitmansSaladsList);
                temp.push(WhitmansMealList);
                temp.push(WhitmansDessertsList);
            }
            this.setState({ stateArray: temp });
        }

        componentWillUnmount(){
            this._clearAll();
        }

        _clearAll(){
            for( i = 0; i < this.state.stateArray.length; i++ ){
                for( j = 0; j < this.state.stateArray[i].length; j++ ){
                    this.state.stateArray[i][j].count = 0;
                }
            }
            this.setState({currentBalance: 0.0});
        }

        onClick( i ){
            this.state.stateArray[this.state.stateIndex][i].checked = !this.state.stateArray[this.state.stateIndex][i].checked;
            this.forceUpdate()
        }

        updatePrice = ( bool, price, j ) => {
            if( bool ){
                this.setState({currentBalance: Math.round((this.state.currentBalance + price)*100)/100 });
                this.state.stateArray[this.state.stateIndex][j].count++;
            } else {
                this.setState({currentBalance: Math.round((this.state.currentBalance - price)*100)/100 });
                this.state.stateArray[this.state.stateIndex][j].count--;
            }
        }

        incrementState(){
            if( this.props.navigation.state.params.flag ){
                this.setState({stateIndex: (this.state.stateIndex + 1)%4});
            } else {
                this.setState({stateIndex: (this.state.stateIndex + 1)%8});
            }
        }

        decrementState(){
            if( this.props.navigation.state.params.flag ){
                this.setState({stateIndex: (this.state.stateIndex + 3)%4});
            } else {
                this.setState({stateIndex: (this.state.stateIndex + 7)%8});
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
                             onPress={() => this.props.navigation.goBack()}
                             underlayColor='#512698'/>
                     }
                     centerComponent={{ text: 'Calculator', style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 55}}
                 />

                 <Header
                     leftComponent={<Icon name='chevron-left' color='white' onPress={() => this.decrementState()} />}
                     centerComponent={{ text: (this.props.navigation.state.params.flag) ? this.state.titleArray[0][this.state.stateIndex] : this.state.titleArray[1][this.state.stateIndex], style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}}
                     underlayColor='#512698'
                     rightComponent={<Icon name='chevron-right' color='white' onPress={() => this.incrementState()} />}
                 />

                 <ScrollView styles={styles.scrollContainer}>
                     <List containerStyle={{ marginTop: 5, marginBottom: 5 }}>
                       {

                         this.state.stateArray[this.state.stateIndex].map((l, i) => (
                           /*{<CheckBox
                             key={i}
                             title={l.name + " - ($" + l.price + ")"}
                             checked={this.state.stateArray[this.state.stateIndex][i].checked}
                             checkedColor='green'
                             onPress={() => { this.onClick(i); this.updatePrice(this.state.stateArray[this.state.stateIndex][i].checked,l.price) } }
                           />}*/
                           <ListItem
                                key={i}
                                title={l.name + " - ($" + l.price + ")"}
                                rightIcon={<Item changeState={this.updatePrice} price={l.price} change={this.state.globalCount} count={this.state.stateArray[this.state.stateIndex][i].count} item={i} />}
                              />
                         ))
                       }
                     </List>
                 </ScrollView>

                 <View>
                     <Card containerStyle={{ marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5 }}>
                         <View style={styles.titleContainer}>
                             <Text style={ (this.state.currentBalance <= 7) ? styles.titleText : styles.balanceOver}>
                                 Current Amount: ${this.state.currentBalance}
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
        color: 'green',
    },
    balanceOver: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
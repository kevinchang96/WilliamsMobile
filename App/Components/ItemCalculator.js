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
import WhitmansBeveragesList from './WhitmansBeveragesList.json';
import WhitmansDeliList from './WhitmansDeliList.json';
import WhitmansDessertsList from './WhitmansDessertsList.json';
import WhitmansFryerList from './WhitmansFryerList.json';
import WhitmansGrillList from './WhitmansGrillList.json';
import WhitmansMealList from './WhitmansMealList.json';
import WhitmansSaladsList from './WhitmansSaladsList.json';
import WhitmansTeppanyakiList from './WhitmansTeppanyakiList.json';

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
                    this.state.stateArray[i][j].checked = false;
                }
            }
            this.setState({currentBalance: 0.0});
        }

        onClick( i ){
            this.state.stateArray[this.state.stateIndex][i].checked = !this.state.stateArray[this.state.stateIndex][i].checked;
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
                           <CheckBox
                             key={i}
                             title={l.name + " - ($" + l.price + ")"}
                             checked={this.state.stateArray[this.state.stateIndex][i].checked}
                             checkedColor='green'
                             onPress={() => { this.onClick(i); this.updatePrice(this.state.stateArray[this.state.stateIndex][i].checked,l.price) } }
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
        color: 'green',
    },
    balanceOver: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
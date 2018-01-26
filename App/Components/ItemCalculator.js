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

        componentWillUnmount(){
            this._clearAll();
        }

        _clearAll(){
            for( i = 0; i < this.state.dataArray.length; i++ ){
                this.state.dataArray[i].checked = false;
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

    render(){
    console.log("Rendering...");
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
                     leftComponent={<Icon name='chevron-left' color='white' />}
                     centerComponent={{ text: 'A la Carte', style: { fontSize: 22, color: '#ffffff' } }}
                     outerContainerStyles={{backgroundColor: '#512698', borderBottomWidth: 0, padding: 10, height: 35}}
                     underlayColor='#512698'
                     rightComponent={<Icon name='chevron-right' color='white' />}
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
                             <Text style={ styles.titleText }>
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
    }

});

AppRegistry.registerComponent('ItemCalculator', () => ItemCalculator );
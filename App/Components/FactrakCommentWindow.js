/*
 * Dysron Marshall
 * (c) 01/2018
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { Divider, Card } from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';


export default class FactrakCommentWindow extends Component{
    constructor(props){
        super(props);
        this.state = {arr:[]};
    }

    componentDidMount(){
        this.createCommentWindow();
    }

    parseRetakeOrRecommend(retakeOrRecommend){
        const length = retakeOrRecommend.length;
        if(!length) return [];
        if(length == 1) return (<Text key={1}>{retakeOrRecommend[0]}</Text>);
        else if(length == 2) return([<Text key={1}>{retakeOrRecommend[0]}</Text>,
                                     <Text key={2}>{retakeOrRecommend[1]}</Text>]);
        else if(length == 3) return ([<Text key={1}>{retakeOrRecommend[0] + " " +
                                                     retakeOrRecommend[1] + " " +
                                                     retakeOrRecommend[2]}
                                      </Text>]);
        else if(length == 4){
            if(retakeOrRecommend[1] == 'not'){
                return ([<Text key={1}>{retakeOrRecommend[0] + " " +
                                retakeOrRecommend[1] + " " +
                                retakeOrRecommend[2]}
                         </Text>,
                         <Text key={2}>{retakeOrRecommend[3]}</Text>]);
            }
            else return ([<Text key={1}>{retakeOrRecommend[0]}</Text>,
                          <Text key={2}>{retakeOrRecommend[1] + " " +
                                 retakeOrRecommend[2] + " " +
                                 retakeOrRecommend[3]}
                          </Text>]);
        }
        else{
            return ([<Text key={1}>{retakeOrRecommend[0] + " " +
                            retakeOrRecommend[1] + " " +
                            retakeOrRecommend[2]}
                     </Text>,
                     <Text key={2}>{retakeOrRecommend[3] + " " +
                            retakeOrRecommend[4] + " " +
                            retakeOrRecommend[5]}
                     </Text>]);
        }
    }

    createCommentWindow(){
        const DOMParser = require('react-native-html-parser').DOMParser;
        const doc = new DOMParser().parseFromString(this.props.navigation.state.params.html,'text/html');
        const comments = doc.querySelect(".comment.comment-content")

        // contains review, retake/recommend, agree/disagree POST,
        const commentTexts = doc.getElementsByClassName('comment-text');

        const length = commentTexts.length;
        const commentDetails = doc.getElementsByClassName('comment-detail');    // postedWhen
        const commentContents = doc.getElementsByClassName('comment-content');

        let cards = [];     // contain comment cards
        
        for(let i = 0; i < length; i++){
            const comment = comments[i]
            const commentText = commentTexts[i];
            const commentDetail = commentDetails[i];
            const commentContent = commentContents[i];
            cards.push(this.createCommentCard(comment, commentText,commentDetail, commentContent));
        }
        this.setState({arr:cards});
    }

    createCommentCard(comment, commentText, commentDetail, commentContent){
        // done for each comment
        const title = commentContent.childNodes[1].textContent.trim().split(/\s\s+/g).join(' ');
        const id = comment.attributes[0].nodeValue.split('comment')[1];
        const uneditedAndDisagree = commentContent.childNodes[3].textContent.trim();
        const editedAgreeDisagree = uneditedAndDisagree.split(/\s\s+/g).join(' ');

        // create Text component for paragraphs and pushes retake/recommend for further parsing
        const childNodes = commentText.childNodes;
        const length = childNodes.length;
        let review = [];
        let retakeOrRecommend = []
        for(let i = 0; i < length; i++){
            const child = childNodes[i];
            if(child.previousSibling && child.nextSibling){
                if(child.tagName == 'p'){
                    review.push(<Text key={i}>{child.textContent.trim() + '\n'}</Text>);
                }
                else if((child.previousSibling.tagName == 'br' &&
                        (child.nextSibling.tagName == 'br' || child.nextSibling.tagName == 'b')) ||
                        (child.previousSibling.tagName == 'b' && child.nextSibling.tagName == 'br')){
                    retakeOrRecommend.push(child.textContent.trim());
                }
                if(child.tagName == 'b'){
                    retakeOrRecommend.push(child.textContent);
                }
            }
        }

        const responseComponents = this.parseRetakeOrRecommend(retakeOrRecommend);
        //console.log(responseComponents);
        //console.log(review);
        const postedWhen = commentDetail.childNodes[0].data.trim();
        const card = (<FactrakComment title={title} agreement={editedAgreeDisagree} review={review}
                        responseComponents={responseComponents}
                        postedWhen={postedWhen} key={id}/>);
        return card;
    }

    render(){
        return(
            <FlatList
                data={this.state.arr}
                renderItem={({item}) => item}
            />
        );
    }
}

export class FactrakComment extends Component{
    render(){
        return(
            <Card title={this.props.title}>
                <View style={styles.container}>
                    <Text style={styles.agreement}>{this.props.agreement}</Text>
                    <ReadMore numberOfLines={3}>
                        {this.props.review}
                    </ReadMore>
                    <Divider style={{ backgroundColor: 'gray' }} />
                    {this.props.responseComponents}
                    {/*<View style={styles.actions}>
                        <Button style={styles.button} title="Agree" onPress={this.agree}/>
                        <Button style={styles.button} title="Disagree" onPress={this.disagree}/>
                        <Button style={styles.button} title="Report" onPress={this.report}/>
                    </View>*/}
                    <Text style={styles.postedWhen}>{this.props.postedWhen}</Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    agreement:{
        fontSize: 20,
        color: 'black',
    },
    reviews:{
        paddingTop:5,
        paddingBottom:5,
        color: 'black'
    },
    button: {
        height: 20,
        width: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    postedWhen: {
        color: '#6f4993'
    }
});


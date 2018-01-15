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
  ScrollView
} from 'react-native';

export default class FactrakCommentWindow extends Component{
    constructor(props){
        super(props);
        this.state = {arr:[]};
    }

    componentDidMount(){
        this.createCommentWindow();
    }

    getRatings(ratingsList){
        const agree = ratingsList[0].innerText.trim();
        const disagree = ratingsList[1].innerText.trim();
        return {"agree":agree, "disagree":disagree};
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
        const comments = doc.querySelect(".comment.comment-content");

        // contains review, retake/recommend, agree/disagree POST,
        const commentTexts = doc.getElementsByClassName('comment-text');
        const length = commentTexts.length;
        // postedWhen
        const commentDetails = doc.getElementsByClassName('comment-detail');

        const commentContents = doc.getElementsByClassName('comment-content');

        let cards = [];

        for(let i = 0; i < length; i++){
            const commentText = commentTexts[i];
            const commentDetail = commentDetails[i];
            const commentContent = commentContents[i];
            cards.push(this.createCommentCard(commentText,commentDetail, commentContent, i));
        }
        this.setState({arr:cards});
    }

    createCommentCard(commentText, commentDetail, commentContent, key){
        // done for each comment
        const title = commentContent.childNodes[1].textContent.trim().split(/\s\s+/g).join(" ");

        const uneditedAndDisagree = commentContent.childNodes[3].textContent.trim();
        const editedAgreeDisagree = uneditedAndDisagree.split(/\s\s+/g).join(" ");

        // create Text component for paragraphs and pushes retake/recommend for further parsing
        const childNodes = commentText.childNodes;
        const length = childNodes.length;
        let review = [];
        let retakeOrRecommend = []
        for(let i = 0; i < length; i++){
            const child = childNodes[i];
            if(child.previousSibling && child.nextSibling){
                if(child.tagName == 'p'){
                    review.push(<Text>{child.textContent.trim()}</Text>);
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
                        postedWhen={postedWhen} key={key}/>);
        return card;
    }

    render(){
        return(
            <ScrollView>
                {this.state.arr}
            </ScrollView>
        );
    }
}

export class FactrakComment extends Component{
    // need to use this.props.html and this.props.id to simulate rating/reporting
    agree(){
        console.log('agree');
    }
    disagree(){
        console.log('disagree');
    }
    report(){
        console.log('report');
    }
    render(){

        return(
            <View style={styles.comment}>
                <Text>{this.props.title}</Text>
                <Text>{this.props.agreement}</Text>
                {this.props.review}
                {this.props.responseComponents}
                <View style={styles.actions}>
                    <TouchableOpacity title="Agree" onPress={this.agree}>
                        <Image style={styles.button} source={require('../img/thumbs-up.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity title="Disagree" onPress={this.disagree}>
                        <Image style={styles.button} source={require('../img/thumbs-down.png')}/>
                    </TouchableOpacity>
                    <Button style={styles.button} title="Report" onPress={this.report}/>
                </View>
                <Text>{this.props.postedWhen}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    comment:{

    },
    button: {
        height: 20,
        width: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});


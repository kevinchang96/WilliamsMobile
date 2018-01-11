import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

export default class FactrakCommentWindow extends Component{
    /* props needed for each comment card:
        html - the NodeList
        professorName, courseNo
        numAgree, numDisagree
        responseComponents
        decisionComponents - recommend course & take again
        postedWhen
    */

    createDoc(){
        let doc = new DOMParser().parseFromString(this.props.html,'text/html');
        return doc;
    }

    getComments(doc){
        // doc goes as the parameter
        return doc.querySelectorAll("article .comment div.comment-content");
    }

    getRatings(ratingsList){
        const agree = ratingsList[0].trim();
        const disagree = ratingsList[1].trim();
        return {"agree":agree, "disagree":disagree};
    }

    parseOpinions(children){
        // need to complete
        let takeAgain = 'I would retake this course';
        let wouldRecommend = 'I would recommend this course';
        let arr = [];


        if(!takeAgain) arr.append(takeAgain);
        if(!wouldRecommend) arr.append(wouldRecommend);
        return arr;
    }

    createCommentCard(comment){
        // done for each comment
        const id = comment.id.split('comment')[1];
        const votes = getRatings(comment.querySelectorAll("span[id=agree-count]"));
        const numAgree = votes.agree;
        const numDisagree = votes.disagree;
        const responses = comment.querySelectorAll(".comment-content p:not([class])"); // list of paragraph nodes
        const responseComponents = Array.from(comment).map((response) =>
            <Text>{response.innerText.trim()}</Text>);
        const retakeOrRecommend = parseOpinions(comment.querySelector(".comment-content div").childNodes);
        const decisionComponents = Array.from(retakeOrRecommend).map((decision) =>
            <Text>{decision.innerText.trim()}</Text>)
        const postedWhen = comment.querySelector(".comment-detail").innerText.trim();
    }

    render(){
        return(
            <View>

            </View>
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
                <Text>{this.props.professorName} | {this.props.courseNo}</Text>
                <Text>{this.props.numAgree} agree, {this.props.numDisagree} disagree</Text>
                {this.props.decisionComponents}
                <Text>{this.props.response}</Text>
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
    }
});

AppRegistry.registerComponent('FactrakCommentWindow', () => Factrak);
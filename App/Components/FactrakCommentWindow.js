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

    constructor(props){
        super(props);
        this.state = {arr:[]};
    }

    getRatings(ratingsList){
        const agree = ratingsList[0].innerText.trim();
        const disagree = ratingsList[1].innerText.trim();
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
    createCommentWindow(){
        const DOMParser = require('react-native-html-parser').DOMParser;
        const doc = new DOMParser().parseFromString(this.props.navigation.state.params.html,'text/html');
        const comments = doc.querySelect(".comment.comment-content");

        const id = comments[0].getElementsBySelector("[id^=flag]")
        console.log(id);
        const comment = doc.getElementsByClassName('comment-text');
        console.log(comment);

        return;
        let cards = [];
        comments.forEach((comment) => cards.push(createCommentCard));
        this.setState(arr:comment);
        console.log(this.state);
    }

    createCommentCard(comment){
        // done for each comment




        const id = comment.querySelector("[id^=flag]").id.split("flag")[1]
        const votes = getRatings(comment.querySelectorAll("span[id$=agree-count]"));
        const numAgree = votes.agree;
        const numDisagree = votes.disagree;
        const responses = comment.querySelectorAll(".comment-content p:not([class])"); // list of paragraph nodes
        const responseComponents = Array.from(comment).map((paragraph,i) =>
            <Text key={i}>{paragraph.innerText.trim()}</Text>);
        const retakeOrRecommend = parseOpinions(comment.querySelector(".comment-content div").childNodes);
        const decisionComponents = Array.from(retakeOrRecommend).map((decision,i) =>
            <Text key={i}>{decision.innerText.trim()}</Text>);
        const postedWhen = comment.querySelector(".comment-detail").innerText.trim();

        const card = (<FactrakComment numAgree={numAgree} numDisagree={numDisagree}
                        decisionComponents={decisionComponents} response={responseComponents}
                        postedWhen={postedWhen}/>);
        return card;
    }

    render(){
        console.log(this);
        {this.createCommentWindow()}
        return(
            <View>
                {this.state.arr}
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
    }
});


import React from "react";
import axios from "axios";
import Avatar from "antd/es/avatar";
import Comment from "antd/es/comment";
import {Button} from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import Answer from "./forms/Answer/Answer";
export default class questionForm extends React.Component {

    state = {questions: []};


    async getAll () {
        try {
            this.setState({questions: [{i: "1",t:"How do I become a better Person?", u:"6666", b:"I have been feeling worthless lately and I dont know how to get more people to like me."}, {i: "2", t:"How do I become a better Person?", u:"6666", b:"I have been feeling worthless lately and I dont know how to get more people to like me."},{i:"3",t:"How do I become a better Person?", u:"6666", b:"I have been feeling worthless lately and I dont know how to get more people to like me."} ]});

        } catch (error) {
            console.error(error);
        }
    }
    renderTableData() {
        return this.state.questions.map((question, index) => {
            const { t, u, b,  i } = question //destructuring
            {/*https://ant.design/components/comment/*/}
            return (
                <div >
                <Comment
                    style={{width: "100%"}}
                    author={<a>{u}</a>}
                    avatar={
                        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                            {u}
                        </Avatar>
                    }
                    content={
                        <p>
                            <h3>{t}</h3>
                            <p>{b}</p>
                        </p>

                    }
                    datetime={
                        "Some Time ago"
                    }
                /><Link to={'/answer/' + i}><Button type="primary" >Answer</Button></Link>
                </div>


            )
        })
    }
    render() {
        this.getAll();
    return (
        <div style={{width: "100%", paddingLeft: "35%", paddingTop: "3%"}}>
            <table id='questions'>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </table>
        </div>
    )
    }
}

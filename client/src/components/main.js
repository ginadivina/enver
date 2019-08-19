import React from "react";
import axios from "axios";
import Avatar from "antd/es/avatar";
import Comment from "antd/es/comment";
import {Button} from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import Answer from "./forms/Answer/Answer";
import {MoneyButtonClient} from "@moneybutton/api-client";
export default class questionForm extends React.Component {

    state = {questions: []};

    async componentDidMount () {

        this.getAll()

    }


    async getAll () {
        try {
            const response = await axios.get('/api/question/getAll');
            console.log(response);
            let questions = [];
            response.data.forEach(function (data) {
                questions.push(data)
            });

            console.log(questions);
            this.setState({questions: questions});
        } catch (error) {
            console.error(error);
        }
    }
    renderTableData() {

        return this.state.questions.map((question, index) => {
            console.log(question)
            const { body, code, date, payout, pinned, tags, title, username, __v, id} = question //destructuring
            {/*https://ant.design/components/comment/*/}
            console.log(body, title, username, date, id)
            return (
                <div >
                <Comment
                    style={{width: "100%"}}
                    author={<a>{username}</a>}
                    avatar={
                        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                            {username}
                        </Avatar>
                    }
                    content={
                        <p>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </p>

                    }
                    datetime={
                        date
                    }
                /><Link to={'/answer/' + id}><Button type="primary" >Answer</Button></Link>
                </div>


            )
        })
    }
    render() {
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

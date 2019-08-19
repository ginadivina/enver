import React, {useState} from "react";
import { Button, Input, Form } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import MoneyButton from '@moneybutton/react-money-button'
import {MoneyButtonClient} from "@moneybutton/api-client";

import Text from "antd/es/typography/Text";
import Avatar from "antd/es/avatar";
import Comment from "antd/es/comment";
let bsv = require('bsv');
const uuidv4 = require('uuid/v4');
const {TextArea} = Input;
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28';

let moneyButtonClient = null;
let user = null;
let namespace = '1DxZKEejyfuLP7f6p5ockEmVDZu4XPmhhL';

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default class questionForm extends React.Component {

    state = {
        question: {},
        title: "",
        body: "",
        user: "",
        script: {},

    };

    async componentDidMount () {
        moneyButtonClient = new MoneyButtonClient(
            OAUTH_IDENTIFIER
        );
        console.log(this.props.match.params.id)
        this.getById();
        try {
            user = await moneyButtonClient.getIdentity();
            console.log(user);
            this.setState({user: user.id});
        } catch (e) {
            console.log(e)
        }

    }

    async getById () {
        try {
            const response = await axios.get('/api/question/' + this.props.match.params.id);
            console.log(response.data);
            this.setState({question: response.data[0]});
            console.log(this.state.question.body)
        } catch (error) {
            console.error(error);
        }
    }

    async handleOnPayment () {
        await sleep(4000);
        window.location = '/questions'
    }





    render () {
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(this.state.script.toString());
            let question = {t: this.state.title, u: this.state.user, b: this.state.body};
            console.log(question)
            let output = bsv.Script.buildSafeDataOut([namespace, JSON.stringify(question)]).toASM();
            this.setState({script: output});
            console.log(bsv.Script.buildSafeDataOut([output]).toString());
            console.log(this.state.script.toString());
        }
        let id = this.props.match.params.id;
        console.log(id);


        return(
            <>
                <div style={{paddingTop: "5%", width: "100%", paddingLeft: "25%"}}>
                <Comment
                    style={{width: "100%"}}
                    author={<a>author</a>}
                    avatar={
                        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                            {this.state.question.username}
                        </Avatar>
                    }
                    content={
                        <p>
                            <h3>{this.state.question.title}</h3>
                            <p>{this.state.question.body}</p>
                        </p>

                    }
                    datetime={
                        this.state.question.date
                    }
                /></div>

                {/*<Form onSubmit={handleSubmit}>*/}
                <div>
                    <Input name="title" style={{width: "50%", marginLeft:'25%', marginTop:"1%", zIndex: 1}} placeholder="A simple description of your answer" onChange={event => this.setState({title: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {i: uuidv4(), t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
                </div>
                <div>
                    <TextArea name="body" style={{width: "50%", marginLeft:'25%', zIndex: 1}} rows={10} placeholder="In detail answer the question if your answer is selected then you will be rewarded with the bounty!" onChange={event => this.setState({body: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {i: uuidv4(), t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
                </div>
                {/*<TextArea name="code" rows={4} placeholder="Describe Your issue." onChange={event => setCode(event.target.value)}/>*/}
                {/*  <Button name="submit" type="default" htmlType="submit" value="Submit">Set Post</Button>*/}
                {/*</Form>*/}
                <div style={{ marginLeft:'47%', zIndex: 1}}>
                    <MoneyButton

                        label={"Submit"}
                        outputs={[{
                            'userId':this.state.u,
                            'script': this.state.script,
                            'amount': "0",
                            'currency': "BSV"
                        }]}
                        onPayment={this.handleOnPayment}
                    />
                </div>
                <img src={"https://gw.alipayobjects.com/zos/rmsportal/ZsWYzLOItgeaWDSsXdZd.svg"} width={'100%'} style={{zIndex:'-1', position:'absolute'}} alt={null}/>

            </>
        )
    }


};

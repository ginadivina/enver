import React, {useState} from "react";
import { Button, Input, Form } from "antd";
import { connect } from "react-redux";
import MoneyButton from '@moneybutton/react-money-button'
import {MoneyButtonClient} from "@moneybutton/api-client";
import Text from "antd/es/typography/Text";
let bsv = require('bsv');


const {TextArea} = Input;
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28';

let moneyButtonClient = null;
let user = null;
let namespace = '1HUqKEetMXpByShDnybNNGBhZMcTjtE6RG';

export default class questionForm extends React.Component {
  state = {
      title: "",
      body: "",
      user: "",
      script: {}
  }
  ;
  async componentDidMount () {
    moneyButtonClient = new MoneyButtonClient(
        OAUTH_IDENTIFIER
    );
    user = await moneyButtonClient.getIdentity();
    console.log(user);
    this.setState({user: user.id});
    console.log(this.state.user)

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

    return(
        <>
          <h1>New Question</h1>
          {/*<Form onSubmit={handleSubmit}>*/}
          <Input name="title"  placeholder="What is it you need help with?" onChange={event => this.setState({title: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
          <TextArea name="body" rows={4} placeholder="Describe Your issue." onChange={event => this.setState({body: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
          {/*<TextArea name="code" rows={4} placeholder="Describe Your issue." onChange={event => setCode(event.target.value)}/>*/}
          {/*  <Button name="submit" type="default" htmlType="submit" value="Submit">Set Post</Button>*/}
          {/*</Form>*/}
          <div>
            <MoneyButton
                label={"Submit"}
                outputs={[{
                  'userId':this.state.u,
                  'script': this.state.script,
                  'amount': "0.001",
                  'currency': "USD"
                },
                  {
                    'paymail': "9552@moneybutton.com",
                    'amount': "0.2",
                    'currency': "USD"
                  }]}
            />
          </div>

        </>
    )
  }


};

// const mapStateToProps = (state) => {
//   return{
//     question: state.question
//   }
// }

// export default connect(mapStateToProps)(QuestionForm);

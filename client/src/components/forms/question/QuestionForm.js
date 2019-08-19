import React from "react";
import {Input, Row} from "antd";
import MoneyButton from '@moneybutton/react-money-button'
import {MoneyButtonClient} from "@moneybutton/api-client";
import questions from './undraw_post_online_dkuk.svg';
import bitcoinsv from "../../bitcoin-sv-1.svg";

let bsv = require('bsv');
const uuidv4 = require('uuid/v4');

const {TextArea} = Input;
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28';

let moneyButtonClient = null;
let user = null;
let namespace = '1HUqKEetMXpByShDnybNNGBhZMcTjtE6RG';

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default class questionForm extends React.Component {
  state = {
      title: "",
      body: "",
      user: "",
      amount: "",
      script: {}
  }
  ;
  async componentDidMount () {
    moneyButtonClient = new MoneyButtonClient(
        OAUTH_IDENTIFIER
    );
    try {
        user = await moneyButtonClient.getIdentity();
        console.log(user);
        this.setState({user: user.id});
    } catch (e) {
        console.log(e)
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
       console.log(question);
      let output = bsv.Script.buildSafeDataOut([namespace, JSON.stringify(question)]).toASM();
        this.setState({script: output});
        console.log(bsv.Script.buildSafeDataOut([output]).toString());
        console.log(this.state.script.toString());
    }


    return(
        <>

          {/*<Form onSubmit={handleSubmit}>*/}
          <div>
              <h2 style={{width: "50%", marginLeft:'25%', marginTop:"1%", zIndex: 1}}>New Question</h2>
          <Input name="title" style={{width: "50%", marginLeft:'25%', marginTop:"1%", zIndex: 1}} placeholder="What is it you need help with?" onChange={event => this.setState({title: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {i: uuidv4(),t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
              <Row>
                  <br></br>
              </Row>
          </div>
            <div>
          <TextArea name="body" style={{width: "50%", marginLeft:'25%', zIndex: 1}} rows={10} placeholder="Describe Your issue." onChange={event => this.setState({body: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {i: uuidv4(), t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
            </div>
            <div>
                <Row>
                    <br></br>
                </Row>
                <TextArea name="body" style={{width: "50%", marginLeft:'25%', zIndex: 1}} rows={1} placeholder="How much do you want to bounty in BSV?" onChange={event => this.setState({amount: event.target.value, script: bsv.Script.buildSafeDataOut([namespace, JSON.stringify( {i: uuidv4(), t: this.state.title, u: this.state.user, b: this.state.body})]).toASM()})}/>
            </div>
          {/*<TextArea name="code" rows={4} placeholder="Describe Your issue." onChange={event => setCode(event.target.value)}/>*/}
          {/*  <Button name="submit" type="default" htmlType="submit" value="Submit">Set Post</Button>*/}
          {/*</Form>*/}
          <div style={{ marginLeft:'25%', zIndex: 1}}>
              <Row><br></br></Row>
            <MoneyButton

                label={"Submit"}
                outputs={[{
                  'userId':this.state.u,
                  'script': this.state.script,
                  'amount': "0",
                  'currency': "BSV"
                },
                  {
                    'paymail': "9552@moneybutton.com",
                    'amount': this.state.amount ? this.state.amount : "0.0014",
                    'currency': "BSV"
                  }]}
                onPayment={this.handleOnPayment}
            />
              <Row><br></br></Row><Row><br></br></Row><Row><br></br></Row><Row><br></br></Row>
              <Row style={{ marginLeft:'25%'}}><img src={questions} width={"400"} height={"400"}/></Row>
              <Row><br></br></Row><Row><br></br></Row><Row><br></br></Row><Row><br></br></Row><Row><br></br></Row><Row><br></br></Row>

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

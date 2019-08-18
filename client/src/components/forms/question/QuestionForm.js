import React, {useState} from "react";
import { Button, Input, Form } from "antd";
import { connect } from "react-redux";
import MoneyButton from '@moneybutton/react-money-button'

const {TextArea} = Input;

const QuestionForm = (props) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [code, setCode] = useState('');

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(body)
    // }

  return (
    <>
      <h1>New Question</h1>
      {/*<Form onSubmit={handleSubmit}>*/}
        <Input name="title"  placeholder="What is it you need help with?" onChange={event => setTitle(event.target.value)}/>
        <TextArea name="body" rows={4} placeholder="Describe Your issue." onChange={event => setBody(event.target.value)}/>
        {/*<TextArea name="code" rows={4} placeholder="Describe Your issue." onChange={event => setCode(event.target.value)}/>*/}
        {/*<Button name="submit" htmlType="submit" value="Submit"/>*/}
      {/*</Form>*/}
      <div>
        <p>Bounty your question</p>
        <MoneyButton
            to={"9552"}
            amount={"0.01"}
            currency={'USD'}
        />
      </div>

    </>
  )
};

const mapStateToProps = (state) => {
  return{
    question: state.question
  }
} 

export default connect(mapStateToProps)(QuestionForm);

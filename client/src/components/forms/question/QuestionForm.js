import React from "react";
import { Button, Input, Form } from "antd";
import { connect } from "react-redux";

const {TextArea} = Input;

const QuestionForm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const data = new FormData(event.target);
  }

  return (
    <>
      <h1>New Question</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="title" placeholder="What is it you need help with?" />
        <TextArea name="body" rows={4} placeholder="Describe Your issue."/>
        <Button name="submit" htmlType="submit" value="Submit"/>
      </Form>
    </>
  )
};

const mapStateToProps = (state) => {
  return{
    question: state.question
  }
} 

export default connect(mapStateToProps)(QuestionForm);
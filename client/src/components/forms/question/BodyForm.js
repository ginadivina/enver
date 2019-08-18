import React from "react";
import { Input } from "antd";
import { connect } from "react-redux";

const { TextArea } = Input;

const BodyForm = () => {
  return (
    <>
      <TextArea rows={4} placeholder="Describe Your issue."/>
      <TextArea rows={4} placeholder="Paste your code into here."/>
    </>
  )
};

const mapStateToProps = (state) => {
  return{
    question: state.question
  }
} 

export default connect(mapStateToProps)(BodyForm);
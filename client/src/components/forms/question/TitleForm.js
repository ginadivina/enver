import React from "react";
import { Input } from "antd";
import { connect } from "react-redux";

const TitleForm = (props) => {

  return (
    <Input placeholder="What is it you need help with?" onChange={e => console.log(e)}/>
  )
};

const mapStateToProps = (state) => {
  return{
    question: state.question
  }
} 

export default connect(mapStateToProps)(TitleForm);
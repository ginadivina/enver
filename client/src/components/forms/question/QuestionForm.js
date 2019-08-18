import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export const TitleForm = (props) => {
  console.log(props);
  return (
    <Input placeholder="What is it you need help with?" onChange={console.log('hi')}/>
  )
};

export const BodyForm = () => {
  return (
    <>
    <TextArea rows={4} placeholder="Describe Your issue."/>
    <TextArea rows={4} placeholder="Paste your code into here."/>
  </>
  )
};

export const ReviewForm = () => {
  return (
    <>

    </>
  )
};
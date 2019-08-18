import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

export const TitleForm = () => {
  return (
    <Input placeHolder="What is it you need help with?"/>
  )
};

export const BodyForm = () => {
  return (
    <>
    <TextArea rows={4} placeHolder="Describe Your issue."/>
    <TextArea rows={4} placeHolder="Paste your code into here."/>
  </>
  )
};

export const ReviewForm = () => {
  return (
    <>

    </>
  )
};
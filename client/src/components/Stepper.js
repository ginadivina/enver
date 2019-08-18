import React, {Component} from "react";
import { Button, Steps } from "antd";
import { connect } from "react-redux";

import TitleForm from "./forms/question/TitleForm";
import BodyForm from "./forms/question/BodyForm";
import ReviewForm from "./forms/question/ReviewForm";

const { Step } = Steps;

class Stepper extends Component {

  state = {
    current: 0,
    maxSteps: 3,
  };

  

  onPreviousClick = () => {
    const newValue = this.state.current > 0 ? this.state.current - 1 : this.state.current;
    this.setState({current: newValue});
  }

  onNextClick = () => {
    const { maxSteps } = this.state;
    const newValue = this.state.current < maxSteps ? this.state.current + 1 : this.state.current;
    this.setState({current: newValue});
  }

  onTitleChange = (value) => {
    this.setState({title: value});
  }

  render(){

    const steps = [
      {
        title: "question",
        content: <TitleForm />,
      },
      {
        title: "body",
        content: <BodyForm />,
      },
      {
        title: "review",
        content: <ReviewForm />,
      },
    ];

    const {current } = this.state;
    return (
      <>
        <Steps size="small" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[current].content}

        <Button 
        onClick={this.onPreviousClick}
        >
          Previous
        </Button>
        <Button
        onClick={this.onNextClick}>
          Next
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    question: state.question
  }
}

export default connect(mapStateToProps)(Stepper);
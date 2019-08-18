import React, {Component} from "react";
import { Button, Steps } from "antd";

import { TitleForm } from "./forms/question/TitleForm";

const { Step } = Steps;

class Stepper extends Component {

  state = {
    current: 0,
    maxSteps: 3,
    steps: [
      {
        title: "question",
        content: <TitleForm />,
      },
      {
        title: "body",
        content: "content",
      },
      {
        title: "review",
        content: "content",
      },
    ]
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

  render(){
    const { steps, current } = this.state;

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

export default Stepper;
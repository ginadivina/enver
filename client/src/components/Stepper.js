import React, {Component} from "react";
import { Button, Steps } from "antd";

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

  render(){

    return (
      <>
        <Steps size="small" current={this.state.current}>
          <Step title="Question" />
          <Step title="Body" />
          <Step title="Review" />
        </Steps>
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
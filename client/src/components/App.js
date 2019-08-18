import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import QuestionForm from "./forms/question/QuestionForm";


class App extends Component {

  render () {
    return(
      <Router>
        {/* <Route path="/" component={}> */}
        <Route path="/question/new" component={QuestionForm}/>
      </Router>
    )
  }
}

export default App;
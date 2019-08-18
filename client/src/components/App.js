import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Stepper from "./Stepper"


class App extends Component {

  render () {
    return(
      <Router>
        {/* <Route path="/" component={}> */}
        <Route path="/question/new" component={Stepper}/>
      </Router>
    )
  }
}

export default App;
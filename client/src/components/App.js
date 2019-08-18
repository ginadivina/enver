import React, { Component} from "react";

import NavBar from './NavBar/NavBar';
import LandingPage from './LandingPage/LandingPage';
import Stepper from "./Stepper"


class App extends Component {

  render () {
    return(
      <div>
          <NavBar/>
          <LandingPage/>
          <h1> Enver Overflow >:D </h1>
        <Stepper />
      </div>
    )
  }
}

export default App;
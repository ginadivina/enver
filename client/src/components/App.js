import { MoneyButtonClient } from '@moneybutton/api-client'
import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OathCallback from "./OathCallback";
import { Button } from 'antd';
// const cors = require('cors');
// const express = require('express');
// const responseTime = require('response-time');
// const session = require('express-session');

/**
 *
 */
import QuestionForm from "./forms/question/QuestionForm";
import NavBar from './NavBar/NavBar';
import LandingPage from './LandingPage/LandingPage';
import Stepper from "./Stepper"



/**
 *
 */


/**
 *
 */

const user = {}

let moneyButtonClient = null

class App extends Component {
    /**
     *
     */





  render () {
    return(
        <>

        <NavBar/>
        <LandingPage/>
        <h1> Enver Overflow >:D </h1>

      <Router>
        {/* <Route path="/" component={}> */}
        <Route path="/question/new" component={QuestionForm}/>
        <Route path="/oauthCallback" component={OathCallback}/>
      </Router>

      </>
    )
  }
}

export default App;

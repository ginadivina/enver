import { MoneyButtonClient } from '@moneybutton/api-client'
import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OathCallback from "./OathCallback";
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
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28'
const OAUTH_REDIRECT_URI = 'http://localhost:3000/oauthCallback'

/**
 *
 */

const user = {}

let moneyButtonClient = null

class App extends Component {
    /**
     *
     */


    linkWithMoneyButton = async () => {
        try {
            moneyButtonClient = new MoneyButtonClient(
                OAUTH_IDENTIFIER
            )
            moneyButtonClient.requestAuthorization(
                'auth.user_identity:read',
                OAUTH_REDIRECT_URI
            )
        } catch (err) {
            console.error(err)
        }
    }


  render () {
    return(
        <>
        <NavBar/>
        <LandingPage/>
        <h1> Enver Overflow >:D </h1>
        <header>
            {
                user !== null ? (
                    <div><br />
                        {
                            user.moneyButtonId === undefined ? (
                                <div>
                                    <button onClick={this.linkWithMoneyButton}>
                                        Link with Money Button
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p>✔ Linked with Money Button.</p>
                                </div>
                            )
                        }

                    </div>
                ) : null
            }
        </header>
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

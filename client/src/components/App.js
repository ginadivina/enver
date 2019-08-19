import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OathCallback from "./OathCallback";
import {Button, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import {MoneyButtonClient} from "@moneybutton/api-client";
import QuestionForm from "./forms/question/QuestionForm";
import main from "./main";
import NavBar from './NavBar/NavBar';
import LandingPage from './LandingPage/LandingPage';
import Stepper from "./Stepper"
import Answer from "./forms/Answer/Answer";
// const cors = require('cors');
// const express = require('express');
// const responseTime = require('response-time');
// const session = require('express-session');
const { Header } = Layout;
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28'
const OAUTH_REDIRECT_URI = 'http://localhost:3000/oauthCallback'
/**
 *
 */




/**
 *
 */


/**
 *
 */

let moneyButtonClient = null;
class App extends Component {
    /**
     *
     */
    state = {
        loggedIn : false
    }




  render () {
        let linkWithMoneyButton = () => {
            try {
                moneyButtonClient = new MoneyButtonClient(
                        OAUTH_IDENTIFIER
                    );
                moneyButtonClient.requestAuthorization(
                    'auth.user_identity:read',
                    OAUTH_REDIRECT_URI
                );
                this.setState({loggedIn: true})
            } catch (err) {
                console.error(err)
            }
        };
        if (moneyButtonClient != null){
            this.setState({loggedIn: true})
        }
        let login;
        if(!this.state.loggedIn){
            login =  <Menu.Item key="4" onClick={linkWithMoneyButton}>Log in</Menu.Item>
        } else {
            login = <Menu.Item key="4" >Log Off</Menu.Item>
        }


    return(
        <>



      <Router>
          <Header style={{ position: 'fixed', width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1"><Link to={'/'}/>Home</Menu.Item>
                  <Menu.Item key="2"><Link to={'/questions'}/>Questions</Menu.Item>
                  <Menu.Item key="3" ><Link to={'/question/new'}/>Ask</Menu.Item>
                  {/*/!*Need to set disable when logged in*!/*/}
                  {login}
              </Menu>
          </Header>
        {/* <Route path="/" component={}> */}
        <Route path="/question/new" component={QuestionForm}/>
        <Route path="/answer/:id" component={Answer}/>
        <Route path="/oauthCallback" component={OathCallback}/>
        <Route path="/questions" component={main}/>

      </Router>
      <LandingPage/>


      </>
    )
  }
}

export default App;

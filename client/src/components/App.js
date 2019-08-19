import React, { Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OathCallback from "./OathCallback";
import { Layout, Menu, Row } from 'antd';
import {Link} from 'react-router-dom';
import {MoneyButtonClient} from "@moneybutton/api-client";
import QuestionForm from "./forms/question/QuestionForm";
import main from "./main";
import logo from './asksv-logo.svg';
import bitcoinsv from './bitcoin-sv-1.svg';
import LandingPage from './LandingPage/LandingPage';
import Answer from "./forms/Answer/Answer";

const { Footer } = Layout;
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28';
const OAUTH_REDIRECT_URI = 'http://localhost:3000/oauthCallback';

let moneyButtonClient = null;
class App extends Component {
    state = {
        loggedIn : false
    };

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
        <Router>
            <div>
                  <nav>
                      <Menu
                          mode="horizontal"
                          defaultSelectedKeys={['1']}
                          style={{ lineHeight: '64px' }}
                        >
                          <Menu.Item ><img src={logo} width={"100"} height={"50"}/></Menu.Item>
                          <Menu.Item key="1"><Link to={'/home'}/>Home</Menu.Item>
                          <Menu.Item key="2"><Link to={'/questions'}/>Questions</Menu.Item>
                          <Menu.Item key="3" ><Link to={'/question/new'}/>Ask</Menu.Item>
                          {/*/!*Need to set disable when logged in*!/*/}
                          {login}
                      </Menu>
                  </nav>
                {/* <Route path="/" component={}> */}
                <Route path="/home" component={LandingPage}/>
                <Route path="/question/new" component={QuestionForm}/>
                <Route path="/answer/:id" component={Answer}/>
                <Route path="/oauthCallback" component={OathCallback}/>
                <Route path="/questions" component={main}/>

                <Footer style={{ textAlign: 'center' }}>
                    <Row>
                        Powered by BSV <img src={bitcoinsv} width={"100"} height={"50"}/>
                        ©2019 Created by Enver
                    </Row>
                </Footer>
            </div>
        </Router>

    )
  }
}

export default App;

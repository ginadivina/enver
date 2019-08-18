import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Layout, Menu} from 'antd';
import {MoneyButtonClient} from "@moneybutton/api-client";
const OAUTH_IDENTIFIER = '116d2d894e5052b0394f45a865fb4d28'
const OAUTH_REDIRECT_URI = 'http://localhost:3000/oauthCallback'
const { Header } = Layout;

let moneyButtonClient = null

function NavBar() {
    let linkWithMoneyButton = async () => {
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
    let handleNavAsk = () => {
        window.location = "/question/new"
    }
    let handleNavMain = () => {
        window.location = "/"
    }
    let handleSelected = () => {
            return (window.location.pathname  === '/' ? 1 : 2).toString()
    }
    return (
        <div>
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"

            defaultSelectedKeys={[handleSelected()]}
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="1" onClick={handleNavMain}>Home</Menu.Item>
            <Menu.Item key="2" onClick={handleNavAsk}>Ask</Menu.Item>
            {/*Need to set disable when logged in*/}
            <Menu.Item key="3" onClick={linkWithMoneyButton}>Log in</Menu.Item>
        </Menu>
    </Header>

</Layout>
        </div>
    );
}

export default NavBar;

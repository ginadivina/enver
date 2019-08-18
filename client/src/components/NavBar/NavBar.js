import React from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function NavBar() {
    return (
        <div>
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Ask</Menu.Item>
            <Menu.Item key="3">Answer</Menu.Item>
        </Menu>
    </Header>

</Layout>
        </div>
    );
}

export default NavBar;
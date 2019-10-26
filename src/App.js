import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { Layout, Menu, Icon } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import { Routes } from './routes';

const { Header, Sider, Content, Footer } = Layout;
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">IT Interview</div>
            <Switch>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span><Link to="/">Home</Link></span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span><Link to="/about-us">About us</Link></span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span><Link to="/contact">Contact</Link></span>
              </Menu.Item>
            </Menu>
            </Switch>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >

              <Routes />
            </Content>
            <Footer style={{ textAlign: 'center' }}>IT interviews ©2019 Created by <a href="https://github.com/sureshHARDIYA">sureshHARDIYA</a> with <span className="heart"><Icon type="heart" theme="filled"/></span></Footer>
          </Layout>
        </Layout>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

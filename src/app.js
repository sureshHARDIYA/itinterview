import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import Categories from "./pages/categories/index";
import CategoriesDetail from "./pages/categories/detail";
import Practice from "./pages/questionnaries/practice/index";
import Login from "./pages/register/login";
import SignUp from "./pages/register/signup";

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: true
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };  

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
            <div style={{position: "absolute", right: 30, top: 0}}>
              <Link style={{marginRight: 10}} to={"/sign-in"}>Login</Link>
              <Link to={"/sign-up"}>Sign up</Link>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/categories">Category</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route exact path="/" component={Categories} />
                <Route
                  exact
                  path="/categories/:id"
                  component={CategoriesDetail}
                />
                <Route
                  exact
                  path="/categories/:id/practice"
                  component={Practice}
                />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2020 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;

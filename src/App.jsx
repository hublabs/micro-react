import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  DesktopOutlined,
  BarsOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import Home from "./pages/home";
import List from "./pages/list";
import Login from "./pages/login";
import './App.css'

const { Sider, Content } = Layout;

const menus = [
  {
    key: "react",
    route: "/",
    title: "主页",
    icon: <DesktopOutlined />,
  },
  {
    key: "react-list",
    route: "/list",
    title: "列表页",
    icon: <BarsOutlined />,
  },
];

if (process.env.REACT_APP_ENV !== 'prd') {
  menus.push({
    key: "react-login",
    route: "/tempLogin",
    title: "登录",
    icon: <LoginOutlined />,
  })
}

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "";
const App = () => {
  const [refresh, setRefresh] = useState(0);
  const [selectedKeys, setSelectKeys] = useState(["react"]);
  const [collapsed, setCollapsed] = useState(false); // 折叠做菜单开关

  useEffect(() => {
    const { pathname } = window.location;
    const menu = menus.find(
      (item) => `${BASE_NAME}${item.route}` === pathname
    );
    setSelectKeys(() => [menu ? menu.key : "react"]);
    // console.log("env=>", process.env.REACT_APP_ENV);
  }, [refresh]);

  return (
    <Router basename={BASE_NAME} >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme='dark' collapsible collapsed={collapsed} onCollapse={b => setCollapsed(b)}>
          <Menu
            onClick={() => setRefresh((refresh) => ++refresh)}
            selectedKeys={selectedKeys}
            mode="inline"
            theme="dark"
          >
            {menus.map((item) => (
              <Menu.Item key={item.key} >
                <Link to={item.route} >
                  {item.icon}
                  {!collapsed && item.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 0' }}>
            <Suspense fallback={null}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/list" component={List} />
                <Route path="/tempLogin" component={Login} />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;

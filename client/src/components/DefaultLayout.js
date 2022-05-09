import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import '../resources/layout.css'
import {Link} from 'react-router-dom'

const { Header, Sider, Content } = Layout;

export default class DefaultLayout extends React.Component {
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
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"><h3>Retail POS</h3></div>
            <Menu theme="dark" defaultSelectedKeys={window.location.pathname} mode="inline">
                <Menu.Item key="/home" icon={<HomeOutlined />}>
                    <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="/transactions" icon={<ContainerOutlined />}>
                    <Link to="/transactions">Transactions</Link>
                </Menu.Item>
                <Menu.Item key="/items" icon={<DatabaseOutlined />}>
                    <Link to="/items">Items</Link>
                </Menu.Item>
                <Menu.Item key="/customers" icon={<UserOutlined />}>
                    <Link to="/customers">Customers</Link>
                </Menu.Item>
                <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: 10,
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

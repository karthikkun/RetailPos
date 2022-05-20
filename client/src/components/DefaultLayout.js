import React, { useEffect, useState } from 'react'
import { Layout, Menu, Spin} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import '../resources/layout.css'
import { Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {cartItems, loading} = useSelector(state => state.rootReducer)

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <Layout>
      {loading && (
        <div className='loader-comp'>
          <Spin size="large"/>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
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
          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={
            () => {
              localStorage.removeItem('pos-user')
              navigate('/login')
            }}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div className='cart-count d-flex align-items-center' onClick={() => navigate('/cart')}>
            <b><p className='mt-3 mr-2'>{cartItems.length}</p></b>
            <ShoppingCartOutlined />
            </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: 10,
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout
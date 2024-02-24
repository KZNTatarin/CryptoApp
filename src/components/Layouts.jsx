import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  InboxOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Typography } from "antd";
const { Header, Sider, Content } = Layout;

import { wallet } from "../data";
import { Route, Routes, useNavigate } from "react-router-dom";
import BuyCoin from "./BuyCoin";
import Portfolio from "./Portfolio";
import Info from "./Info";

export default function Layouts() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          onClick={({key}) => {
            navigate(key)
          }}
          items={[
            {
              key: "/",
              icon: <InfoCircleOutlined />,
              label: "Info",
            },
            {
              key: "/buy",
              icon: <DollarOutlined />,
              label: "Buy coin",
            },
            {
              key: "/portfolio",
              icon: <InboxOutlined />,
              label: "Portfolio",
            },
          
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Typography.Title level={4}>{+wallet.toFixed(2)}$</Typography.Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            width: '100%',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/buy" element={<BuyCoin/>} ></Route>
            <Route path="/portfolio" element={<Portfolio/>}></Route>
            <Route path="/" element={<Info/>}></Route>
          </Routes>
        </Content>

      </Layout>
    </Layout>
  );
}

import React, { PropsWithChildren, useState } from "react";
import {
  DollarCircleOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Typography } from "antd";

import "../styles/Layout.module.css";
import Link from "next/link";

const { Title } = Typography;

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} width={256}>
        <div className="logo">
          <Title style={{ color: "white" }}>Escrow app</Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link href="/">Home</Link>,
            },
            {
              key: "2",
              icon: <DollarCircleOutlined />,
              label: <Link href="/transactions">Transactions</Link>,
            },
            {
              key: "3",
              icon: <UsergroupAddOutlined />,
              label: <Link href="/users">Users</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer, display: "flex" }}
        >
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

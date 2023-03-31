import {
  DollarCircleFilled,
  HomeFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Typography } from "antd";
import Link from "next/link";
import React from "react";

const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <HomeFilled />),
  getItem(<Link href="/">Transactions</Link>, "2", <DollarCircleFilled />),
  getItem(<Link href="/">Users</Link>, "3", <UsergroupAddOutlined />),
];

export const Navigation = () => {
  return (
    <div style={{ width: 256, height: "100vh", padding: 0 }}>
      <div>
        <Title>Escrow app</Title>
      </div>
      <Menu
        title="Menu"
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        items={items}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default Navigation;

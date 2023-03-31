import React from "react";
import { Space, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import usersApi from "../../services/users";
import { UserDto } from "../../services";
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<UserDto> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const index: React.FC = () => {
  const { data: usersData, isLoading } = usersApi.useGetUsersQuery({});

  console.log("Users data", usersData);

  if (isLoading) return <Spin />;
  return (
    <>
      <Title level={2}>Users</Title>
      <Table columns={columns} dataSource={usersData} />
    </>
  );
};

export default index;

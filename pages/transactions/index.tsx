import React from "react";
import { Space, Spin, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import transactionApi from "../../services/transactions";
import { TransactionDto } from "../../services";
const { Title } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<TransactionDto> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Buyer",
    dataIndex: "buyerId",
    key: "buyerId",
  },
  {
    title: "Seller",
    dataIndex: "sellerId",
    key: "sellerId",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const data: TransactionDto[] = [];

const index: React.FC = () => {
  const { data: transactionData, isLoading } =
    transactionApi.useGetTransactionsQuery({});

  console.log("Transaction data", transactionData);

  if (isLoading) return <Spin />;
  return (
    <>
      <Title level={2}>Transactions</Title>
      <Table columns={columns} dataSource={transactionData} />
    </>
  );
};

export default index;

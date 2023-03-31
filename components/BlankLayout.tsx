import { Layout } from "antd";
import { PropsWithChildren } from "react";

const BlankLayout = ({ children }: PropsWithChildren) => {
  const {  Content } = Layout;
  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          placeItems: "center",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default BlankLayout;

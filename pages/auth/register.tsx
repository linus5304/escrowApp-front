import React, { ReactNode } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import BlankLayout from "../../components/BlankLayout";
import { Formik } from "formik";
import { useAuth } from "../../hooks/useAuth";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface FormData {
  email: string;
  password: string;
}

const defaultValues: FormData = {
  email: "",
  password: "",
};

const RegisterPage = () => {
  const auth = useAuth();
  return (
    <Formik
      initialValues={defaultValues}
      onSubmit={values => {
        console.log("Values", values)
        auth.register(
          { email: values.email, password: values.password },
          error => {
            console.log("Error loggin int")
          }
        );
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Formik>
  );
};
RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

RegisterPage.guestGuard = true;

export default RegisterPage;

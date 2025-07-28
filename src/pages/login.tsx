import React from "react";
import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { mutate: login, isLoading } = useLogin<LoginFormValues>();
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        message.success("로그인 성공!");
      },
      onError: (error) => {
        message.error(error.message || "로그인에 실패했습니다.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      <Card className="w-full max-w-md rounded-xl shadow-2xl border-0">
        <div className="text-center mb-8">
          <Title level={2} style={{ margin: 0, color: "#1677ff" }}>
            로그인
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="이메일"
            name="email"
          >
            <Input
              placeholder="이메일을 입력하세요"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
          >
            <Input.Password
              placeholder="비밀번호를 입력하세요"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              className="w-full h-12 text-base font-medium"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}; 
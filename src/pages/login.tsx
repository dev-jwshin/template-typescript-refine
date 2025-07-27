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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={2} style={{ margin: 0, color: "#1677ff" }}>
            로그인
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            email: "demo@refine.dev",
            password: "demodemo",
          }}
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
              style={{
                width: "100%",
                height: "48px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}; 
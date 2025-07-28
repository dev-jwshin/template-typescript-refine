import React from "react";
import { useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { CustomCreate } from "../../components/crud";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <CustomCreate saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력해주세요" }]}
        >
          <Input placeholder="이름을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요" },
            { type: "email", message: "올바른 이메일 형식을 입력해주세요" }
          ]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            { required: true, message: "비밀번호를 입력해주세요" },
            { min: 6, message: "비밀번호는 최소 6자 이상이어야 합니다" }
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>

        <Form.Item
          label="전화번호"
          name="phone"
        >
          <Input placeholder="전화번호를 입력하세요 (선택사항)" />
        </Form.Item>

        <Form.Item
          label="역할"
          name="role"
          rules={[{ required: true, message: "역할을 선택해주세요" }]}
          initialValue="user"
        >
          <Select placeholder="역할을 선택하세요">
            <Select.Option value="user">사용자</Select.Option>
            <Select.Option value="admin">관리자</Select.Option>
          </Select>
        </Form.Item>

        {/* provider와 providerId는 LOCAL 계정 생성시 자동 설정됨 */}
        <Form.Item name="provider" initialValue="local" hidden>
          <Input />
        </Form.Item>
      </Form>
    </CustomCreate>
  );
}; 
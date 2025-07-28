import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <div className="tw-container">
      <div className="tw-card">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">사용자 편집</h1>
          <p className="text-gray-600">사용자 정보를 수정할 수 있습니다.</p>
        </div>
        
        <Edit saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical" className="space-y-4">
            <Form.Item
              label="이름"
              name="name"
              rules={[
                {
                  required: true,
                  message: "이름을 입력해주세요!",
                },
              ]}
            >
              <Input placeholder="이름을 입력하세요" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="이메일"
              name="email"
              rules={[
                {
                  required: true,
                  message: "이메일을 입력해주세요!",
                },
                {
                  type: "email",
                  message: "올바른 이메일 형식이 아닙니다!",
                },
              ]}
            >
              <Input placeholder="이메일을 입력하세요" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="전화번호"
              name="phone"
            >
              <Input placeholder="전화번호를 입력하세요 (선택사항)" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="역할"
              name="role"
              rules={[
                {
                  required: true,
                  message: "역할을 선택해주세요!",
                },
              ]}
            >
              <Select placeholder="역할을 선택하세요" className="rounded-md">
                <Select.Option value="user">사용자</Select.Option>
                <Select.Option value="admin">관리자</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="로그인 방식"
              name="provider"
              rules={[
                {
                  required: true,
                  message: "로그인 방식을 선택해주세요!",
                },
              ]}
            >
              <Select placeholder="로그인 방식을 선택하세요" className="rounded-md">
                <Select.Option value="local">로컬</Select.Option>
                <Select.Option value="google">구글</Select.Option>
                <Select.Option value="kakao">카카오</Select.Option>
                <Select.Option value="naver">네이버</Select.Option>
                <Select.Option value="apple">애플</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Edit>
      </div>
    </div>
  );
}; 
import React from "react";
import { useShow } from "@refinedev/core";
import { Show, TextField, DateField } from "@refinedev/antd";
import { Typography, Descriptions, Tag } from "antd";

const { Title } = Typography;

export const UserShow = () => {
  const { query: queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const getRoleColor = (role: any) => {
    return role === "admin" ? "red" : "blue";
  };

  const getProviderColor = (provider: any) => {
    switch (provider) {
      case "google":
        return "orange";
      case "kakao":
        return "gold";
      case "naver":
        return "green";
      case "apple":
        return "black";
      default:
        return "default";
    }
  };

  return (
    <div className="tw-container">
      <div className="tw-card">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">사용자 상세 정보</h1>
          <p className="text-gray-600">사용자의 상세 정보를 확인할 수 있습니다.</p>
        </div>
        
        <Show isLoading={isLoading}>
          <Descriptions bordered column={1} className="shadow-sm bg-white rounded-lg">
            <Descriptions.Item label="ID">
              {record?.id}
            </Descriptions.Item>
            <Descriptions.Item label="이름">
              <TextField value={record?.name} />
            </Descriptions.Item>
            <Descriptions.Item label="이메일">
              <TextField value={record?.email} />
            </Descriptions.Item>
            <Descriptions.Item label="전화번호">
              <TextField value={record?.phone || "-"} />
            </Descriptions.Item>
            <Descriptions.Item label="역할">
              <Tag color={getRoleColor(record?.role)} className="rounded-md">
                {record?.role === "admin" ? "관리자" : "사용자"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="로그인 방식">
              <Tag color={getProviderColor(record?.provider)} className="rounded-md">
                {record?.provider?.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="가입일">
              <DateField value={record?.createdAt} format="YYYY년 MM월 DD일 HH:mm" />
            </Descriptions.Item>
            <Descriptions.Item label="수정일">
              <DateField value={record?.updatedAt} format="YYYY년 MM월 DD일 HH:mm" />
            </Descriptions.Item>
          </Descriptions>
        </Show>
      </div>
    </div>
  );
}; 
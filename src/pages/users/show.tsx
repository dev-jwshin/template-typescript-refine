import React from "react";
import { useShow } from "@refinedev/core";
import { TextField, DateField } from "@refinedev/antd";
import { Typography, Descriptions, Tag } from "antd";
import { CustomShow } from "../../components/crud";

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
    <CustomShow title="사용자 상세 정보" isLoading={isLoading}>
      <Descriptions bordered column={1}>
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
    </CustomShow>
  );
}; 
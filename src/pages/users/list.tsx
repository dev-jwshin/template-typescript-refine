import React from "react";
import {
  TextField,
  DateField,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { CustomList } from "../../components/crud";

export const UserList = () => {
  const { tableProps } = useTable();

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
    <CustomList title="사용자 관리">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          width={80}
        />
        <Table.Column
          dataIndex="name"
          title="이름"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="email"
          title="이메일"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="phone"
          title="전화번호"
          render={(value) => (
            <TextField value={value || "-"} />
          )}
        />
        <Table.Column
          dataIndex="role"
          title="역할"
          render={(value) => (
            <Tag color={getRoleColor(value)}>
              {value === "admin" ? "관리자" : "사용자"}
            </Tag>
          )}
        />
        <Table.Column
          dataIndex="provider"
          title="로그인 방식"
          render={(value) => (
            <Tag color={getProviderColor(value)}>
              {value?.toUpperCase()}
            </Tag>
          )}
        />
        <Table.Column
          dataIndex="createdAt"
          title="가입일"
          render={(value) => <DateField value={value} format="YYYY-MM-DD" />}
        />
        <Table.Column
          title="액션"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </CustomList>
  );
}; 
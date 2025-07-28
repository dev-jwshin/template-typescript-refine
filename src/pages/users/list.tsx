import React from "react";
import {
  TextField,
  DateField,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag, Input, Button, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
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

  const columns = [
    {
      dataIndex: "id",
      title: "ID",
      width: 80,
    },
    {
      dataIndex: "name",
      title: "이름",
      render: (value: any) => <TextField value={value} />,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className="p-2">
          <Input
            placeholder="이름 검색"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
            >
              검색
            </Button>
            <Button onClick={() => clearFilters && clearFilters()} size="small">
              초기화
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value: any, record: any) =>
        record.name?.toString().toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      dataIndex: "email",
      title: "이메일",
      render: (value: any) => <TextField value={value} />,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div className="p-2">
          <Input
            placeholder="이메일 검색"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
            >
              검색
            </Button>
            <Button onClick={() => clearFilters && clearFilters()} size="small">
              초기화
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value: any, record: any) =>
        record.email?.toString().toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      dataIndex: "phone",
      title: "전화번호",
      render: (value: any) => <TextField value={value || "-"} />,
    },
    {
      dataIndex: "role",
      title: "역할",
      render: (value: any) => (
        <Tag color={getRoleColor(value)}>
          {value === "admin" ? "관리자" : "사용자"}
        </Tag>
      ),
      filters: [
        { text: '관리자', value: 'admin' },
        { text: '사용자', value: 'user' },
      ],
      onFilter: (value: any, record: any) => record.role === value,
      filterIcon: (filtered: boolean) => (
        <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
    },
    {
      dataIndex: "provider",
      title: "로그인 방식",
      render: (value: any) => (
        <Tag color={getProviderColor(value)}>
          {value?.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'LOCAL', value: 'local' },
        { text: 'GOOGLE', value: 'google' },
        { text: 'KAKAO', value: 'kakao' },
        { text: 'NAVER', value: 'naver' },
        { text: 'APPLE', value: 'apple' },
      ],
      onFilter: (value: any, record: any) => record.provider === value,
      filterIcon: (filtered: boolean) => (
        <FilterOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
    },
    {
      dataIndex: "createdAt",
      title: "가입일",
      render: (value: any) => <DateField value={value} format="YYYY-MM-DD" />,
    },
    {
      title: "액션",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} />
          <ShowButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <CustomList 
      title="사용자 관리"
      tableProps={tableProps}
      columns={columns}
    />
  );
}; 
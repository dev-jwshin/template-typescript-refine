import React from "react";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Layout, Space, Avatar, Typography, Dropdown, Button } from "antd";
import { LogoutOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

const { Header: AntdHeader } = Layout;
const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity<any>();
  const { mutate: logout } = useLogout();

  const menuItems: any = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "로그아웃",
      onClick: () => logout(),
    },
  ];

  return (
    <AntdHeader className="flex justify-end items-center px-6 bg-white border-b border-gray-200">
      {/* 사용자 정보 영역 */}
      <Space>
        <Dropdown
          menu={{
            items: menuItems,
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            className="flex items-center h-10"
          >
            <Avatar
              size={32}
              icon={<UserOutlined />}
            />
          </Button>
        </Dropdown>
      </Space>
    </AntdHeader>
  );
}; 
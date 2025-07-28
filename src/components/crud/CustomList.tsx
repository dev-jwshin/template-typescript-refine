import React from "react";
import { List, ListProps } from "@refinedev/antd";
import { Table, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";

interface CustomListProps extends Omit<ListProps, "breadcrumb"> {
  title: string;
  tableProps?: any; // useTable의 tableProps
  columns?: ColumnsType<any>;
  children?: React.ReactNode; // 기존 방식도 지원
}

export const CustomList: React.FC<CustomListProps> = ({ 
  title, 
  tableProps,
  columns,
  children, 
  ...props 
}) => {
  const defaultPaginationConfig = {
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: (total: number, range: [number, number]) => `총 ${total}개`,
    pageSizeOptions: ['1', '10', '20', '50', '100'],
  };

  return (
    <div className="tw-container">
      <div className="tw-card">
        <List 
          title={title}
          breadcrumb={false}
          createButtonProps={{
            type: "primary",
            children: "생성",
            icon: null,
          }}
          {...props}
        >
          {tableProps && columns ? (
            <Table
              {...tableProps}
              rowKey="id"
              columns={columns}
              pagination={{
                ...tableProps.pagination,
                ...defaultPaginationConfig,
              }}
            />
          ) : (
            children
          )}
        </List>
      </div>
    </div>
  );
}; 
import React from "react";
import { List, ListProps } from "@refinedev/antd";
import { Table, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAutoTitle } from "../../hooks/useAutoTitle";

interface CustomListProps extends Omit<ListProps, "breadcrumb" | "title"> {
  title?: string; // 선택적으로 커스텀 타이틀 제공 가능
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
  const autoTitle = useAutoTitle("list");
  const finalTitle = title || autoTitle;
  
  const defaultPaginationConfig = {
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: (total: number, range: [number, number]) => `총 ${total}개`,
    pageSizeOptions: ['10', '20', '50', '100'],
  };

  return (
    <div className="tw-container">
      <div className="tw-card">
                <List 
          title={finalTitle}
          breadcrumb={false}
          createButtonProps={{
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
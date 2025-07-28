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
    locale: {
      items_per_page: '개씩 보기',
      jump_to: '이동',
      jump_to_confirm: '확인',
      page: '페이지',
      prev_page: '이전 페이지',
      next_page: '다음 페이지',
      prev_5: '이전 5페이지',
      next_5: '다음 5페이지',
      prev_3: '이전 3페이지',
      next_3: '다음 3페이지',
      page_size: '페이지 크기',
    },
  };

  const defaultTableLocale = {
    filterTitle: '필터',
    filterConfirm: '확인',
    filterReset: '초기화',
    selectAll: '전체 선택',
    selectInvert: '선택 반전',
    selectionAll: '모든 데이터 선택',
    sortTitle: '정렬',
    expand: '행 확장',
    collapse: '행 접기',
    triggerDesc: '내림차순으로 정렬',
    triggerAsc: '오름차순으로 정렬',
    cancelSort: '정렬 취소',
    emptyText: '데이터가 없습니다',
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
              locale={defaultTableLocale}
            />
          ) : (
            children
          )}
        </List>
      </div>
    </div>
  );
}; 
import React from "react";
import { List, ListProps } from "@refinedev/antd";

interface CustomListProps extends Omit<ListProps, "breadcrumb"> {
  title: string;
  children: React.ReactNode;
}

export const CustomList: React.FC<CustomListProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  return (
    <div className="tw-container">
      <div className="tw-card">
        <List 
          title={title}
          breadcrumb={false}
          {...props}
        >
          {children}
        </List>
      </div>
    </div>
  );
}; 
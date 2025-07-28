import React from "react";
import { Edit, EditProps } from "@refinedev/antd";

interface CustomEditProps extends Omit<EditProps, "breadcrumb" | "goBack"> {
  title: string;
  children: React.ReactNode;
}

export const CustomEdit: React.FC<CustomEditProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Edit
          title={title}
          breadcrumb={false}
          goBack={false}
          {...props}
        >
          {children}
        </Edit>
      </div>
    </div>
  );
}; 
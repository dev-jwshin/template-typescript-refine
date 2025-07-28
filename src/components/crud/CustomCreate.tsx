import React from "react";
import { Create, CreateProps } from "@refinedev/antd";

interface CustomCreateProps extends Omit<CreateProps, "breadcrumb" | "goBack"> {
  title: string;
  children: React.ReactNode;
}

export const CustomCreate: React.FC<CustomCreateProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Create
          title={title}
          breadcrumb={false}
          goBack={false}
          {...props}
        >
          {children}
        </Create>
      </div>
    </div>
  );
}; 
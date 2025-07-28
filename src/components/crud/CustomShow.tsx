import React from "react";
import { Show, ShowProps } from "@refinedev/antd";

interface CustomShowProps extends Omit<ShowProps, "breadcrumb" | "goBack"> {
  title: string;
  children: React.ReactNode;
}

export const CustomShow: React.FC<CustomShowProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Show
          title={title}
          breadcrumb={false}
          goBack={false}
          {...props}
        >
          {children}
        </Show>
      </div>
    </div>
  );
}; 
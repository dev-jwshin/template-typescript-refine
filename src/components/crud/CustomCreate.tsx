import React from "react";
import { Create, CreateProps } from "@refinedev/antd";
import { useAutoTitle } from "../../hooks/useAutoTitle";

interface CustomCreateProps extends Omit<CreateProps, "breadcrumb" | "goBack" | "title"> {
  title?: string; // 선택적으로 커스텀 타이틀 제공 가능
  children: React.ReactNode;
}

export const CustomCreate: React.FC<CustomCreateProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  const autoTitle = useAutoTitle("create");
  const finalTitle = title || autoTitle;
  
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Create
          title={finalTitle}
          breadcrumb={false}
          goBack={false}
          headerButtons={() => null}
          {...props}
        >
          {children}
        </Create>
      </div>
    </div>
  );
}; 
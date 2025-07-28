import React from "react";
import { Edit, EditProps } from "@refinedev/antd";
import { useAutoTitle } from "../../hooks/useAutoTitle";

interface CustomEditProps extends Omit<EditProps, "breadcrumb" | "goBack" | "title"> {
  title?: string; // 선택적으로 커스텀 타이틀 제공 가능
  children: React.ReactNode;
}

export const CustomEdit: React.FC<CustomEditProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  const autoTitle = useAutoTitle("edit");
  const finalTitle = title || autoTitle;
  
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Edit
          title={finalTitle}
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
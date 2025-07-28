import React from "react";
import { Show, ShowProps } from "@refinedev/antd";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useAutoTitle } from "../../hooks/useAutoTitle";

interface CustomShowProps extends Omit<ShowProps, "breadcrumb" | "goBack" | "title"> {
  title?: string; // 선택적으로 커스텀 타이틀 제공 가능
  children: React.ReactNode;
}

export const CustomShow: React.FC<CustomShowProps> = ({ 
  title, 
  children, 
  ...props 
}) => {
  const autoTitle = useAutoTitle("show");
  const finalTitle = title || autoTitle;
  
  return (
    <div className="tw-container">
      <div className="tw-card">
        <Show
          title={finalTitle}
          breadcrumb={false}
          goBack={false}
          headerButtons={({ refreshButtonProps }) => 
            refreshButtonProps ? (
              <Button 
                icon={<ReloadOutlined />}
                onClick={refreshButtonProps.onClick}
              >
                새로고침
              </Button>
            ) : null
          }
          {...props}
        >
          {children}
        </Show>
      </div>
    </div>
  );
}; 
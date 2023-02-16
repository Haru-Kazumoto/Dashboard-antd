import React from "react";
import { Card, Space, Statistic } from "antd";

function DashboardCard(
  {
    title, 
    value, 
    icon, 
    valueStyle,
    precision,
    suffix
  }) {
    return (
      <Card className='card-dashboard'>
        <Space direction='horizontal'>
          {icon}
          <Statistic 
            title={title} 
            value={value}
            valueStyle={valueStyle}
            precision={precision}
            suffix={suffix}
          />
        </Space>
      </Card>
    )
  }

export default DashboardCard;
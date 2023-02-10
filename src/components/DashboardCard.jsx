import React from "react";
import { Card, Space, Statistic } from "antd";

function DashboardCard({title, value, icon}) {
    return (
      <Card className='card-dashboard'>
        <Space direction='horizontal'>
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    )
  }

export default DashboardCard;
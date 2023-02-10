import React from 'react'
import { Space, Card, Statistic } from 'antd'

const UserData = () => {
  return (
    <div>
      <Space direction='horizontal'>
        <DashboardCard />
      </Space>
    </div>
  )
}

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

export default UserData

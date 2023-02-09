import React from 'react'
import { Space, Card, Statistic } from 'antd';
import * as HiIcons from 'react-icons/hi'

const DashboardData = () => {
  return (
    <div>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={30}/>} 
          title={"Employee"} 
          value={15555}
        />
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={30}/>} 
          title={"Employee"} 
          value={15555}
        />
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={30}/>} 
          title={"Employee"} 
          value={15555}
        />
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={30}/>} 
          title={"Employee"} 
          value={15555}
        />
      </Space>
    </div>
  )
}

function DashboardCard({title, value, icon}) {
  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value}/>
      </Space>
    </Card>
  )
}

export default DashboardData;

import React from 'react'
import { Space } from 'antd'
import DashboardCard from '../DashboardCard'
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';

const ProfileCard = () => {
  return (
    <div>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<TiIcons.TiFlowSwitch size={30}/>}
          title={'Backend'}
          value={10}
        />
        <DashboardCard 
          icon={<TbIcons.TbHeartRateMonitor size={30}/>}
          title={'Frontend'}
          value={10}
        />
        <DashboardCard 
          icon={<MdIcons.MdOutlineDesignServices size={30}/>}
          title={'UI/UX'}
          value={10}
        />
        <DashboardCard 
          icon={<GrIcons.GrDocumentTest size={30}/>}
          title={'Tester'}
          value={10}
        />
      </Space>
    </div>
  )
}

export default ProfileCard

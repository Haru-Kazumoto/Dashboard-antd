import React from 'react'
import { Space } from 'antd'
import DashboardCard from '../DashboardCard'
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
// import { JobRoleContext } from './JobRoleContext';

const ProfileCard = ({jobRole}) => {

  // const jobRole = React.useContext(JobRoleContext);

  return (
    <div>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<TiIcons.TiFlowSwitch size={30}/>}
          title={'Backend'}
          value={jobRole['BACKEND'] || 0}
        />
        <DashboardCard 
          icon={<TbIcons.TbHeartRateMonitor size={30}/>}
          title={'Frontend'}
          value={jobRole['FRONTEND'] || 0}
        />
        <DashboardCard 
          icon={<MdIcons.MdOutlineDesignServices size={30}/>}
          title={'UI/UX'}
          value={jobRole['UI'] || 0}
        />
        <DashboardCard 
          icon={<GrIcons.GrDocumentTest size={30}/>}
          title={'Tester'}
          value={jobRole['TESTER'] || 0}
        />
      </Space>
    </div>
  )
}

export default ProfileCard

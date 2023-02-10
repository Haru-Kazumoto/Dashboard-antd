import React from 'react'
import { Space } from 'antd'
import DashboardCard from '../components/DashboardCard'
import {Avatar, Tag, Table, Tooltip, Button, Modal} from 'antd';
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';

const data = [
  {
    key: '1',
    profile: './profile_pict(3).jpg',
    name: 'Makoto Miura',
    gender: ['Male'],
    email: 'MakotoMiura@gmail.com',
    address: 'New York No. 1 Lake Park',
    tags: ['frontend'],
  },
  {
    key: '2',
    name: 'Sakura Ai',
    profile: './profile_pict(1).jpg',
    gender: ['female'],
    email: 'SakuraAi@gmail.com',
    address: 'London No. 1 Lake Park',
    tags: ['ui/ux'],
  },
  {
    key: '3',
    name: 'Akiha Yumeno',
    profile: './profile_pict(2).jpg',
    gender: ['Female'],
    email: 'AkihaYumero@gmail.com',
    address: 'Sydney No. 1 Lake Park',
    tags: ['tester'],
  },
  {
    key: '4',
    name: 'Asami Yuru',
    profile: './profile_pict(4).jpg',
    gender: ['Male'],
    email: 'AsamiYuru@gmail.com',
    address: 'London No. 1 Lake Park',
    tags: ['frontend'],
  },
  {
    key: '5',
    name: 'Kihako Cho',
    profile: './profile_pict(5).jpg',
    gender: ['Male'],
    email: 'KihakoCho@gmail.com',
    address: 'Sydney No. 1 Lake Park',
    tags: ['backend'],
  },
  {
    key: '6',
    name: 'Ayumi Makoto',
    profile: './profile_pict(7).jpg',
    gender: ['female'],
    email: 'AyumiMakoto@gmail.com',
    address: 'London No. 1 Lake Park',
    tags: ['ui/ux'],
  }
];

const EmployeeData = () => {

  const [isClick, setIsClick] = React.useState(false);
  const toggle = () => {setIsClick(!isClick)};

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      fixed: 'left',
      key: 'profile',
      width: 100,
      align: 'center',
      render: (profile) => {
        return (
          <Avatar src={profile} size={40} />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
      width: 250,
      align: 'center'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
      render: (_, { gender }) => (
        <>
          {gender.map((gender) => {
            let color = gender === 'Male' ? 'geekblue' : 'magenta';
            return (
              <Tag color={color} key={gender}>
                {gender.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Job role',
      key: 'job_role',
      dataIndex: 'job_role',
      align: 'center',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={'green'} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center'
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      align: 'center',
      render: (_) => (
        <div>
          <Tooltip placement="topRight" title="Delete">
            <Button type="primary" danger className='del-button-table-dashboard'>
              <AiIcons.AiOutlineDelete />
            </Button>
            {/* <Modal title='Delete' open={toggle} footer={null}>
              <p>content</p>
            </Modal> */}
          </Tooltip>
          <Tooltip placement="topLeft" title="Update">
            <Button type="primary">
              <AiIcons.AiOutlineEdit />
            </Button>
          </Tooltip>
        </div>
      ),
    }
  ];

  return (
    <div>
      <h1 style={{fontSize: '1cm', marginLeft: '25px', marginBottom: '5px'}}>Employee Data</h1>
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

      <Table 
        size='small'
        className='table-content'
        columns={columns} 
        dataSource={data} 
        bordered
        pagination={{
          pageSize: 10,
          position: ['bottomCenter']
        }}
        scroll={{
          y: 350,
          x: 1500
        }}
        />
    </div>
  )
}

export default EmployeeData

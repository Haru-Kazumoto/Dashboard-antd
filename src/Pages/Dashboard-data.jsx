import React from 'react'
import { Space,Table, Tag, Avatar} from 'antd';
import DashboardCard from '../components/DashboardCard';
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';

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

const DashboardData = () => {

  const[isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
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
  ];
  return (
    <div>
      <h1 style={{fontSize: '1cm', marginLeft: '25px', marginBottom: '10px'}}>Dashboard</h1>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<GrIcons.GrUserSettings size={35} />} 
          title={"User"} 
          value={27}
        />
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={35}/>} 
          title={"Employee"} 
          value={30}
        />
        <DashboardCard
          icon={<MdIcons.MdOutlineAttachMoney size={35}/>} 
          title={"Profit"} 
          value={600}
        />
        <DashboardCard 
          icon={<MdIcons.MdMoneyOffCsred size={35}/>} 
          title={"Expense"} 
          value={150}
        />
      </Space>
      
      <Table 
        size='small'
        className='table-content'
        columns={columns} 
        dataSource={data} 
        pagination={{
          pageSize: 10,
          position: ['bottomCenter']
        }}
        scroll={{
          y: 350
        }}
        />
    </div>
  )
}

export default DashboardData;

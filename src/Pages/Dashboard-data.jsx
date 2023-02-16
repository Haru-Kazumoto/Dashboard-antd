import React from 'react'
import { Space,Table, Tag, Avatar, Button, Popconfirm, message} from 'antd';
import DashboardCard from '../components/DashboardCard';
import * as HiIcons from 'react-icons/hi'
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from'react-icons/ai';
import * as SiIcons from 'react-icons/si';

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

  const[isOpen, setIsOpen] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(false);

  const showModal = () => {
    setIsOpen(true)
  }

  const handleOk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
      message.success("Export CSV Success")
      console.log("Export CSV Success")
    }, 2000);
  }

  const handleCancel = () => {
    setIsOpen(false);
  }

  return (
    <div>
      {/* <h1 style={{fontSize: '1cm', marginLeft: '25px', marginBottom: '10px'}}>Dashboard</h1> */}
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<GrIcons.GrUserSettings size={35} />} 
          title={"User"} 
          value={27}
        />
        <DashboardCard 
          icon={<HiIcons.HiOutlineUserGroup size={35} />} 
          title={"Employee"} 
          value={30}
        />
        <DashboardCard
          icon={<AiIcons.AiOutlineArrowUp size={35} />} 
          title={"Profit"} 
          valueStyle={{
            color: '#3f8600'
          }}
          precision={2}
          suffix="%"
          value={10.00}
        />
        <DashboardCard
          icon={<AiIcons.AiOutlineArrowDown size={35} />} 
          title={"Expense"} 
          valueStyle={{
            color: '#cf1322'
          }}
          precision={2}
          suffix="%"
          value={5.00}
        />
      </Space>
  
      <Space direction='horizontal'>
        <Popconfirm
          open={isOpen}
          title="Export CSV File"
          description="Are you sure want to export the CSV?"
          onConfirm={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            loading: isLoading
          }}
        >
          <Button 
            onClick={showModal}
            type="primary" 
            icon={<SiIcons.SiMicrosoftexcel
              color='white'
              style={
                {
                  marginRight: 10,
                  alignItems: 'center',
                }
            }/>} 
            size={'middle'} 
            style={{backgroundColor: '#2f9b08'}}>
              Export CSV
          </Button>
        </Popconfirm>
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

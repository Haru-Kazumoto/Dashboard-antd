import React from 'react'
import { Space, message } from 'antd'
import DashboardCard from '../components/DashboardCard'
import {Avatar, Tag, Table, Tooltip, Button, Modal} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import axios from 'axios';

const { confirm } = Modal;

const EmployeeData = () => {

  const API_BASE_URL = "http://localhost:3000";
  const[data, setData] = React.useState([]);
  const[record, setRecord] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these employee?',
      icon: <ExclamationCircleFilled />,
      content: 'Data will be deleted and cannot be restored',
      onOk() {
        message.success("Data has deleted");
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const handleDelete = async (id) => {
    try{
      await axios.delete(`${API_BASE_URL}/Data/${id}`);
      message.success("Record has deleted.");
      fetchData();
    } catch(error) {
      console.error(error);
      message.error("Record failed to be deleted");
    }
  }

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
      render: (_, record) => (
        <>
          <Tooltip placement="topRight" title="Delete">
            <Button 
              type="primary" 
              danger 
              className='del-button-table-dashboard'
              onClick={() => handleDelete(record.id)}
            >
              <AiIcons.AiOutlineDelete />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title="Update">
            <Button type="primary">
              <AiIcons.AiOutlineEdit />
            </Button>
          </Tooltip>
        </>
      ),
    }
  ];

  const fetchData = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/Data`);
      setData(response.data);
    } catch(error){
      console.log(error);
    }
  };

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
      <Space wrap direction='horizontal'>
      <Button 
            type="primary" 
            icon={<HiIcons.HiPlus
              color='white'
              style={
                {
                  marginRight: 10,
                  alignItems: 'center',
                }
            }/>} 
            size={'large'} 
            style={{backgroundColor: 'blue'}}>
              Add Employee
          </Button>
      </Space>
      <Table 
        size='small'
        className='table-content'
        columns={columns} 
        dataSource={data.map((item) => {
          return {
            id: item.id,
            profile: item.profile,
            name: item.name,
            gender: item.gender,
            email: item.email,
            address: item.address,
            tags: item.tags
          }
        })} 
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

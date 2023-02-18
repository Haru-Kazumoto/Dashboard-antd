import React from 'react'
import { Space,Table, Tag, Avatar, Button, Popconfirm, message, Input} from 'antd';
import DashboardCard from '../components/DashboardCard';
import * as HiIcons from 'react-icons/hi'
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from'react-icons/ai';
import * as SiIcons from 'react-icons/si';
import axios from 'axios';

const DashboardData = () => {

  const[data, setData] = React.useState([]);

  const fetchData = async () => {
    try{
      const response = await axios.get("http://localhost:3000/Data");
      setData(response.data);  
    } catch(error){
      message.error("Failed to get data, please check the server side.");
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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
      align: 'center',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
        return <Input 
                  autoFocus 
                  placeholder='Search Name...' 
                  value={selectedKeys[0]}
                  onChange={(e) => {
                    setSelectedKeys(e.target.value ? [e.target.value] : []);
                    confirm({closeDropdown: false});
                  }}
                  onPressEnter={() => {confirm()}}
                  onBlur={() => {confirm()}}
                  />
      },
      filterIcon: () => {
        return <AiIcons.AiOutlineSearch size={15}/>
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      }
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
      align: 'center'
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
            size={'large'} 
            style={{backgroundColor: '#2f9b08'}}>
              Export CSV
          </Button>
        </Popconfirm>
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

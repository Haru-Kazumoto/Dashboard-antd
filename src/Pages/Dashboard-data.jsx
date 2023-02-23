import React from 'react'
import { Space,Table, Tag, Button, Popconfirm, message, Input} from 'antd';
import DashboardCard from '../components/DashboardCard';
import * as HiIcons from 'react-icons/hi'
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from'react-icons/ai';
import * as SiIcons from 'react-icons/si';
import axios from 'axios';

const DashboardData = () => {

  const API_BASE_URL = "http://localhost:8890";

  const[data, setData] = React.useState([]);
  const[isOpen, setIsOpen] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/api/v1/employee/get-all`);
      setIsLoading(false);
      setData(response.data);  
      console.log(response.data);
    } catch(error){
      message.error("Failed to get data, please check the server side.");
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: 50,
      key: 'id',
      align: 'center',
      fixed: 'left'
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
      render: (gender) => {
        return (
          <Tag color={'geekblue'} key={gender}>
            {gender.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Job role',
      key: 'role',
      dataIndex: 'role',
      align: 'center',
      render: (tag) => {
        return (
          <Tag color={'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Number Employee',
      dataIndex: 'numberEmployee',
      key: 'numberEmployee',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
  ];

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
            email: item.email,
            gender: item.gender,
            id: item.id,
            name: item.name,
            numberEmployee: item.numberEmployee,
            role: item.role,
          }
        })} 
        loading={isLoading}
        pagination={{
          pageSize: 10,
          position: ['bottomCenter']
        }}
        scroll={{
          y: 350,
          x: 600
        }}
        />
    </div>
  )
}

export default DashboardData;

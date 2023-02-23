import React from 'react'
import DashboardCard from '../components/DashboardCard'
import {Tag, Table, Tooltip, Button, Space, message, Modal, Form, notification} from 'antd';
import {Input as InputAnt} from 'antd';
import { ToastContainer, toast } from "react-toastify";
import {FormLabel } from '@mui/joy';
import {Input as InputMui} from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import "react-toastify/dist/ReactToastify.css";
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import axios from 'axios';

const EmployeeData = () => {

  const API_BASE_URL = "http://localhost:8890";
  React.useEffect(() => {
    fetchData();
  }, []);

  const[data, setData] = React.useState([]);
  const[record, setRecord] = React.useState(null);
  const[openModal, setOpenModal] = React.useState(false);
  const[visible, setVisible] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(true);
  const[form] = Form.useForm();
  const [employeeNumber, setEmployeeNumber] = React.useState('');

  const handleInput = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 3) {
      setEmployeeNumber(inputValue);
    }
  };

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    setEmployeeNumber(`${randomNum}`);
  };

  const showModal = (record) => {
    setRecord(record);
    setOpenModal(true);
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  const fetchData = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/api/v1/employee/get-all`)
      setIsLoading(false);
      setData(response.data);
    } catch(error){
      console.log(error);
    }
  };

  // HANDLE DATA CRUD //

  const handleDelete = async () => {
    try{
      await axios.delete(`${API_BASE_URL}/api/v1/employee/delete/${record.id}`);
      message.success("Record has deleted.");
      closeModal();
      fetchData();
    } catch(error) {
      console.error(error);
      message.error("Record failed to be deleted");
    }
  }

  const handleSubmit = (values) => {
    axios.post(`${API_BASE_URL}/api/v1/employee/create`, values)
      .then((response) => {
        console.log(response);
        form.resetFields();
        setVisible(false);
        toast.success("New record has been added!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          fetchData();
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "error",
          description: "An error occurred while push data, check the server side."
        });
      });
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      fixed: 'left',
      width: 50,
      key: 'id',
      align: 'center',
      style: {
        backgroundColor: 'grey'
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
      render: (gender) => {
        const color = gender.toLowerCase() === 'male' ? 'geekblue' : 
        gender.toLowerCase() === 'female' ? 'magenta' : 'grey'
        return (
          <Tag color={color} key={gender}>
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
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
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
              onClick={() => showModal(record)}
            >
              <AiIcons.AiOutlineDelete />
            </Button>
            <Modal
              title="Delete"
              closable={false}
              open={openModal}
              onOk={handleDelete}
              onCancel={closeModal}
              maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1 )' }}
            >
              Are you sure want to delete the employee?
            </Modal>
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
            onClick={() => setVisible(true)}
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
          <Modal
            closable={false}
            open={visible}
            title="Add new record"
            onCancel={() => {
              closeModal();
              form.resetFields();
            }}
            footer={[
              <Button 
                key="cancel"
                onClick={() => {
                  setVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={form.submit}>
                Submit
              </Button>,
            ]}
          >
            <Form form={form} onFinish={handleSubmit}>
              <div className="form-input">
                <div className="form-input-content">
                  <FormLabel className="label-modal-input">Name</FormLabel>
                  <InputMui 
                    size="md" 
                    type='text' 
                    placeholder='Name' 
                    id='name'
                  />  
                </div>
                <div className="form-input-content">
                  <FormLabel className="label-modal-input">Gender</FormLabel>
                  <Select
                    placeholder="Select Gender"
                    indicator={<MdIcons.MdKeyboardArrowDown />}
                    sx={{
                      width: 240,
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)'
                        },
                      }
                    }}
                  >
                    <Option value="male">MALE</Option>
                    <Option value="female">FEMALE</Option>
                  </Select>
                </div>
                <div className="form-input-content">
                  <FormLabel className="label-modal-input">Role</FormLabel>
                  <Select
                    placeholder="Select Role"
                    indicator={<MdIcons.MdKeyboardArrowDown />}
                    sx={{
                      width: 240,
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)'
                        },
                      }
                    }}
                  >
                    <Option value="backend">BACKEND</Option>
                    <Option value="frontend">FRONTEND</Option>
                    <Option value="ui">UI</Option>
                    <Option value="tester">TESTER</Option>
                  </Select>
                </div>
                <div className="form-input-content">
                  <FormLabel className="label-modal-input">Number Employee</FormLabel>
                  <InputAnt
                    placeholder="***"
                    prefix="EM"
                    type="number"
                    style={{
                      width: '100px',
                      height: '40px',
                      borderColor: 'black',
                      borderRadius: '7px'
                    }}
                    maxLength={3}
                    value={employeeNumber}
                    onInput={handleInput}
                  />
                  <Button onClick={generateRandomNumber} className='button-random-num'>Generate Number</Button>
                </div>
                <div className="form-input-content">
                  <FormLabel className="label-modal-input">Email</FormLabel>
                  <InputMui size="md" type='email' placeholder='Email'/>
                </div>
              </div>
            </Form>
          </Modal>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </Space>
      <Table 
        size='small'
        className='table-content'
        columns={columns} 
        dataSource={data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            gender: item.gender,
            role: item.role,
            email: item.email,
            numberEmployee: item.numberEmployee,
          }
        })} 
        loading={isLoading}
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

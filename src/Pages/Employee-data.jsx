import React from 'react'
import DashboardCard from '../components/DashboardCard'
import {Tag, Table, Tooltip, Button, Space, message, Modal, Form, notification, Input} from 'antd';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as TiIcons from 'react-icons/ti';
import * as TbIcons from 'react-icons/tb';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import axios from 'axios';

const EmployeeData = () => {

  const API_BASE_URL = "http://localhost:3000";
  const { TextArea } = Input;
  React.useEffect(() => {
    fetchData();
  }, []);

  const[data, setData] = React.useState([]);
  const[record, setRecord] = React.useState(null);
  const[openModal, setOpenModal] = React.useState(false);
  const[visible, setVisible] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(true);
  const[form] = Form.useForm();

  const showModal = (record) => {
    setRecord(record);
    setOpenModal(true);
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  const fetchData = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/data`)
      setIsLoading(false);
      setData(response.data);
    } catch(error){
      console.log(error);
    }
  };

  // HANDLE DATA CRUD //

  const handleDelete = async () => {
    try{
      await axios.delete(`${API_BASE_URL}/data/${record.id}`);
      message.success("Record has deleted.");
      closeModal();
      fetchData();
    } catch(error) {
      console.error(error);
      message.error("Record failed to be deleted");
    }
  }

  const handleSubmit = (values) => {
    axios.post(`${API_BASE_URL}/data`, values)
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
      align: 'center'
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
        let color = gender === 'Male' ? 'geekblue' : 'magenta';
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
            >
              Are you sure want to delete the employee {record && `with id ${record.id}`}?
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
              <Form.Item
                name="name"
                label="Name"
                rules={[{required: true, message: "Please input your name"}]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{required: true, message: "Please input your gender"}]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[{required: true, message: "Please input your role"}]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{required: true, message: "Please input your email"}]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{required: true, message: "Please input your address"}]}>
                <TextArea
                  showCount
                  maxLength={100}
                  style={{ height: 120, resize: 'none' }}
                />
              </Form.Item>
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
            address: item.address,
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

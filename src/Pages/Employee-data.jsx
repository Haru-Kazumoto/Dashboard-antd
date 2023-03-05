import React from 'react'
import {Tag, Table, Tooltip, Button, message, Form, notification, Modal} from 'antd';
// import { JobRoleContext } from '../components/Profile-card/JobRoleContext';
import { toast } from "react-toastify";
import FormAddEmployee from '../form/Form-Add-Employee';
import "react-toastify/dist/ReactToastify.css";
import ProfileCard from '../components/Profile-card/Profile-Card';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';

const EmployeeData = () => {

  const API_BASE_URL = "http://localhost:8890";

  const headers = React.useMemo(() => {
    return {
      'X-Client-Port': '3001 | path: /employee-data'
    };
  }, []);



  const[data, setData] = React.useState([]);
  const[record, setRecord] = React.useState(null);
  const[openDeleteModal, setDeleteOpenDeleteModal] = React.useState(false);
  const[visible, setVisible] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(true);
  const[form] = Form.useForm();

  // hooks for submit data
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [role, setRole] = React.useState('');
  const [numberEmployee, setNumberEmployee] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [jobRole, setJobRole] = React.useState({});

  const handleRandomNumClick = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    setNumberEmployee(`EM${randomNum}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8890/api/v1/employee/create', {
      name: name,
      gender: gender,
      role: role,
      numberEmployee: numberEmployee,
      email: email
    })
      .then((response) => {   
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
        setJobRole(response.data);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "error",
          description: "An error occurred while push data, check the server side."
        });
      });
  };


  const showDeleteModal = (record) => {
    setRecord(record);
    setDeleteOpenDeleteModal(true);
  }

  const closeModal = () => {
    setDeleteOpenDeleteModal(false);
  }

  // HANDLE DATA CRUD //
  const fetchData = React.useCallback(async () => {
    try{
      const response = await axios.get(`${API_BASE_URL}/api/v1/employee/get-all`, { headers });
      setIsLoading(false);
      console.log(response);
      setData(response.data);
    } catch(error){
      console.log(error);
    }
  },[headers]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              onClick={() => showDeleteModal(record)}
            >
              <AiIcons.AiOutlineDelete />
            </Button>
            <Modal
              title="Delete"
              closable={false}
              open={openDeleteModal}
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

  //State for profile card
  React.useEffect(() => {
    axios.get(`${API_BASE_URL}/api/v1/employee/count-roles`)
      .then((response) => {
        setJobRole(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
  }, []);

  return (
    <div>
      {/* <JobRoleContext.Provider value={jobRole}> */}
        <ProfileCard jobRole={jobRole}/>
      {/* </JobRoleContext.Provider> */}
      <FormAddEmployee 
        onSetVisible={setVisible}
        onVisible={visible}
        onCloseModal={closeModal}
        onForm={form}
        onHandleSubmit={handleSubmit}
        propName={name}
        propGender={gender}
        propRole={role}
        propNumberEmployee={numberEmployee}
        propEmail={email}
        propSetName={setName}
        propSetGender={setGender}
        propSetRole={setRole}
        propSetNumberEmployee={setNumberEmployee}
        propSetEmail={setEmail}
        propHandleRandomClick={handleRandomNumClick}
        propOnClick={handleSubmit}
      />
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

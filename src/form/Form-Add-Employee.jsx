import React from 'react'
import { Space, Button, Modal, Input, Select } from 'antd';
import { ToastContainer } from "react-toastify";
import * as HiIcons from 'react-icons/hi';
import * as BiIcons from 'react-icons/bi';
import * as TbIcons from 'react-icons/tb';

const FormAddEmployee = (props) => {
  return (
    <div>
      <Space wrap direction='horizontal'>
          <Button 
            onClick={() => props.onSetVisible(true)}
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
            open={props.onVisible}
            title="Add new record"
            onCancel={() => {
              props.onCloseModal();
              props.onForm.resetFields();
            }}
            footer={[
              <Button 
                key="cancel"
                onClick={() => {
                  props.onSetVisible(false);
                  props.onForm.resetFields();
                }}
              >
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={props.propOnClick}>
                Submit
              </Button>,
            ]}
          >
            {/* value={props.propName} 
                  onChange={
                    (event) => props.propSetName(event.target.value) */}
            <form onSubmit={props.onHandleSubmit}>
              <div className='input-form-add'>
                <label>
                  Name:
                  {/* <input type="text" required 
                  value={props.propName} 
                  onChange={
                    (event) => props.propSetName(event.target.value) 
                  }/> */}
                  <Input type='text' size="large" placeholder="Name" addonBefore={<BiIcons.BiUser size={15}/>} />
                </label>
              </div>
              <div className='input-form-add'>
                <label>
                  Gender:
                  {/* <select value={props.propGender} onChange={(event) => props.propSetGender(event.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select> */}
                  
                </label>
                <Select
                    addonBefore={<BiIcons.BiUser size={15} />}
                    size='large'
                    defaultValue="Select Gender"
                    style={{
                      width: '200px'
                    }}
                    options={[
                      {
                        value: 'MALE',
                        label: 'Male',
                      },
                      {
                        value: 'FEMALE',
                        label: 'Female',
                      }
                    ]}
                  />
              </div>
              <div className='input-form-add'>
                <label>
                  Job Role:
                  <select value={props.propRrole} onChange={(event) => props.propSetRole(event.target.value)}>
                    <option value="">Select Job Role</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="UI">UI</option>
                    <option value="TESTER">TESTER</option>
                  </select>
                </label>
              </div>
              <div className='input-form-add'>
                <label>
                  Number of Employees:
                  {/* <input type="text" value={props.propNumberEmployee} onChange={(event) => props.propsSetNumberEmployee(event.target.value)}/> */}
                  <Input type='text' size="large" placeholder="Name" addonBefore={<TbIcons.TbNumbers size={15}/>} />
                  <button type="button" onClick={props.propHandleRandomClick}>Generate</button>
                </label>
              </div>
              <div className='input-form-add'>
                <label>
                  Email:
                  {/* <input type="email" value={props.propEmail} onChange={(event) => props.propSetEmail(event.target.value)} /> */}
                  <Input type='email' size="large" placeholder="Email" addonBefore={<HiIcons.HiOutlineMail size={15}/>} />
                </label>
              </div>
            </form>
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
    </div>
  )
}

export default FormAddEmployee

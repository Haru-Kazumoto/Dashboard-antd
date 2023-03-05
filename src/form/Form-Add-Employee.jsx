import React from 'react'
import { Space, Button, Modal } from 'antd';
import { ToastContainer } from "react-toastify";
import * as HiIcons from 'react-icons/hi';
import "react-toastify/dist/ReactToastify.css";

const FormAddEmployee = (props) => {
  return (
    <div >
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
            centered
            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            closable={false}
            open={props.onVisible}
            title={<div style={{ textAlign: 'center' }}>Add new record</div>}
            onCancel={() => {
              props.onCloseModal();
              props.onForm.resetFields();
            }}
            footer={[
              <div style={{ textAlign: 'center' }} key="footer">
                <Button 
                  key="cancel"
                  onClick={() => {
                    props.onSetVisible(false);
                    props.onForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button key="submit" type="primary" onClick={props.propOnClick}>
                  Submit
                </Button>
              </div>
            ]}
          >
            <form onSubmit={props.onHandleSubmit}>
              <div>
                <input type="text" required 
                  placeholder='Name'
                  value={props.propName} 
                  onChange={
                    (event) => props.propSetName(event.target.value) 
                  }
                  className='input-form-add'
                  />
              </div>
              <div>
                <select required value={props.propGender} onChange={(event) => props.propSetGender(event.target.value)} className='input-form-add'>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
              </div>
              <div>
                <select required value={props.propRrole} onChange={(event) => props.propSetRole(event.target.value)} className='input-form-add'>
                    <option value="">Select Job Role</option>
                    <option value="BACKEND">Backend</option>
                    <option value="FRONTEND">Frontend</option>
                    <option value="UI">Ui</option>
                    <option value="TESTER">Tester</option>
                  </select>
              </div>
              <div>
              <input placeholder='Number Employee' required type="text" value={props.propNumberEmployee} onChange={(event) => props.propsSetNumberEmployee(event.target.value)} className='input-form-add-number-employee'/>
                <button type="button" onClick={props.propHandleRandomClick} className='input-button-generate'>Generate</button>
              </div>
              <div>
                <input placeholder='Email' required type="email" value={props.propEmail} onChange={(event) => props.propSetEmail(event.target.value)} className='input-form-add'/>
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

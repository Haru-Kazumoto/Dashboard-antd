import { Layout, Menu, Avatar, Tooltip, Drawer, Button, Space, Popconfirm, message, } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile-card/Profile';
import * as BiIcons from 'react-icons/bi';
import { SideNav } from './SideNav';
import PageContent from './Page-content';
import React from 'react';
import '../App.css';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
    const confirm = () =>
        new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
            message.success('Logout success.')
        }, 3000);
    }); 
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    return (
            <Layout className='layout-container'>
                <Sider breakpoint="lg" collapsedWidth="0">
                    <div className="logo" style={{color: 'white', textAlign: 'center'}}>
                        <img src="./logo192.png" alt="logo" />
                    </div>
                        <Menu 
                            theme="dark" 
                            mode="inline" 
                            defaultSelectedKeys={['4']}
                            onClick={(item) => {
                                navigate(item.key);
                            }}
                            items={SideNav.map((data) => {
                                return {
                                    key: data.key,
                                    label: data.label,
                                    icon: data.icon
                                };
                            })}
                        />
                </Sider>
                <Layout>
                    <Header className='header'>
                        <Tooltip placement="bottomRight" title="Profile">
                            <Avatar className='avatar-header' src={'avatar.jpg'} onClick={toggle}/>
                        </Tooltip>
                        <Drawer 
                            open={isOpen}
                            title="Profile" 
                            closable={false}
                            placement='right'
                            onClose={() => {setIsOpen(false)}}>
                            <Avatar
                                size={250}
                                src={'avatar.jpg'}
                                className='avatar-header-profile'/>         
                            {Profile.map((data) => {
                                return(
                                    <div className="sub-profile">
                                        <div className="icon">{data.icon}</div>
                                        <div className="text">{data.text}</div>
                                    </div>
                                )
                            })}
                            <Space wrap className='logout-button'>
                                <Popconfirm
                                    title="Warning"
                                    description="Are you sure want to log out?"
                                    icon={<QuestionCircleOutlined style={{color: 'red',}}/>}
                                    onConfirm={confirm}
                                    onOpenChange={() => console.log('Logout button triggered')}>                            
                                        <Button type="primary" danger>
                                            <BiIcons.BiLogOut className='logo-logout-profile'/>
                                            <span className="text-logout">Logout</span>
                                        </Button>
                                </Popconfirm>
                            </Space>
                        </Drawer>
                    </Header>
                    <Content className='content-container' >
                        <div className="content">
                            <PageContent />
                        </div>
                    </Content>
                </Layout>
            </Layout>
    );
};
export default Dashboard;
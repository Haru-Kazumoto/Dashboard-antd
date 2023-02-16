import React from 'react'
import { Space, Statistic, Card, Col, Row } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const UserData = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{
                color: '#3f8600',
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{
                color: '#cf1322',
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

function DashboardCard({title, value, icon}) {
  return (
    <Card className='card-dashboard'>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

export default UserData

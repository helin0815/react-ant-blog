import React from 'react'
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Dropdown, Layout, message, Modal } from 'antd'
import { useAdminInfo } from '../../hooks/useAdmin'

import './MainHeader.scss'

const { Header } = Layout

export default function MainHeader(props) {
  const { admin, logout } = useAdminInfo()
  const items = [{ label: '退出登录1', key: 'logout' }]

  // 登出
  const onLogout = ({ key }) => {
    if (key === 'logout') {
      Modal.confirm({
        title: '你好，确定退出系统吗',
        okText: '退出登录',
        cancelText: '取消',
        content: '确定后需要重新登陆',
        onOk() {
          logout()
          message.success('退出登录成功!')
        },
        onCancel() {
          message.info('取消')
        }
      })
    }
  }

  return (
    <div>
      <Header className="site-layout-background header-container" style={{ padding: '0 40px' }}>
        <div className="header-left">
          {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => props.setCollapsed(!props.collapsed)
          })}
        </div>

        <Dropdown className="header-right" menu={{ items, onClick: onLogout }}>
          <div className="header-right-inner">
            您好，{admin ? admin.nickname : '请登录'}
            <DownOutlined style={{ marginLeft: '10px' }} />
          </div>
        </Dropdown>
      </Header>
    </div>
  )
}

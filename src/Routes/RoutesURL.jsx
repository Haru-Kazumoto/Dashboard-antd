import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardData from '../Pages/Dashboard-data'
import EmployeeData from '../Pages/Employee-data'
import UserData from '../Pages/User-data'

const RoutesURL = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardData />} />
      <Route path='/user-data' element={<EmployeeData />} />
      <Route path='/employee-data' element={<UserData />} />
    </Routes>
  )
}

export default RoutesURL

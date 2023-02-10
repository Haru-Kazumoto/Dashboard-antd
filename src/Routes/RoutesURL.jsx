import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardData from '../Pages/Dashboard-data'
import EmployeeData from '../Pages/Employee-data'
import UserData from '../Pages/User-data'

const RoutesURL = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardData />} />
      <Route path='/user-data' element={<UserData />} />
      <Route path='/employee-data' element={<EmployeeData />} />
    </Routes>
  )
}

export default RoutesURL

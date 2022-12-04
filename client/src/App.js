import React from "react";
import './override.css'
import Home from "./pages/Home";
import CreateSR from './pages/CreateSR'
import Admin from "./pages/Admin";
import ManageUsers from "./pages/ManageUsers";
import WeeklyReport from "./pages/WeeklyReport";
import ViewReport from "./pages/ViewReport";
import Inventory from "./pages/Inventory";
import Attendance from "./pages/Attendance";
import Layout from "./components/Layout";
import MissingPage from "./components/Missing";
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth'
import UsersPage from './pages/UsersPage'
import PersistLogin from './components/PersistLogin'
import SignPendingReports from './pages/SignPendingReports'
import EditReport from './pages/EditReport'

import {Route, Routes} from 'react-router-dom'

const ROLES_LIST = {
  Administrator: 1999,
  Supervisor: 2121,
  Manager: 2699
}

const App = (props) => {
  return (
      <Routes>
          <Route path='/' element={<Layout/>}>
            {/* Public Routes */}
            
            <Route path='unauthorized' element={<Unauthorized />} />

            {/* All user routes */}
            <Route element={<PersistLogin/>}>
              <Route path='weekly' element={<WeeklyReport/>} />
              <Route path='inventory' element={<Inventory/>} />
              <Route path='view' element={<ViewReport />} />
              <Route path='/' element={<Home/>}/> 
              <Route path='attendance' element={<Attendance/>} />
              
              {/* Routes accessible for all roles */}
              <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Administrator, ROLES_LIST.Supervisor, ROLES_LIST.Manager]}/>}>
                {/* <Route path='home' element={<UsersPage/>} /> */}
                <Route path='home' element={<UsersPage/>} />
              </Route>


              {/* Admin Routes */}
              <Route element={<RequireAuth allowedRoles={[1999]} />} >
                <Route path='home/manage_users' element={<ManageUsers/>}/>
                <Route path='home/edit' element={<EditReport/>} />
              </Route>
              
              {/* Supervisor Routes */}
              <Route element={<RequireAuth allowedRoles={[2121]} />} >
                <Route path='supervisor/create' element={<CreateSR/>} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[2121, 2699]} />} >
                {/* Manager Routes and Supervisor Routes */}
                <Route path='sign' element={<SignPendingReports/>} />
              </Route>

              {/* Catch All */}
              <Route path='*' element={<MissingPage/>} />            
            </Route>
          </Route>
      </Routes>
  );
}

export default App;
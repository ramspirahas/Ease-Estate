import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './components/Home'; // Create a Home component for the root path
import Header from './components/Header';
import Register from './components/usermanagement/Register';
import Login from './components/usermanagement/Login';
import About from './components/about';
import AddAppointment from './components/AppointmentManagement/AddAppointment';
import Appointment from './components/AppointmentManagement/Appointment';
import Profile from './components/usermanagement/Profile';
import ViewGoals from './components/GoalManagement/ViewGoals';
import Addprop from './components/Properties/Addprop';
import Sale from './components/Sale';
import PropertyList from './components/Properties/PropertyList';
import Update from './components/Properties/Update';
import UserTable from './components/usermanagement/UserTable';
import AppointmentUpdate from './components/AppointmentManagement/AppointmentUpdate';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Calender from "./components/SchedulerComponent/user_scheduler"



const App = () => {
    return (
        <Router>
            <div>
                {/* Header is displayed on all pages */}
                <Header />
<br />
                {/* Main Routes */}
                <Routes>
                    {/* Root path for the home page */}
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home />} />

                    {/* Proanperty management routes */}
                    {/* <Route path="/propertyManagement/list" element={<Propertylist />} /> */}
                   

                    {/* User routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* About page */}
                    <Route path="/about" element={<About />} />

                    {/* Donor management routes */}
                    <Route path="/AddAppointment" element={<AddAppointment />} />
                    <Route path="/AddAppointment/add" element={<Calender />} />
              
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/viewGoals" element={<ViewGoals />} />

                    {/* Admin dashboard */}
                    <Route path="/Addprop" element={<Addprop />} />
                    <Route path="/Sale" element={<Sale/>} />
                    <Route path="/PropertyList" element={<PropertyList/>} />
                    <Route path="/update/:id" element={<Update />} /> 
                    <Route path="/UserTable" element={<UserTable />} /> 
                    <Route path="/AppointmentUpdate" element={<AppointmentUpdate />} /> 
                    <Route path="/Admin" element={<Admin />} /> 
                </Routes>
  <br />
                <Footer />
            </div>
        </Router>
    );
};

export default App;

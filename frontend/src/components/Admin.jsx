import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">EASE REAL ESTATE</h2>

      <div className="grid grid-cols-2 gap-6">
        <div
          className="center w-48 h-20 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate("/Addprop")}
        >
          Add Properties
        </div>

        <div
          className="center w-48 h-20 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate("/payments")}
        >
          Payments
        </div>

        <div
          className="center w-48 h-20 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate("/AppointmentUpdate")}
        >
          Meetings
        </div>

        <div
          className="center w-48 h-20 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate("/PropertyList")}
        >
          Current Sales
        </div>

        <div
          className="center w-48 h-20 bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate("/UserTable")}
        >
          Users
        </div>

        <div
          className="center w-48 h-20 bg-red-600 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-red-500"
          onClick={() => navigate("/logout")}
        >
          Logout
        </div>
      </div>

     
    </div>
  );
};

export default Admin;

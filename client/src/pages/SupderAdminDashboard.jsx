import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import StudentList from "./StudentList";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { url, handleLogout } = useAuth();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get(`${url}/api/v1/get-all-users`, {
  //       withCredentials: true,
  //     });
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 p-6">
        <StudentList />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
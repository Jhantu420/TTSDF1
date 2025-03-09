import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [branches, setBranches] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/get-user-details`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch(`${url}/api/v1/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // ✅ Wrap functions with useCallback to prevent re-creation on each render
  const getBranches = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/v1/getBranches`);
      setBranches(response.data.branches);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  }, []);

  const getCourses = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/v1/getCourse`);
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBranches();
    getCourses();
  }, [getBranches, getCourses]); // ✅ Now the dependencies are stable
  
  return (
    <AppContext.Provider value={{ user, setUser, loading, url, handleLogout, branches, getBranches, courses }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AppContext);

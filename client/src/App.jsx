import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import ApplyCourse from "./pages/ApplyCourse";
import PageNotFound from "./pages/PageNotFound";
import StudentDashboard from "./pages/StudentDashboard";
import SuperAdminDashboard from "./pages/SupderAdminDashboard";
import BranchAdminDashboard from "./pages/BranchAdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./context/AppContext";
import CreateBranch from "./pages/CreateBranch";
import RegisterStudent from "./pages/RegisterStudents";
import CreateCourses from "./pages/CreateCourses";
import CreateBranchAdmins from "./pages/CreateBranchAdmins";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import BranchAdminLayout from "./layouts/BranchAdminLayout";
import ResetPassword from "./pages/ResetPassword";
import ImageUploader from "./pages/ImageUploader";

// ✅ Handle environment variables properly
const googleClientId = import.meta.env?.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevents flickering issues

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="flex flex-col ">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/apply-course" element={<ApplyCourse />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

            {/* 🔒 Prevent logged-in users from accessing the login page */}
            <Route
              path="/login"
              element={
                user ? <Navigate to={`/${user.role}`} replace /> : <Login />
              }
            />

            {/* 🚀 Protected Routes with Role-Based Access */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/student" element={<StudentDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["super"]} />}>
              <Route path="/super" element={<SuperAdminLayout />}>
                <Route index element={<SuperAdminDashboard />} />
                <Route
                  path="super-create-branches"
                  element={<CreateBranch />}
                />
                <Route path="create-students" element={<RegisterStudent />} />
                <Route
                  path="super-create-courses"
                  element={<CreateCourses />}
                />
                <Route
                  path="super-create-branch-admin"
                  element={<CreateBranchAdmins />}
                />
                <Route
                  path="super-upload-recent-images"
                  element={<ImageUploader />}
                />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["branchAdmin"]} />}>
              <Route path="/branchAdmin" element={<BranchAdminLayout />}>
                <Route index element={<BranchAdminDashboard />} />
                <Route path="create-students" element={<RegisterStudent />} />
              </Route>
            </Route>

            {/* <Route element={<ProtectedRoute allowedRoles={["branchAdmin"]} />}>
              <Route path="/branchAdmin" element={<BranchAdminDashboard />} />
            </Route> */}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

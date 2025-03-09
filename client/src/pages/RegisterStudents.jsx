import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AppContext";

const RegisterStudents = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    fathername: "",
    mothername: "",
    address: "",
    dob: "",
    dor: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    role: "student",
    branchName: "",
    courseName:"",
    images: [],
  });

  const { url, branches, courses } = useAuth();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setStudentData({ ...studentData, images: e.target.files });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(studentData).forEach((key) => {
        if (key === "images") {
          Array.from(studentData.images).forEach((file) =>
            formData.append("images", file)
          );
        } else {
          formData.append(key, studentData[key]);
        }
      });

      const res = await axios.post(`${url}/api/v1/register-user`, formData, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      toast.error(res.data.error);
      setRegisteredEmail(studentData.email); // Store email for OTP verification
      setOtpSent(true);
      document.getElementById("imageUpload").value = null;
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Error registering student."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError("Please enter the OTP.");
    try {
      const res = await axios.post(`${url}/api/v1/verifyOtp`, {
        email: registeredEmail,
        otp,
      });
      toast.success(res.data.message);
      toast.error(res.data.error);
      setOtpSent(false);
      setStudentData({
        name: "",
        fathername: "",
        mothername: "",
        address: "",
        dob: "",
        dor: "",
        gender: "",
        mobile: "",
        email: "",
        password: "",
        role: "student",
        branchName: "",
        courseName:"",
        images: [],
      });
      setOtp("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <section className="bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        {!otpSent ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Father's Name", name: "fathername", type: "text" },
              { label: "Mother's Name", name: "mothername", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Date of Registration", name: "dor", type: "date" },
              { label: "Mobile Number", name: "mobile", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={studentData[name]}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            ))}

            {/* Gender Selection */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </label>
              <select
                name="gender"
                value={studentData.gender}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* Branch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Branch Name
              </label>
              <select
                name="branchName"
                value={studentData.branchName}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch.branch_name}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Course Name
              </label>
              <select
                name="courseName"
                value={studentData.courseName}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select Course</option>
                {courses.map((courses) => (
                  <option key={courses._id} value={courses.course_name}>
                    {courses.course_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Upload Image */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Upload Profile Image
              </label>
              <input
                id="imageUpload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Student"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-900 dark:text-white text-center">
              OTP Verification
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-2.5 border rounded-lg focus:ring focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-300 cursor-pointer"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegisterStudents;

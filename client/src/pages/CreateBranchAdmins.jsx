import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AppContext";

const CreateBranchAdmins = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branchName: "",
    role: "branchAdmin",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { url, branches } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/v1/branchadmin`, formData, {
        withCredentials: true,
      });
      alert(res.data.message);
      setRegisteredEmail(formData.email);
      setOtpSent(true);
    } catch (error) {
      setError(error.response?.data?.message || "Error registering admin");
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
      alert(res.data.message);
      setOtpSent(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        branchName: "",
        role: "branchAdmin",
      });
      setOtp("");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP.");
    }
  };

  return (
    <section className=" flex items-center justify-center bg-gray-100 ">
      <div className="w-full  md:max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center">
          Register a Branch Admin
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!otpSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Branch Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Branch Name
                </label>
                <select
                  name="branchName"
                  value={formData.branchName}
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
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Admin"}
            </button>
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

export default CreateBranchAdmins;

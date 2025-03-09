import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export default function ApplyCourse() {
  const { url } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    center: "",
    course: "",
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/getCourse`);
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    if (url) fetchCourses();
  }, [url]); // Add url as a dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${url}/api/v1/applyCourse`, formData);
      if (res.data.success) {
        setMessage(res.data.message);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          center: "",
          course: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-10">
      <h1 className="mb-8 font-extrabold text-4xl">Apply for a Course</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label className="block font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none mt-1"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none mt-1"
              id="mobile"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none mt-1"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="center">
              Center
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none mt-1"
              id="center"
              type="text"
              name="center"
              value={formData.center}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="course">
              Course
            </label>
            <select
              className="w-full shadow-inner bg-gray-100 rounded-lg text-2xl p-4 border-none mt-1"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course.course_name}>
                  {course.course_full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Apply
            </button>
          </div>

          {message && (
            <p className="mt-4 text-green-600 font-semibold">{message}</p>
          )}
          {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        </div>

        <aside>
          <div className="bg-gray-100 p-8 rounded">
            <h2 className="font-bold text-2xl">Instructions</h2>
            <ul className="list-disc mt-4 list-inside">
              <li>All fields are required to apply for a course.</li>
              <li>Provide a valid email address and mobile number.</li>
              <li>
                Ensure that you've not applied before with the same mobile
                number.
              </li>
            </ul>
          </div>
        </aside>
      </form>
    </div>
  );
}

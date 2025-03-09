import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AppContext";

const Courses = () => {
  const { courses } = useAuth();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false); // Force re-render for UI updates
  const currentImageIndexes = useRef({});
  const intervalsRef = useRef({}); // Store intervals to avoid re-renders

  useEffect(() => {
    if (!courses || !Array.isArray(courses) || courses.length === 0) return;
    setLoading(false);

    courses.forEach((course) => {
      if (!currentImageIndexes.current[course._id]) {
        currentImageIndexes.current[course._id] = 0; // Initialize index if not set
      }

      if (
        Array.isArray(course.image) &&
        course.image.length > 1 &&
        !intervalsRef.current[course._id]
      ) {
        intervalsRef.current[course._id] = setInterval(() => {
          currentImageIndexes.current[course._id] =
            (currentImageIndexes.current[course._id] + 1) % course.image.length;
          setRender((prev) => !prev); // Force UI update without re-fetching courses
        }, 2000);
      }
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
      intervalsRef.current = {};
    };
  }, [courses]);

  // Show loading state before data is available
  if (loading) {
    return <p className="text-center text-gray-600">Loading courses...</p>;
  }

  // Show message if no courses are available
  if (!courses || courses.length === 0) {
    return <p className="text-center text-gray-600">No courses available</p>;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          📚 Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col"
            >
              {/* Course Image */}
              <div className="relative w-full h-56 overflow-hidden rounded-lg">
                {Array.isArray(course.image) && course.image.length > 0 ? (
                  <img
                    src={course.image[currentImageIndexes.current[course._id] || 0]}
                    alt={course.course_name}
                    className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </div>

              {/* Course Information */}
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                {course.course_full_name} ({course.course_name})
              </h3>
              <p className="text-gray-600 mt-2">⏳ Duration: {course.course_duration}</p>

              {/* Course Content */}
              <h4 className="text-lg font-semibold text-gray-900 mt-4">
                📖 Course Content
              </h4>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {(() => {
                  try {
                    const content = Array.isArray(course.course_content)
                      ? course.course_content
                      : JSON.parse(course.course_content);
                    return content.map((item, index) => <li key={index}>{item}</li>);
                  } catch (error) {
                    console.error("Invalid JSON in course_content:", course.course_content);
                    return <li>Invalid course content</li>;
                  }
                })()}
              </ul>

              {/* Extra Facilities */}
              <h4 className="text-lg font-semibold text-gray-900 mt-4">
                🎁 Extra Facilities
              </h4>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {(() => {
                  try {
                    const facilities = Array.isArray(course.extra_facilities)
                      ? course.extra_facilities
                      : JSON.parse(course.extra_facilities);
                    return facilities.map((facility, index) => (
                      <li key={index}>{facility.replace(/\[|\]/g, "")}</li>
                    ));
                  } catch (error) {
                    console.error("Invalid JSON in extra_facilities:", course.extra_facilities);
                    return <li>Invalid extra facilities</li>;
                  }
                })()}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

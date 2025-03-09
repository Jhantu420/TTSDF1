import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AppContext";

const Contact = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { branches } = useAuth();
  
  useEffect(()=>{
    if(branches.length>0){
      setSelectedBranch(branches[0]);
    }
  })
  useEffect(() => {
    if (selectedBranch?.image?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % selectedBranch.image.length
        );
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(interval);
    }
  }, [selectedBranch]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    const branch = branches.find((b) => b._id === branchId);
    setSelectedBranch(branch);
    setCurrentImageIndex(0); // Reset image index when changing branch
  };
  const mapEmbed = useMemo(() => {
    return { __html: selectedBranch?.google_map_link || "" };
  }, [selectedBranch?.google_map_link]);

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:py-20 lg:px-12">
        {/* Branch Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            🏢 Select a Branch
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={handleBranchChange}
            value={selectedBranch?._id || ""}
          >
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branch_name}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              🏢 Branch Name
            </h3>
            <p className="mt-2 text-gray-600">{selectedBranch?.branch_name}</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              📍 Address
            </h3>
            <p className="mt-2 text-gray-600">
              {selectedBranch?.branch_address}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              📞 Contact
            </h3>
            <p className="mt-2 text-gray-600">
              ✉️ Email: {selectedBranch?.email}
            </p>
            <p className="mt-2 text-gray-600">
              📱 Phone: {selectedBranch?.mobile}
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              ✉️ Send Us a Message
            </h3>

            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="yourname@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  rows="4"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg shadow-md transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map & Image Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side - Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            {selectedBranch?.google_map_link && (
              <div
                dangerouslySetInnerHTML={mapEmbed}
                className="w-full h-96 md:h-[500px]"
              />
            )}
          </div>

          {/* Right Side - Branch Image Carousel */}
          <div className="flex justify-center items-center relative w-full h-96 md:h-[500px]">
            {selectedBranch?.image?.length > 0 ? (
              <img
                src={selectedBranch.image[currentImageIndex]}
                alt="Branch"
                className="rounded-2xl shadow-lg w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
              />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;







// import react from "React";
// import { useAuth } from "../context/AppContext";
// const Contact = () => {
//   const { branches } = useAuth();
//   console.log("This is our", branches);
//   return (
//     <>
//       <h1>Contact</h1>
//       {branches.map((item, index) => (
//         <div key={index}>
//           <li>{item._id}</li>
//         </div>
//       ))}
//     </>
//   );
// };
// export default Contact;

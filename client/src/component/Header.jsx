import React from "react";
import { ArrowRight } from "lucide-react";
import HeaderStudent from "../assets/headerStudent.png";
import RecentHighLight from "./RecentHighLight";
import DirectorMsg from "./DirectorMsg";
import AffiliatedLogo from "./AffiliatedLogo";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/apply-course")
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 p-5 lg:p-10 m-5 lg:m-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={HeaderStudent}
            alt="Header Student"
            className="rounded-md w-full"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Find Your Course <br /> & Strengthen Your Knowledge
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            "Your journey to mastering technology starts here. Empower yourself
            with the skills of tomorrow, today. <br /> Learn, grow, and innovate
            with expert guidance every step of the way."
          </p>
          <button onClick={handleClick} className="flex items-center justify-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-all shadow-xl text-lg mx-auto lg:mx-0 cursor-pointer">
            Enroll Now
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Additional Components */}
      <RecentHighLight />
      <DirectorMsg />
      <AffiliatedLogo />
    </>
  );
};

export default Header;

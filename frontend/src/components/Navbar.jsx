import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex justify-between items-center px-10 py-5 absolute top-0">
        <div>
          <img src="/logo.svg" alt="" />
        </div>
        <div>
          <button onClick={()=>navigate('/login')}  className="flex cursor-pointer items-center gap-1.5 border border-gray-500 px-5 py-1 rounded-full">
            Login{" "}
            <span>
              <img src="/arrow_icon.svg" alt="" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React from "react";

const Herosec = () => {
  return (
    <>
      <div className="w-1/3 gap-4 h-full flex flex-col items-center text-center">
        <div>
          <img src="/header_img.png" className="rounded-full w-32" alt="" />
        </div>
        <div className="flex gap-4 items-center flex-col">
          <h1 className="">Hey Developer</h1>
          <h1 className="text-3xl font-bold">Welcome To Our App</h1>
          <p>
            Let's start with a quick product tour and we will have you up and
            running in no time!
          </p>
          <button className="px-5 w-fit cursor-pointer flex  py-1 text-center border border-zinc-300 rounded-full">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Herosec;

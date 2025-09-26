import React from "react";

const Info = () => {
  return (
    <div>
      info
      <div className="flex w-[50vw] bg-gray-600 h-20 items-center justify-between">
        <input
          type="text"
          className="bg-white h-[20px] px-[10px] py-[20px] w-full"
        />
        <button>Click</button>
      </div>
    </div>
  );
};

export default Info;

import React from "react";

const Placeholder = ({ label }) => {
  return (
    <span className="bg-black text-white px-2 py-1 rounded-md text-xs  ">
      {label}
    </span>
  );
};

export default Placeholder;

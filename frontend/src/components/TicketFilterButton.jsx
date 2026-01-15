import React from "react";

const TicketFilterButton = ({
  label,
  setticketButtonInputs,
  count
}) => {
  function handleClick(e) {
    setticketButtonInputs(e.target.dataset.label);
  }
  return (
    <button
      onClick={handleClick}
      data-label={label}
      className={`p-1 px-2 font-medium cursor-pointer text-xs rounded-md ${
        label === "All" && "bg-blue-500 text-blue-200"
      } ${label === "Open" && "bg-[#76A787] text-green-900"} ${
        label === "In-Progress" && "bg-[#F2B418] text-yellow-900"
      } ${label === "Closed" && "bg-[#CCC7BF] text-gray-600"}`}
    >
      {label}
      <span data-label={label} className=" text-xs text-white rounded-full ml-2">{count}</span>
    </button>
  );
};

export default TicketFilterButton;

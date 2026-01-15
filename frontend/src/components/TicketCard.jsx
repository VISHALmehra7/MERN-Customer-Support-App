import React from "react";
import { IoTrashBin } from "react-icons/io5";

const TicketCard = ({
  title,
  category,
  username,
  onClick,
  status,
  setShowModal,
  role,
}) => {
  function changeColor(status) {
    if (status === "open") {
      return "#76A787";
    } else if (status === "in-progress") {
      return "#F2B418";
    } else if (status === "closed") {
      return "#CCC7BF";
    }
  }
  function handleDeleteClick(e) {
    setShowModal();
  }

  return (
    <div
      onClick={onClick}
      className={`border cursor-pointer border-none shadow-md bg-white rounded-lg wrap-break-word p-2 flex justify-between items-center `}
      style={{ backgroundColor: changeColor(status) }}
    >
      <div>
        <h1 className="text-gray-900 text-sm font-bold">{title}</h1>
        <p className="text-xs ">{username}</p>
        <p className="font-medium text-white">
          {category ? category : "No Category"}
        </p>
      </div>
      {role === "agent" ? (
        <div className="text-center" onClick={handleDeleteClick}>
          <IoTrashBin color="black" />
        </div>
      ) : null}
    </div>
  );
};

export default TicketCard;

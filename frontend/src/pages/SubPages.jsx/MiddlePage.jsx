import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { authStore } from "../../store/authStore.js";
import { ticketStore } from "../../store/ticketStore.js";

const MiddlePage = () => {
  const role = authStore((state) => state.role);
  const currentTicket = ticketStore((state) => state.currentTicket);
  const { createTicket, isTicketLoading } = ticketStore();
  const [ticketInput, setticketInput] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ticketInput.title || !ticketInput.description) {
      return;
    }
    await createTicket(ticketInput);
    setticketInput({
      title: "",
      description: "",
    });
    try {
      console.log(ticketInput);
    } catch (error) {
      console.log(error);
    }
  }

  function dates(currentDate) {
    const ticketDate = new Date(currentDate);
    const dateObj = { day: "numeric", month: "long", year: "numeric" };
    return ticketDate.toLocaleDateString(ticketDate, dateObj);
  }

  return (
    <div className="bg-gray-200 h-screen p-3 ">
      <div className=" flex items-center justify-center bg-[#FAFAFA] border border-[#F1F1F1] h-full  rounded-2xl overflow-y-auto hide-scrollbar">
        <div className=" flex items-center justify-center  p-6">
          {role === "user" ? (
            <div className=" p-2 shadow-md flex flex-col items-center justify-center gap-4 ">
              <h1 className="text-center">Ticket Form</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center gap-3"
              >
                <Input
                  type={"text"}
                  placeholder={"title"}
                  value={ticketInput?.title}
                  onChange={(e) =>
                    setticketInput({ ...ticketInput, title: e.target.value })
                  }
                />

                <textarea
                  className="w-full border border-[#E5E5E5] p-2 rounded-md focus:outline-none focus:border-b-black placeholder:text-sm max-h-[120px] text-sm resize-none"
                  placeholder="description..."
                  value={ticketInput?.description}
                  onChange={(e) =>
                    setticketInput({
                      ...ticketInput,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <Button
                  loading={isTicketLoading}
                  type={"submit"}
                  label={"CREATE"}
                />
              </form>
            </div>
          ) : (
            <div className="p-2 px-3 shadow-md text-center flex flex-col items-center justify-center gap-4 rounded-md border border-[#F1F1F1]  ">
              <h1 className="font-bold ">
                {currentTicket ? currentTicket.title : ""}
              </h1>
              <p className="text-[#6a696f] font-bold text-sm">
                {currentTicket ? currentTicket.createdBy.name : ""}
              </p>

              <p className="text-sm text-[#6a696f] bg-gray-100 rounded-md w-full px-3 py-4">
                {currentTicket
                  ? currentTicket.description
                  : "Click On Tickets To See The Details"}
              </p>
              <div className="flex  items-center gap-5">
                <span className="bg-emerald-200 text-green-800 px-2 py-1 rounded-md">
                  {currentTicket ? currentTicket.status : ""}
                </span>
                <span className="bg-pink-300 text-red-800 px-2 py-1 rounded-md">
                  {currentTicket ? currentTicket.category : ""}
                </span>
              </div>
              {currentTicket ? (
                <span className="text-gray-400 text-xs">
                  <span>Created at : </span>
                  {dates(currentTicket ? currentTicket.createdAt : "")}
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiddlePage;

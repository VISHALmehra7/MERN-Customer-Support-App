import React, { useEffect } from "react";
import TicketCard from "../../components/TicketCard";
import { RiLogoutBoxLine } from "react-icons/ri";
import { authStore } from "../../store/authStore.js";
import { ticketStore } from "../../store/ticketStore.js";
import TicketFilterButton from "../../components/TicketFilterButton.jsx";
import { useState } from "react";
import { all } from "axios";

const LeftPage = () => {
  const { logout, isLoading } = authStore();
  const {
    fetchUserTicket,
    isTicketLoading,
    userTicket,
    fetchAllTickets,
    allTickets,
    setCurrentTicket,
    setShowModal,
    openTickets,
    closedTickets,
    inProgressTickets,
  } = ticketStore();
  const user = authStore((state) => state.user);
  const role = authStore((state) => state.role);
  const [ticketButtonInputs, setticketButtonInputs] = useState("All");

  async function handleLogout(e) {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchTicket() {
    try {
      if (role === "user") {
        await fetchUserTicket();
      } else if (role === "agent") {
        await fetchAllTickets();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTicket();
  }, []);

  const BUTTON_DATA = [
    {
      id: 1,
      label: "All",
      role: "user",
      count: role === "user" ? userTicket?.length : allTickets?.length,
    },
    {
      id: 2,
      label: "Open",
      role: "user",
      count: categoriseTicket('open')?.length
    },
    {
      id: 3,
      label: "In-Progress",
      role: "user",
      count: categoriseTicket('in-progress')?.length,
    },
    role === "agent" && {
      id: 4,
      label: "Closed",
      role: "agent",
      count: categoriseTicket('closed')?.length,
    },
  ];

  function categoriseTicket(desiredStatus) {
    const tickets = role === "user" ? userTicket : allTickets;
    const yourTicket = tickets?.filter((singleTicket) => {
      return singleTicket.status === desiredStatus;
    });
    return yourTicket;
  }

  function ticketToRender() {
    switch (ticketButtonInputs) {
      case "All":
        if (role === "user") return userTicket;
        return allTickets;
      case "Open":
        return categoriseTicket("open");
      case "Closed":
        return categoriseTicket("closed");
      case "In-Progress":
        return categoriseTicket("in-progress");
    }
  }

  useEffect(() => {
    ticketToRender();
  }, [ticketButtonInputs]);

  return (
    <div className=" bg-gray-200 h-screen p-3 ">
      <div className="bg-gray-200 h-full  rounded-2xl overflow-y-auto  hide-scrollbar">
        <div className="flex justify-between items-center pr-2">
          <h2 className="bg-gray-200 font-bold text-lg mb-2 p-2 sticky top-0 left-0">
            TICKETS
          </h2>
          <span className="cursor-pointer " onClick={handleLogout}>
            <RiLogoutBoxLine size={20} />
          </span>
        </div>
        <div className="flex gap-1 justify-evenly items-center flex-wrap mb-1">
          {BUTTON_DATA.map((singleButton) => (
            <div key={singleButton.id}>
              <TicketFilterButton
                key={singleButton.id}
                label={singleButton.label}
                ticketButtonInputs={ticketButtonInputs}
                setticketButtonInputs={setticketButtonInputs}
                count={singleButton.count}
              />
            </div>
          ))}
        </div>
        <div className="h-full p-6 flex flex-col gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hide-scrollbar ">
          {role === "user"
            ? ticketToRender()
              ? ticketToRender().map((singleTicket) => (
                  <TicketCard
                    onClick={() => {
                      setCurrentTicket(singleTicket);
                    }}
                    key={singleTicket._id}
                    title={singleTicket.title}
                    category={singleTicket.category}
                    username={user && user.name}
                    status={singleTicket.status}
                  />
                ))
              : <TicketCard title={"No Ticket To Show"}/>
            : ticketToRender()
            ? ticketToRender().map((singleTicket) => (
                <TicketCard
                  onClick={() => {
                    setCurrentTicket(singleTicket);
                  }}
                  key={singleTicket._id}
                  title={singleTicket.title}
                  category={singleTicket.category}
                  username={singleTicket.createdBy.name}
                  status={singleTicket.status}
                  setShowModal={setShowModal}
                  role={role}
                />
              ))
            : <TicketCard title={"No Ticket To Show"}/>}
        </div>
      </div>
    </div>
  );
};

export default LeftPage;

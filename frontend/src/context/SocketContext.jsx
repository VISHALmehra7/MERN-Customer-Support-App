import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { authStore } from "../store/authStore.js";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    if (isAuthenticated) {
      const socket = io("http://localhost:4000");
      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

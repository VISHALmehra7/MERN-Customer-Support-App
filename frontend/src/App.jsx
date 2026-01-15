import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { authStore } from "./store/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Input from "./components/Input";
import Button from "./components/Button";
import { ticketStore } from "./store/ticketStore.js";
import { useState } from "react";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (isAuthenticated && user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const showModal = ticketStore((state) => state.showModal);
  const currentTicket = ticketStore((state) => state.currentTicket);
  const role = authStore((state) => state.role);
  const checkAuth = authStore((state) => state.checkAuth);
  const { setShowModal } = ticketStore();
  const { saveKnowledge } = ticketStore();
  const [knowledgeInput, setKnowledgeInput] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (currentTicket) {
      setKnowledgeInput({
        title: currentTicket.title,
        content: "",
      });
    }
  }, [currentTicket]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!currentTicket) return;
      await saveKnowledge({
        title: currentTicket.title,
        content: knowledgeInput.content,
        ticketId: currentTicket._id,
      });

      setShowModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen w-screen relative">
      {showModal && (
        <div className="absolute z-50 bg-white/95 inset-0 flex items-center justify-center">
          <div className=" p-2 shadow-md flex flex-col items-center justify-center gap-4 ">
            <span className="cursor-pointer" onClick={setShowModal}>
              X
            </span>
            <div>
              <span className="text-center ">Close Ticket Form</span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-3"
            >
              <Input
                type={"text"}
                placeholder={"title"}
                value={currentTicket?.title}
                onChange={(e) =>
                  setKnowledgeInput({
                    ...knowledgeInput,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full border border-[#E5E5E5] p-2 rounded-md focus:outline-none focus:border-b-black placeholder:text-sm max-h-[120px] text-sm resize-none"
                placeholder="How did you solve the problem..."
                value={knowledgeInput.content}
                onChange={(e) =>
                  setKnowledgeInput({
                    ...knowledgeInput,
                    content: e.target.value,
                  })
                }
              ></textarea>
              <Button type={"submit"} label={"CREATE"} />
            </form>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

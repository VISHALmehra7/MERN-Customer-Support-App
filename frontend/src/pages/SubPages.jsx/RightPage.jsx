import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import { IoIosSend } from "react-icons/io";
import { ticketStore } from "../../store/ticketStore.js";
import { messageStore } from "../../store/messageStore.js";
import { useListenMessage } from "../../hooks/useListenMessge.js";
import { chatStore } from "../../store/aiStore.js";
import { authStore } from "../../store/authStore.js";

import AIChatBox from "../../components/AIChatBox.jsx";
import Placeholder from "../../components/Placeholder.jsx";

const RightPage = () => {
  useListenMessage();

  const { isLoading, createMessage, getAllMessage } = messageStore();
  const { createChatSummary, isChatLoading, createRagChat, clearRagChat } =
    chatStore();
  const [chatInput, setChatInput] = useState({ messageText: "" });
  const [question, setQuestion] = useState("");
  const [showQuestion, setshowQuestion] = useState(false);
  const [askedQuestion, setaskedQuestion] = useState("");
  const currentTicket = ticketStore((state) => state.currentTicket);
  const allMessages = messageStore((state) => state.allMessages);
  const summary = chatStore((state) => state.summary);
  const ragChat = chatStore((state) => state.ragChat);
  const role = authStore((state) => state.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.messageText || !currentTicket) return;

    try {
      await createMessage(chatInput.messageText, currentTicket._id);
      setChatInput({ messageText: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentTicket) return;

    const fetchMessages = async () => {
      try {
        await getAllMessage(currentTicket._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [currentTicket, getAllMessage]);

  async function handleChatSummary(e) {
    e.preventDefault();
    if (!currentTicket) return;

    try {
      await createChatSummary(currentTicket._id);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setshowQuestion(false);
    clearRagChat();
    setQuestion(e.target.value);
  }

  async function handleRagSubmit(e) {
    try {
      e.preventDefault();
      if (!question) return;
      setshowQuestion(true);
      setaskedQuestion(question);
      setQuestion("");
      await createRagChat(question);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-200 h-screen p-3">
      <div className=" bg-[#FAFAFA] border border-[#F1F1F1] h-full rounded-2xl overflow-y-auto hide-scrollbar p-2 flex flex-col items-center justify-between ">
        <div className="w-full">
          <div className="w-full max-w-[500px] h-[400px] bg-gray-200 rounded-md mb-2 relative p-2 overflow-y-auto hide-scrollbar mx-auto">
            {allMessages && allMessages.length > 0 ? (
              allMessages.map((singleMessage) => (
                <div
                  key={singleMessage._id}
                  className={`flex flex-col gap-4 justify-start ${
                    singleMessage.senderRole === "agent"
                      ? "items-start"
                      : "items-end"
                  } mb-2`}
                >
                  <div className="max-w-[50%] bg-white text-black text-sm p-2 border border-gray-100 shadow-md">
                    {singleMessage.messageText}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center text-gray-500 ">
                Begin Your Chat
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-2"
          >
            <Input
              type="text"
              placeholder="chat..."
              value={chatInput.messageText}
              onChange={(e) =>
                setChatInput({ ...chatInput, messageText: e.target.value })
              }
            />
            <button type="submit" className=" p-1 rounded-full">
              <IoIosSend size={30} color="blue" className="cursor-pointer" />
            </button>
          </form>
        </div>

        <AIChatBox
          summary={summary}
          isChatLoading={isChatLoading}
          handleChatSummary={handleChatSummary}
          role={role}
          question={question}
          handleChange={handleChange}
          handleRagSubmit={handleRagSubmit}
          ragChat={ragChat}
          showQuestion={showQuestion}
          askedQuestion={askedQuestion}
        />
      </div>
    </div>
  );
};

export default RightPage;

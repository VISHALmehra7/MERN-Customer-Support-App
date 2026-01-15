import React from "react";
import { MdSummarize } from "react-icons/md";
import Input from "./Input";
import { IoIosSend } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Placeholder from "./Placeholder";

const AIChatBox = ({
  summary,
  isChatLoading,
  handleChatSummary,
  role,
  question,
  handleChange,
  handleRagSubmit,
  ragChat,
  showQuestion,
  askedQuestion,
}) => {
  return (
    <div className=" w-full mt-2 max-w-[500px] h-[230px] bg-gray-200 rounded-md mb-2 relative p-2 overflow-y-auto hide-scrollbar mx-auto flex flex-col justify-between items-center ">
      <div className="  p-2 overflow-y-auto hide-scrollbar wrap-break-word  w-full ">
        <div className="flex flex-col justify-start items-end  text-sm p-1 gap-2 ">
          {showQuestion ? (
            <div className="max-w-[60%] bg-white text-black p-1 rounded-md ">
              {askedQuestion ? askedQuestion : null}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <Placeholder label={"Ask AI for solutions"} />
              <Placeholder label={"AI remembers past solutions"} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start items-start text-sm p-1">
          {" "}
          <div
            className={`max-w-[70%] ${
              (summary || ragChat) && "bg-blue-500"
            } text-white p-1 rounded-md`}
          >
            {isChatLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-black" />
            ) : summary ? (
              summary
            ) : (
              ragChat
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2">
          {role === "agent" ? (
            <form>
              <button
                disabled={isChatLoading}
                onClick={handleChatSummary}
                className="bg-blue-500 p-1 rounded-full cursor-pointer"
              >
                <MdSummarize color="white" size={20} />
              </button>
              <span className="text-gray-400">Summarize Chat</span>
            </form>
          ) : null}
          {role === "user" ? (
            <form
              onSubmit={handleRagSubmit}
              className="flex items-center justify-center gap-2 "
            >
              <div>
                <FaRobot size={30} color="purple" />
              </div>{" "}
              <Input
                type="text"
                placeholder="Ask AI anything..."
                color="white"
                value={question}
                onChange={handleChange}
              />
              <button
                disabled={isChatLoading}
                type="submit"
                className="bg-gray-300 p-1 rounded-full"
              >
                <IoIosSend size={20} color="white" className="cursor-pointer" />
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;

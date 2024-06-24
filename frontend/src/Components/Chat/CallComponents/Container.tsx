import React, { useState } from "react";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";
import { useSocketContext } from "../../../Context/SocketContext";
import { useDispatch } from "react-redux";
import { MdOutlineCallEnd } from "react-icons/md";
import { endCall } from "../../../Redux/ChatAuthSlice/chatSlice";

const Container = ({ data }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();
  const { socket } = useSocketContext();
  const [callAccepted, setCallAccepted] = useState(false);

  const endCallFun = () => {
    console.log("End call fun called.. ");
    dispatch(endCall());
  };

  return (
    <>
      <div className="p-2 w-full bg-slate-800 flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-5xl">{data.name}</span>
          <span className="text-lg">
            {callAccepted && data.callType !== "video"
              ? "On going call"
              : "Calling"}
          </span>
        </div>

        {(!callAccepted || data.callType === "voice") && (
          <div className="my-24">
            <img
              src={data.dp}
              alt="avatar"
              className="rounded-full"
              height={300}
              width={300}
            />
          </div>
        )}

        <div
          onClick={endCallFun}
          className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
          <MdOutlineCallEnd className="text-3xl cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Container;

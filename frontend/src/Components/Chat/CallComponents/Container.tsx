import React, { useState } from "react";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";
import { useSocketContext } from "../../../Context/SocketContext";
import { useDispatch } from "react-redux";

const Container = ({ data }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();
  const { socket } = useSocketContext();
  const [callAccepted, setCallAccepted] = useState(false);
  return (
    <>
      <div className="border border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-5xl">{data.name}</span>
          <span className="text-lg">
            {callAccepted && data.callType !== "video"
              ? "On going call"
              : "Calling"}
          </span>
        </div>

        {(!callAccepted || data.callType === "audio") && (
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
      </div>
    </>
  );
};

export default Container;

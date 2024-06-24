import React, { useState, useEffect } from "react";
import { useSocketContext } from "../../../Context/SocketContext";
import { useDispatch } from "react-redux";
import { MdOutlineCallEnd } from "react-icons/md";
import { endCall } from "../../../Redux/ChatAuthSlice/chatSlice";

interface ContainerProps {
  data: {
    _id: any;
    id: string;
    username: string;
    dp: string;
    callType: "video" | "voice";
  };
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const [callAccepted, setCallAccepted] = useState(false);

  const endCallFun = () => {
    console.log("id: ", data);
    dispatch(endCall());
    if (data.callType === "video") {
      socket?.emit("reject-video-call", { from: data?._id });
      socket?.emit("reject-video-call", { from: data?.id });
    } else {
      socket?.emit("reject-voice-call", { from: data?._id });
      socket?.emit("reject-voice-call", { from: data?.id });
    }
  };

  return (
    <div className="p-2 w-full bg-slate-800 flex flex-col h-screen overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl">{data.username}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video" ? "On going call" : "Calling"}
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
        className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full cursor-pointer">
        <MdOutlineCallEnd className="text-3xl" />
      </div>
    </div>
  );
};

export default Container;

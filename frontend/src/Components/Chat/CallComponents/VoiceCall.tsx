import React, { useEffect } from "react";
import useUserDetails from "../../../Hooks/useUserDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/reduxStore";
import { useSocketContext } from "../../../Context/SocketContext";

const Container = React.lazy(() => import("./Container"));

const VoiceCall = () => {
  const { voiceCall } = useSelector((state: RootState) => state.chat);
  const currentUser = useUserDetails();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (voiceCall.type === "out-going") {
      socket?.emit("outgoing-voice-call", {
        to: voiceCall._id,
        from: {
          id: currentUser?._id, // maybe id or _id check that
          dp: currentUser?.dp,
          name: currentUser?.name,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Container data={voiceCall} />
      </React.Suspense>
    </div>
  );
};

export default VoiceCall;

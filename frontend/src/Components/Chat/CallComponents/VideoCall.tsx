import React, { useEffect } from "react";
import useUserDetails from "../../../Hooks/useUserDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/reduxStore";
import { useSocketContext } from "../../../Context/SocketContext";

const Container = React.lazy(() => import("./Container"));

const VideoCall = () => {
  const { videoCall } = useSelector((state: RootState) => state.chat);
  const currentUser = useUserDetails();
  const { socket } = useSocketContext();

  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket?.emit("outgoing-video-call", {
        to: videoCall._id,
        from: {
          id: currentUser?._id, // maybe id or _id check that
          dp: currentUser?.dp,
          name: currentUser?.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Container data={videoCall} />
      </React.Suspense>
    </div>
  );
};

export default VideoCall;

import React from "react";
import { RootState } from "../../../Redux/Store/reduxStore";
import { useDispatch, useSelector } from "react-redux";

const IncomingVideoCall = () => {
  const dispatch = useDispatch();
  const { incomingVideoCall } = useSelector((state: RootState) => state.chat);

  const acceptCall = () => {};

  const rejectCall = () => {};

  return (
    <>
      <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-smflex gap-5 items-center justify-start p-4 text-white drop-shadow-2xl border-2 ">
        <div><img src={incomingVideoCall.dp} alt="avatar" width={70} height={70} className="rounded-full"/></div>
        <div>{incomingVideoCall.name}</div>
        <div className="text-xs">Incoming Video Call</div>
        <div className="flex gap-2 mt-2">
            <button className="bg-red-500 p-1 px-3 text-small rounded-full" onClick={rejectCall}>Reject</button>
            <button className="bg-green-500 p-1 px-3 text-small rounded-full" onClick={acceptCall}>Accept</button>
        </div>
      </div>
    </>
  );
};

export default IncomingVideoCall;

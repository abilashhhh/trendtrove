import React from "react";
import SendMessageInput from "./Components/SendMessageInput";
import ChatIndividualTopPortion from "./Components/ChatIndividualTopPortion";
import ChatCenter from "./ChatCenter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/reduxStore";
import VoiceCall from "./CallComponents/VoiceCall";
import VideoCall from "./CallComponents/VideoCall";

const ChatInnerMain: React.FC = () => {
  const dispatch = useDispatch();
  const { videoCall, voiceCall, incomingVoiceCall, incomingVideoCall } = useSelector((state: RootState) => state.chat);

  return (
   <>
      {videoCall && (
        <div className="h-full w-full max-h-full overflow-hidden">
          <VideoCall/>
        </div>
      )}

      {voiceCall && (
        <div  className="h-full w-full max-h-full overflow-hidden">
          <VoiceCall/>
        </div>
      )}
  {!videoCall && !voiceCall &&
   <div className="flex-grow p-1 lg:p-2 h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
   <ChatIndividualTopPortion />
   <ChatCenter />
   <SendMessageInput />
 </div>}
    
    </>
  );
};

export default ChatInnerMain;

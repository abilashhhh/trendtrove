 
import React from 'react';
import useUserDetails from '../../../Hooks/useUserDetails';
import useConversation from '../../../Hooks/useConversations';
import { useSelector } from 'react-redux';
import { RootState } from "../../../Redux/Store/reduxStore";
import { useSocketContext } from '../../../Context/SocketContext';

const Container = React.lazy(() => import("./Container"));

const VoiceCall = () => {
  const { voiceCall } = useSelector((state: RootState) => state.chat);
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails()
  const { socket } = useSocketContext();

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Container data={voiceCall} />
      </React.Suspense>
    </div>
  );
};

export default VoiceCall;

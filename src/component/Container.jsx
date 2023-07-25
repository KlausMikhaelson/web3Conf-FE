import Board from "./Board";
import CustomButton from "./CustomButtom";
import React, { useState, useContext, useEffect} from "react";
import { MyContext } from "../App";
import { useHuddle01 } from '@huddle01/react';
import { useLobby, useAudio, useVideo, useRoom, usePeers } from '@huddle01/react/hooks';
import { useSigner, useAccount } from "wagmi";
import { Audio, Video } from "@huddle01/react/components";
function Container() {
    const [color, setColor] = useState("black");
    const { address } = useAccount();
    const {
      roomId,
      setRoomId
     } = useContext(MyContext);
     const { initialize, isInitialized } = useHuddle01();
     const { joinLobby } = useLobby();
     const { 
      fetchAudioStream, stopAudioStream, error: micError, 
      produceAudio, stopProducingAudio ,   stream: micStream,
    } = useAudio();
 
    const { 
      fetchVideoStream, stopVideoStream, error: camError, 
      produceVideo, stopProducingVideo ,   stream: camStream,
    } = useVideo(); 
     const { joinRoom, leaveRoom } = useRoom();
     const { peers } = usePeers();
 


useEffect(() => {
  initialize("lxiHM4YZ52hb1tbgRTNkSDHZfNayJBpO")
  console.log()
}, []);

  return (
    <div className="conatiner mt-[7rem]">
      <div className="color-picker">
        <input type="color" value={color} onChange={e => setColor(e.target.value)}></input>
      </div>
      <div className="board-container">
          <Board color={color}></Board>
      </div>
      <div className="button">
      <div className="grid grid-cols-4">
      {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <>
                role: {peer.role}
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                  debug
                />
              </>
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
    
        <button 
        disabled={!joinLobby.isCallable}
        className="border border-black p-2 rounded-md m-2"
        onClick={() => joinLobby(address)
          
      }>
        Join Lobby
      </button> 
  
      </div>

   
        {/* Mic */} 
        <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}
        className="border border-black p-2 rounded-md m-2"
        >
          FETCH_AUDIO_STREAM
        </button>
 
        {/* Webcam */} 
        <button disabled={!fetchVideoStream.isCallable} 
         className="border border-black p-2 rounded-md m-2"
        onClick={fetchVideoStream}>
          FETCH_VIDEO_STREAM
        </button>
 
        <button disabled={!joinRoom.isCallable}
         className="border border-black p-2 rounded-md m-2"
        onClick={joinRoom}>
          JOIN_ROOM 
        </button>
 
        <button 
         className="border border-black p-2 rounded-md m-2"
        disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
          LEAVE_ROOM 
        </button>
 
        <button 
         className="border border-black p-2 rounded-md m-2"
        disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
          Produce Cam  
        </button>
 
        <button 
         className="border border-black p-2 rounded-md m-2"
        disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
          Produce Mic  
        </button>
 
        <button 
         className="border border-black p-2 rounded-md m-2"
        disabled={!stopProducingVideo.isCallable} onClick={stopProducingVideo}>
          Stop Producing Cam  
        </button>
 
        <button
         className="border border-black p-2 rounded-md m-2"
        disabled={!stopProducingAudio.isCallable} onClick={stopProducingAudio}>
          Stop Producing Mic  
        </button>
    </div>
  );
}

export default Container;

import Board from "./Board";
import React, { useState, useContext, useEffect} from "react";
import { MyContext } from "../App";
import { useHuddle01 } from '@huddle01/react';
import { useLobby, useAudio, useVideo, useRoom, usePeers } from '@huddle01/react/hooks';
import { useSigner, useAccount } from "wagmi";

function Container() {
    const [color, setColor] = useState("black");
    const { address } = useAccount();
    const {
      roomId,
      setRoomId
     } = useContext(MyContext);
//      const { initialize, isInitialized } = useHuddle01();
//      const { joinLobby } = useLobby();
//      const { 
//       Audio, fetchAudioStream, stopAudioStream, error: micError, 
//        produceAudio, stopProducingAudio 
//      } = useAudio();
  
//      const { 
//        Video, fetchVideoStream, stopVideoStream, error: camError, 
//        produceVideo, stopProducingVideo 
//      } = useVideo(); 
//      const { joinRoom, leaveRoom, camStream, micStream } = useRoom();
//      const { peerIds } = usePeers();
  
// console.log(roomId)   


// useEffect(() => {
//   initialize("lxiHM4YZ52hb1tbgRTNkSDHZfNayJBpO")
//   console.log()
// }, []);


  return (
    <div className="conatiner mt-[7rem]">
      <div className="color-picker">
        <input type="color" value={color} onChange={e => setColor(e.target.value)}></input>
      </div>
      <div className="board-container">
          <Board color={color}></Board>
      </div>
      {/* <div className="button">
      <div className="grid grid-cols-4">
          {peerIds.map(peer => (
              <Video key={peer.peerId} peerId={peer.peerId} debug />
          ))}
 
          {peerIds.map(peer => (
              <Audio key={peer.peerId} peerId={peer.peerId} debug />
          ))}
        </div>
      {
        isInitialized ? 
        <button 
        disabled={joinLobby.isCallable} 
        onClick={() => joinLobby(address)
      }>
        Join Lobby
      </button> : "Loadinggg.."
      }
      </div>

   
        {/* Mic */} 
        {/* <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
          FETCH_AUDIO_STREAM
        </button> */}
 
        {/* Webcam */} 
        {/* <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
          FETCH_VIDEO_STREAM
        </button>
 
        <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
          JOIN_ROOM 
        </button>
 
        <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
          LEAVE_ROOM 
        </button>
 
        <button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
          Produce Cam  
        </button>
 
        <button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
          Produce Mic  
        </button>
 
        <button disabled={!stopProducingVideo.isCallable} onClick={stopProducingVideo}>
          Stop Producing Cam  
        </button>
 
        <button disabled={!stopProducingAudio.isCallable} onClick={stopProducingAudio}>
          Stop Producing Mic  
        </button> */} 
    </div>
  );
}

export default Container;

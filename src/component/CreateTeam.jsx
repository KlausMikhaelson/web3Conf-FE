import React, {
  useState,
  useContext,
  KeyboardEventHandler,
  useEffect,
} from "react";
import axios from "axios";
import { MyContext } from "../App";
// import { CreateGroup } from "../modules/push";
import { useSigner, useAccount } from "wagmi";
// import * as PolybaseModule from "../modules/polybase";
import { Link, useNavigate } from "react-router-dom";

import { GiCancel } from "react-icons/gi";

const Createteam = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [tag, setTags] = useState([]);
  const [adminTags, setAdminTags] = useState([]);

  const navigate = useNavigate();
  const { roomId, setRoomId, huddleId, setHuddleId } = useContext(MyContext);

  const onJoin = (e) => {
    e.preventDefault();
    navigate(`/group/board/${huddleId}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setRoomId(address);
    await axios
      .post(
        `https://api.huddle01.com/api/v1/create-iframe-room`,
        {
          title: roomId,
          roomLocked: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "l2k-KwZIL3Z8YbnKCjqJEsTsV1Qq75yE",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.roomId);
        setRoomId(res.data.data.roomId);
        setHuddleId(res.data.data.roomId);
        navigate(`/group/board/${res.data.data.roomId}`);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   createRoom();
  // }, [roomId]);

  return (
    <div className="my-8 h-screen mt-[8rem]">
      <form className="border mt-2 mx-auto p-2 max-w-[700px] rounded-xl shadow-xl ">
        <h1 className="text-[2.2rem]">Create a Room</h1>
        <div className="max-w-[500px] flex flex-col mt-10 m-auto">
          <div className="flex flex-wrap gap-5 flex-row items-center my-4">
            <label for="team-name">Team Name</label>
            <input
              value={address}
              onSubmit={(e) => setRoomId(address)}
              type="text"
              id="footer-field"
              name="team-name"
              class="w-[60%] mx-4 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="bg-blue-500 mx-center mt-2 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Room
        </button>
        <h1 className="text-[2.2rem]">or</h1>
        <h1 className="text-[2.2rem]">Join a Room</h1>
        <div className="max-w-[500px] flex flex-col mt-10 m-auto">
          <div className="flex flex-wrap gap-5 flex-row items-center my-4">
            <label for="team-name">Team Name</label>
            <input
              value={huddleId}
              onChange={(e) => setHuddleId(e.target.value)}
              type="text"
              id="footer-field"
              name="team-name"
              class="w-[60%] mx-4 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={onJoin}
          className="bg-blue-500 mx-center mt-2 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Createteam;

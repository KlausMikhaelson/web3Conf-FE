import React, { useState, useContext, useEffect } from "react";

import axios from "axios";
import { HuddleIframe } from "@huddle01/iframe";
import { MyContext } from "../App";

const Huddle = (
  {
    // from global context
    // admin = "0xfFA1aF9E558B68bBC09ad74058331c100C135280",
    // membersArray = [
    //   "0x69e666767Ba3a661369e1e2F572EdE7ADC926029",
    //   "0xD8634C39BBFd4033c0d3289C4515275102423681",
    //   "0x74415Bc4C4Bf4Baecc2DD372426F0a1D016Fa924"
    // ],
  }
) => {
//   const { OrganizationDetails } = useContext(MyContext);
  const [huddleLink, setHuddleLink] = useState("");
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [joinMeetCode, setJoinMeetCode] = useState("");

 

 

  const createRoom = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `https://api.huddle01.com/api/v1/create-iframe-room`,
        {
          title: title,
          roomLocked: isPublic,
          hostWallets: allMembers,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "DGRbrP7An82RAb3BdizfzxsvVNrDkrV2",
          },
        }
      )
      .then((res) => {
        setHuddleLink(res.data.data.roomId);
        console.log(isPublic);
        console.log(title);
      })
      .catch((err) => console.log(err));
  };

  const handleCopy = () => {
    const textField = document.createElement("textarea");
    textField.innerText = huddleLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const handleJoinMeet = (e) => {
    e.preventDefault();
    if(joinMeetCode.split("/")[3]) {
      const meetCode = joinMeetCode.split("/")[3];
      console.log(meetCode);
      setHuddleLink(meetCode);
    } else {
      setHuddleLink(joinMeetCode);
    }
  };

  return (
    <div className="">
      <div className="flex h-[100vh] flex-col items-center">
        <div className="w-[100%]">
          {huddleLink && (
            <HuddleIframe
              roomUrl={`https://iframe.huddle01.com/${huddleLink}`}
              className="w-full h-[100vh] aspect-video"
            />
          )}
        </div>
        {!huddleLink && (
          <div>
            <form className="flex gap-y-4 flex-col items-center h-[80vh] justify-center">
              <div className="flex gap-x-3">
                <input
                  required
                  class=" bg-gray-100 shadow-md bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                />
                <div className="flex items-center justify-center">
                  <select
                    className="px-4 outline-none py-2 text-[1em] cursor-pointer shadow-md rounded-lg"
                    onChange={(e) =>
                      e.target.value === "public"
                        ? setIsPublic(false)
                        : setIsPublic(true)
                    }
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              <button
                className="bg-gray-900 hover:bg-gray-800 hover:shadow-slate-800 rounded-lg shadow-sm py-2 px-3 text-white"
                onClick={createRoom}
              >
                Create Meet
              </button>
              <div>
                <h1 className="text-[1.2em] mb-4">or</h1>
                <div className="flex gap-x-3">
                  <input
                    required
                    class=" bg-gray-100 shadow-md bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    type="text"
                    value={joinMeetCode}
                    onChange={(e) => setJoinMeetCode(e.target.value)}
                    placeholder="enter meet link"
                  />
                  <button
                    className="bg-gray-900 hover:bg-gray-800 hover:shadow-slate-800 rounded-lg shadow-sm py-2 px-3 text-white"
                    onClick={handleJoinMeet}
                  >
                    Join Meet
                  </button>
                </div>
              </div>
              {huddleLink && (
                <p onClick={handleCopy}>Meet Link: {huddleLink}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Huddle;
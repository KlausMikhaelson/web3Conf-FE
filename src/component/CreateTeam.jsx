import React, { useState, useContext, KeyboardEventHandler } from "react";
import { MyContext } from "../App";
// import { CreateGroup } from "../modules/push";
import { useSigner, useAccount } from "wagmi";
// import * as PolybaseModule from "../modules/polybase";
import { useNavigate } from "react-router-dom";

import { GiCancel } from "react-icons/gi";

const Createteam = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [tag, setTags] = useState([]);
  const [adminTags, setAdminTags] = useState([]);

  const navigate = useNavigate();
  const {
    members,
    setMembers,
    name,
    setName,
    groupmembers,
    setGroupMembers,
    setGroupImg,
    description,
    setDescription,
    GroupImg,
    admin,
    setAdmin,
    cta,
    setCta,
  } = useContext(MyContext);

  const addTags = (event) => {
    if (!event) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setTags([...tag, event.target.value]);
        setGroupMembers([...tag, event.target.value]);
        event.preventDefault();
        event.target.value = "";
    }
  };

  const addAdminTags = async (event) => {
    if (!event) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setAdminTags([...adminTags, event.target.value]);
        setAdmin([...adminTags, event.target.value]);
        event.preventDefault();
        event.target.value = "";
    }
  };

  console.log(tag);
  console.log("member", groupmembers);

  const removeTag = (indexToremove) => {
    setTags(tag.filter((_, index) => index !== indexToremove));
    setGroupMembers(tag.filter((_, index) => index !== indexToremove));
  };

  const removeAdminTag = (indexToremove) => {
    setAdminTags(adminTags.filter((_, index) => index !== indexToremove));
    setAdmin(adminTags.filter((_, index) => index !== indexToremove));
  };

  // const handleMembersChange = (event) => {
  //   const input = event.target.value;
  //   const addresses = input.split(",").map((address) => address.trim());
  //   setGroupMembers(addresses);
  //   console.log(groupmembers);
  // };

  // const CreateOrg = async () => {
  //   await PolybaseModule.createOrgRecord({ name: name, address: address });
  // };
const onSubmit = () => {
    console.log("submitted")
}
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log(signer);
//     const pushGroup = await CreateGroup({
//       name,
//       description,
//       GroupImg,
//       admin,
//       cta,
//       groupmembers,
//       signer: signer,
//       address,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

    // if (pushGroup) {
    //   const polybase = await PolybaseModule.createOrgRecord({
    //     name: name,
    //     address: address,
    //     memberArray: groupmembers,
    //   });
    //   console.log(polybase);
    // } else {
    //   console.log("error");
    // }

    const payload = {
      name,
      description,
      GroupImg,
      admin,
      cta,
      members,
    };
    // navigate("/dashboard");
    console.log(payload);
  

  return (
    <div className="my-8 h-screen mt-[8rem]">
      <form
        onSubmit={onSubmit}
        className="border mt-2 mx-auto p-2 max-w-[700px] rounded-xl shadow-xl "
      >
        <h1 className="text-[2.2rem]">Create a team</h1>
        <div className="max-w-[500px] flex flex-col mt-10 m-auto">
          <div className="flex flex-wrap gap-5 flex-row items-center my-4">
            <label for="team-name">Team Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="footer-field"
              name="team-name"
              class="w-[60%] mx-4 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-row gap-5  my-4 items-center">
            <label for="Description">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="footer-field"
              name="Description"
              class="w-[60%] mx-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-row gap-5  my-4 items-center">
            <label className="mr-6" for="GroupImg">
              Group Img
            </label>
            <input
              value={GroupImg}
              onChange={(e) => setGroupImg(e.target.value)}
              type="text"
              id="footer-field"
              name="GroupImg"
              class="w-[60%] bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="flex flex-row gap-5 my-4 items-center">
            <label className="mr-8" for="Members">
              Admins
            </label>

            <div className="border w-[60%] ml-3 flex gap-1 justify-center items-center flex-wrap  h-auto bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <ul className="flex flex-wrap justify-center gap-2 items-center py-1">
                {adminTags.map((tag, index) => (
                  <li
                    className="w-auto h-[24px] flex items-center justify-center pl-2 pr-2 text-[12px] rounded-md mr-8px mb-8px bg-[#0052cc] text-[#fff]"
                    key={index}
                  >
                    <span className=" text-center block">
                      {tag.slice(0, 6)}...{tag.slice(37)}
                    </span>
                    <GiCancel
                      className="block w-[12px] h-[12px] leading-1 text-center text-[10px] ml-[8px] text-[#0052cc] rounded-md bg-[#fff] pointer"
                      onClick={() => removeAdminTag(index)}
                    />
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="add address and press enter"
                onKeyDown={addAdminTags}
                className="border-none outline-none  bg-gray-100 bg-opacity-50 flex items-center w-full h-full bg-opacity-50 p-0 mt-0 mb-1"
              />
            </div>
          </div>
          <div className="flex flex-row gap-5 my-4 items-center">
            <label className="mr-8" for="Members">
              Members
            </label>

            <div className="border w-[60%] flex gap-1 justify-center items-center flex-wrap  h-auto bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-0 px-3 leading-8 transition-colors duration-200 ease-in-out">
              <ul className="flex flex-wrap justify-center gap-2 items-center py-1">
                {tag.map((tag, index) => (
                  <li
                    className="w-auto h-[24px] flex items-center justify-center pl-2 pr-2 text-[12px] rounded-md mr-8px mb-8px bg-[#0052cc] text-[#fff]"
                    key={index}
                  >
                    <span className=" text-center block">
                      {tag.slice(0, 6)}...{tag.slice(37)}
                    </span>
                    <GiCancel
                      className="block w-[12px] h-[12px] leading-1 text-center text-[10px] ml-[8px] text-[#0052cc] rounded-md bg-[#fff] pointer"
                      onClick={() => removeTag(index)}
                    />
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="add address and press enter"
                onKeyDown={addTags}
                className="border-none outline-none  bg-gray-100 bg-opacity-50 flex items-center w-full h-full bg-opacity-50 p-0 mt-0 mb-1"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 mx-center mt-2 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Createteam;
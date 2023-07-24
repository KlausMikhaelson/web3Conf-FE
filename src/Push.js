import React from "react";
import * as PUSHAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";

export const CreateGroup = async ({}) => {
  try {
    const res = PUSHAPI.chat.createGroup({
      groupName: groupName,
      groupDescription: groupDescription,
      groupImage: groupImage,
      members: groupMembers,
      admins: [],
      isPublic: true,
      signer: signer,
      account: account,
      env: ENV.STAGING,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const CreateChatUser = async () => {
  try {
    const response = await PUSHAPI.user.create({
      signer: signer,
      env: ENV.STAGING,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const GetUserInfo = async ({}) => {
  try {
    const response = await PUSHAPI.user.get({
      account: account,
      env: ENV.STAGING,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const GetGroupChat = async ({}) => {
  try {
    const user = await PUSHAPI.user.get({
      account: account,
      env: ENV.STAGING,
    });
    const pgpDecryptPvtKey = await PUSHAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: signer,
    });
    // have to save it in a state maybe to use again in future
    const response = await PUSHAPI.chat.chats({
      account: account,
      pgpPrivateKey: pgpDecryptPvtKey,
      env: ENV.STAGING,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

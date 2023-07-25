import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "@wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AppRoutes from './AppRoutes'
import React, { createContext, useState } from "react";

const MyContext = createContext();

function App() {
  const { chains, provider } = configureChains(
    [goerli],
    [
      alchemyProvider({ apiKey: "RDJv2__y7TADjgFcX76tfvuw3RJVIjqD" }),
      publicProvider(),
    ]
  );

  const [members, setMembers] = useState([]);
  const [groupmembers, setGroupMembers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [GroupImg, setGroupImg] = useState("");
  const [admin, setAdmin] = useState("");
  const [cta, setCta] = useState("");
  const [GroupList, setGroupList] = useState([]);
  const [groupChatId, setGroupChatId] = useState("");
  const [requestGroupChatId, setRequestGroupChatId] = useState("");
  const [groupChatMessageBody, setGroupChatMessageBody] = useState([]);
  const [ChatThreadHash, setChatThreadHash] = useState("");
  const [RequestChatList, setRequestChatList] = useState([]);
  const [HeaderGroupName, setHeaderGroupName] = useState("");
  const [MembersInGroup, setMembersInGroup] = useState(0);
  const [OrganizationsList, setOrganizationsList] = useState([]);
  const [OrganizationDetails, setOrganizationDetails] = useState([]);
  const [LinksResponse, setLinksResponse] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userDecryptedKey, setUserDecryptedKey] = useState([]);

  const { connectors } = getDefaultWallets({
    appName: "Workspace3",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="App">
      <MyContext.Provider
        value={{
          members,
          setMembers,
          groupmembers,
          setGroupImg,
          setGroupMembers,
          name,
          setName,
          description,
          setDescription,
          GroupImg,
          admin,
          setAdmin,
          cta,
          setCta,
          GroupList,
          setGroupList,
          groupChatId,
          setGroupChatId,
          groupChatMessageBody,
          setGroupChatMessageBody,
          ChatThreadHash,
          setChatThreadHash,
          RequestChatList,
          setRequestChatList,
          requestGroupChatId,
          setRequestGroupChatId,
          HeaderGroupName,
          setHeaderGroupName,
          MembersInGroup,
          setMembersInGroup,
          OrganizationsList,
          setOrganizationsList,
          OrganizationDetails,
          setOrganizationDetails,
          LinksResponse,
          setLinksResponse,
          currentUser,
          setCurrentUser,
          userDecryptedKey,
          setUserDecryptedKey,
        }}
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={midnightTheme({
              ...midnightTheme.accentColors.pink,
              borderRadius: "small",
              fontStack: "system",
            })}
          >
            <AppRoutes />
          </RainbowKitProvider>
        </WagmiConfig>
      </MyContext.Provider>
    </div>
  );
}

export { MyContext };

export default App;
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


  const [roomId, setRoomId] = useState("");
  

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
         roomId,
         setRoomId
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
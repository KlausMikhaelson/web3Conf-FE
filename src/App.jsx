import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "@wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AppRoutes from "./AppRoutes";
import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
const MyContext = createContext();

function App() {
  const { chains, provider } = configureChains(
    [mainnet],
    [
      alchemyProvider({ apiKey: "RDJv2__y7TADjgFcX76tfvuw3RJVIjqD" }),
      publicProvider(),
    ]
  );

  const [roomId, setRoomId] = useState("");
  const [huddleId, setHuddleId] = useState("");

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
          setRoomId,
          huddleId,
          setHuddleId,
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
                <QueryClientProvider client={queryClient}>
            <AppRoutes />
            </QueryClientProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </MyContext.Provider>
    </div>
  );
}

export { MyContext };

export default App;

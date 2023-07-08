import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AppRoutes from "./AppRoutes";

function App() {
  const { chains, provider } = configureChains(
    [goerli],
    [
      alchemyProvider({ apiKey: "RDJv2__y7TADjgFcX76tfvuw3RJVIjqD" }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Omegle",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

import React from "react";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import Moralis from "moralis/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationProvider } from "@ui-kitten/components";
import { enableViaWalletConnect } from "./Moralis/enableViaWalletConnect";
import * as eva from "@eva-design/eva";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
import { Platform } from "react-native";
import Qrcode from "./Qrcode";
import { expo } from "../app.json";

interface ProvidersProps {
  readonly children: JSX.Element;
}

const { scheme } = expo;

/**
 * Initialization of Moralis
 */
const appId = "FQFdx9WdC5Oim6wJICuNSkd7zVWPQajw9HzpFOTE";
const serverUrl = "https://cy56k1qgaoe5.usemoralis.com:2053/server";
const environment = "native";
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}
      >
        <MoralisDappProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            {children}
          </ApplicationProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};

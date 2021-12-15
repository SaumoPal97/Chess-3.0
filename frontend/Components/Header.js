import React from "react";
import { View, Text, Image } from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3Transfer,
} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

import Address from "./Address";

const Amount = () => {
  const {
    account: { getNativeBalance },
  } = useMoralisWeb3Api();
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getNativeBalance, {
    chain: "mumbai",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: "gainsboro",
      }}
    >
      <Image
        source={require("../images/bg.png")}
        style={{
          width: 20,
          height: 20,
          marginRight: 5,
        }}
      />
      <Text>
        {data ? Math.trunc(parseFloat(data.balance / ("1e" + "18"))) : null}
      </Text>
    </View>
  );
};

export default function Header() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        margin: 20,
      }}
    >
      <Amount />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          borderColor: "gainsboro",
        }}
      >
        <Address />
      </View>
    </View>
  );
}

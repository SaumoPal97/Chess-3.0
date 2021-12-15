import StreamComponent from "./StreamComponent";
import Header from "./Header";
import Address from "./Address";
import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BlockieImage from "../images/Blockie.png";
import {
  faHome,
  faUser,
  faGamepad,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3Transfer,
} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

const Amount = () => {
  const {
    account: { getNativeBalance },
  } = useMoralisWeb3Api();
  const { data, isFetching, error } = useMoralisWeb3ApiCall(getNativeBalance, {
    chain: "rinkeby",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
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

export default function Profile({ navigation }) {
  const { walletAddress, chainId } = useMoralisDapp();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Header />
        <Text
          style={{
            fontSize: 25,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <Image source={BlockieImage} />
          <View style={{ flex: 1, width: 50 }}>
            <Text
              ellipsizeMode={"middle"}
              numberOfLines={1}
              style={{ padding: 10, fontWeight: "bold" }}
            >
              Address: {walletAddress}
            </Text>
            <Amount />
          </View>
        </View>
        <Text
          style={{
            fontSize: 25,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}
        >
          Your NFTs
        </Text>
        <ScrollView
          horizontal={true}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderColor: "gray",
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../images/bg.png")}
              style={{
                width: 50,
                height: 50,
                marginRight: 5,
              }}
            />
            <Text style={{ fontWeight: "500", marginTop: 5 }}>First Game</Text>
            <Text
              style={{
                fontWeight: "500",
                marginTop: 5,
                backgroundColor: "dodgerblue",
                padding: 5,
                color: "white",
                fontSize: 10,
                borderRadius: 10,
              }}
            >
              Opensea
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderColor: "gray",
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../images/bg.png")}
              style={{
                width: 50,
                height: 50,
                marginRight: 5,
              }}
            />
            <Text style={{ fontWeight: "500", marginTop: 5 }}>First Win</Text>
            <Text
              style={{
                fontWeight: "500",
                marginTop: 5,
                backgroundColor: "dodgerblue",
                padding: 5,
                color: "white",
                fontSize: 10,
                borderRadius: 10,
              }}
            >
              Opensea
            </Text>
          </View>
        </ScrollView>
        <Text
          style={{
            fontSize: 25,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}
        >
          Your matches
        </Text>
        <ScrollView
          horizontal={true}
          style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderColor: "gray",
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "500", marginTop: 5 }}>Match #1</Text>
            <Address />
            <Text style={{ fontWeight: "500", marginTop: 5 }}>Status: Won</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderColor: "gray",
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "500", marginTop: 5 }}>Match #2</Text>
            <Address />
            <Text style={{ fontWeight: "500", marginTop: 5 }}>
              Status: Lost
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderColor: "gray",
              borderRadius: 20,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "500", marginTop: 5 }}>Match #3</Text>
            <Address />
            <Text style={{ fontWeight: "500", marginTop: 5 }}>Status: Won</Text>
          </View>
        </ScrollView>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 5,
          backgroundColor: "papayawhip",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesomeIcon icon={faHome} size={20} />
          <Text
            style={{ marginTop: 3 }}
            onPress={() => navigation.replace("Home")}
          >
            Home
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesomeIcon icon={faGamepad} size={20} />
          <Text
            style={{ marginTop: 3 }}
            onPress={() => navigation.replace("Play")}
          >
            Games
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesomeIcon icon={faCamera} size={20} />
          <Text
            style={{ marginTop: 3 }}
            onPress={() => navigation.replace("Stream")}
          >
            Streams
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FontAwesomeIcon icon={faUser} color={"dodgerblue"} size={20} />
          <Text style={{ marginTop: 3, color: "dodgerblue" }}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

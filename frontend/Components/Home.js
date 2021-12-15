import React, { useState, useEffect } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  View,
} from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3Transfer,
  useWeb3ExecuteFunction,
} from "react-moralis";
import Moralis from "moralis/react-native.js";
import { useWalletConnect } from "../WalletConnect";
import { Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUser,
  faGamepad,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import StreamComponent from "./StreamComponent";

import { contractAbi, contractAddress } from "../contract";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(36, 35, 32)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function Home({ navigation }) {
  const connector = useWalletConnect();
  // const {
  //   authenticate,
  //   authError,
  //   isAuthenticating,
  //   isAuthenticated,
  //   logout,
  // } = useMoralis();
  // const { Moralis } = useMoralis();
  const {
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    user,
  } = useMoralis();

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisible = () => {
    setModalVisible((prevState) => !prevState);
  };
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: contractAbi,
    contractAddress,
    functionName: "register",
  });

  const [amount, setAmount] = useState(0);

  const onChangeAmount = (num) => {
    setAmount(num);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{`Play Online`}</Text>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeAmount}
                  value={amount}
                  placeholder="Enter amount to bet in MATIC"
                  keyboardType="numeric"
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => fetch({ provider: "walletconnect" })}
                onPress={() =>
                  connector
                    .sendTransaction({
                      from: user.get("ethAddress"),
                      amount: Moralis.Units.Token(amount, "18"),
                      to: "0x0000000000000000000000000000000000000000",
                      type: "native",
                    })
                    .then((res) => {
                      console.log(res);
                      navigation.replace("Chess");
                    })
                    .catch((res) => {
                      console.log(res);
                      navigation.replace("Chess");
                    })
                }
              >
                <Text style={styles.textStyle}>Create Game</Text>
              </Pressable>
              <Text style={{ fontSize: 20, fontWeight: "400", marginTop: 20 }}>
                Join a Game
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ marginRight: 20 }}>1</Text>
                  <Text style={{ marginRight: 20 }}>0x72...6dec</Text>
                  <Text
                    style={{
                      padding: 5,
                      backgroundColor: "purple",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    2 MATIC
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ marginRight: 20 }}>2</Text>
                  <Text style={{ marginRight: 20 }}>0x43...1rwc</Text>
                  <Text
                    style={{
                      padding: 5,
                      backgroundColor: "purple",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    1 MATIC
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Header />
        {/* <UserExample /> */}
        {/* <Web3ApiExample /> */}
        <View
          style={{
            flex: 1,
            marginLeft: 30,
            marginRight: 30,
            alignItems: "center",
            backgroundColor: "teal",
            paddingTop: 50,
            paddingBottom: 50,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
            Welcome to
          </Text>
          <Text style={{ fontSize: 30, color: "white", fontWeight: "800" }}>
            Chess 3.0
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              marginLeft: 30,
              marginRight: 5,
              alignItems: "center",
              backgroundColor: "palegoldenrod",
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              onPress={toggleModalVisible}
            >
              Play Online
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 30,
              alignItems: "center",
              backgroundColor: "palegoldenrod",
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Play Computer
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              marginLeft: 30,
              marginRight: 5,
              alignItems: "center",
              backgroundColor: "palegoldenrod",
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Try Puzzles
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 30,
              alignItems: "center",
              backgroundColor: "palegoldenrod",
              paddingTop: 20,
              paddingBottom: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Take Lessons
            </Text>
          </View>
        </View>
        <StreamComponent />
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
          <FontAwesomeIcon icon={faHome} color={"dodgerblue"} size={20} />
          <Text style={{ marginTop: 3, color: "dodgerblue" }}>Home</Text>
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
          <FontAwesomeIcon icon={faUser} size={20} />
          <Text
            style={{ marginTop: 3 }}
            onPress={() => navigation.replace("Profile")}
          >
            Profile
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Home;

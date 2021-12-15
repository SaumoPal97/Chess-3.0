import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import RecordScreen from "react-native-record-screen";
import { useMoralis, useMoralisFile } from "react-moralis";
import Moralis from "moralis/react-native.js";

import Board from "./Board";
import Address from "../Components/Address";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "white",
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
    marginBottom: 15,
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
  },
});

const Chess = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [winner, setWinner] = useState(null);
  const toggleModalVisible = (winner) => {
    setModalVisible((prevState) => !prevState);
    setWinner((prevState) => winner || null);
  };
  const [recordUrl, setRecordUrl] = useState("");

  const startRecording = () => {
    // recording start
    RecordScreen.startRecording().catch((error) => console.error(error));
  };

  const stopRecording = async () => {
    // recording stop
    const res = await RecordScreen.stopRecording().catch((error) =>
      console.warn(error)
    );
    if (res) {
      const url = res.result.outputURL;
      console.log(url);
      setRecordUrl(url);
    }
  };

  const { saveFile, moralisFile } = useMoralisFile();

  const saveFileIPFS = async () => {
    const response = await fetch(recordUrl);
    const f = await response.blob();
    await saveFile(f.name, file, { saveIPFS: true });
  };

  useEffect(() => {
    startRecording();
  }, []);

  useEffect(() => {
    if (winner) {
      stopRecording();
    }
  }, [winner]);

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModalVisible();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {winner ? `${winner} is the winner` : "It's a draw"}
            </Text>
            <Text style={styles.modalText}>
              {winner ? "You have won 0.1 MATIC" : ""}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.replace("Home")}
            >
              <Text style={styles.textStyle}>Go to Home</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={saveFileIPFS}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <Text
          style={{
            alignSelf: "center",
            margin: 30,
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Chess Match #24
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          borderColor: "gainsboro",
          margin: 10,
          flexShrink: 1,
          width: 170,
        }}
      >
        <Address dummyAddress={"0x1D9D84EFF8d1e3Fe9Af2Ce209FE0f92fFA5E1A73"} />
      </View>
      <Board toggleModalVisible={toggleModalVisible} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          borderColor: "gainsboro",
          margin: 10,
          flexShrink: 1,
          width: 170,
          alignSelf: "flex-end",
        }}
      >
        <Address />
      </View>
      <View>
        <Text
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            margin: 10,
            justifyContent: "center",
            alignSelf: "center",
            fontSize: 30,
          }}
        >
          Moves
        </Text>
      </View>
    </ScrollView>
  );
};

export default Chess;

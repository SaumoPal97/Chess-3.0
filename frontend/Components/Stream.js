import StreamComponent from "./StreamComponent";
import Header from "./Header";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUser,
  faGamepad,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

export default function Stream({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Header />
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
          <FontAwesomeIcon icon={faCamera} color={"dodgerblue"} size={20} />
          <Text style={{ marginTop: 3, color: "dodgerblue" }}>Streams</Text>
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

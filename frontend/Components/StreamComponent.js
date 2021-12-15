import StreamUnit from "./StreamUnit";
import React from "react";
import { Text, View } from "react-native";

export default function StreamComponent() {
  return (
    <View
      style={{
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
        Streams
      </Text>
      <StreamUnit />
      <StreamUnit />
      <StreamUnit />
    </View>
  );
}

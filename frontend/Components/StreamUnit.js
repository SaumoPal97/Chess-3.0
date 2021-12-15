import Address from "./Address";
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
  View,
} from "react-native";

export default function StreamUnit() {
  return (
    <View style={{ padding: 10, backgroundColor: "lightblue", marginTop: 10 }}>
      <Image
        source={require("../images/board.webp")}
        style={{
          width: "100%",
          height: 300,
          marginRight: 5,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 5,
        }}
      >
        <Address />
        <Address />
      </View>
    </View>
  );
}

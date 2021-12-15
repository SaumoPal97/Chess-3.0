import Header from "./Header";
import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUser,
  faGamepad,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Row, Rows } from "react-native-table-component";
const tableHead = ["Rank", "Address", "Win %"];
const tableData = [
  ["1", "0x12..3esd", "42.3%"],
  ["2", "0x36..1dwe", "39.8%"],
  ["3", "0x62..4efc", "25.7%"],
];

const tableHead1 = ["No.", "Competitor1", "Competitor2", "Stream"];
const tableData1 = [
  ["1", "0x12..3esd", "0x36..1dwe", ""],
  ["2", "0x45..7edc", , "0x62..4efc", "www.yout....e3f/"],
];
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, backgroundColor: "lightblue" },
  text: { margin: 6 },
});
export default function Play({ navigation }) {
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
          Games
        </Text>
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
          Leaderboard
        </Text>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 0 }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
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
          Current Games
        </Text>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 0 }}>
            <Row
              data={tableHead1}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={tableData1} textStyle={styles.text} />
          </Table>
        </View>
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
          <FontAwesomeIcon icon={faGamepad} color={"dodgerblue"} size={20} />
          <Text style={{ marginTop: 3, color: "dodgerblue" }}>Games</Text>
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

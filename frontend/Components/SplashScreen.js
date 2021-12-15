import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";

// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace("Auth");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/bg.png")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});

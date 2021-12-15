import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "../WalletConnect";

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", flex: 1 },
  topCenter: { alignItems: "center" },

  white: { backgroundColor: "white" },
  margin: { marginBottom: 20 },
  marginLarge: { marginBottom: 35 },
  weightHeavey: { fontWeight: "700", fontSize: 20 },
});

export function App({ navigation }) {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("Home");
    }
  }, [isAuthenticated]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.white]}>
      <View style={[styles.white, styles.center]}>
        <View style={styles.marginLarge}>
          {authError && (
            <>
              <Text>Authentication error:</Text>
              <Text style={styles.margin}>{authError.message}</Text>
            </>
          )}
          {/* {isAuthenticating && (
            <Text style={styles.margin}>Authenticating...</Text>
          )} */}
          {!isAuthenticated && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Welcome to Chess 3.0
              </Text>
              <Image
                source={require("../images/bg.png")}
                style={{
                  width: 100,
                  height: 100,
                  // resizeMode: "contain",
                  marginBottom: 50,
                }}
              />
              <TouchableOpacity
                buttonStyle={{ width: 200, backgroundColor: "green" }}
                containerStyle={{ margin: 5 }}
                disabledStyle={{
                  borderWidth: 2,
                  borderColor: "#00F",
                }}
                onPress={() => authenticate({ connector })}
                loadingProps={{ animating: true }}
                title={
                  isAuthenticating
                    ? "Authenticating..."
                    : "Authenticate With Crypto Wallet"
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 10,
                    borderColor: "gainsboro",
                  }}
                >
                  <Image
                    source={require("../images/metamask.webp")}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 20,
                    }}
                  />
                  <Text>Authenticate With Crypto Wallet</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

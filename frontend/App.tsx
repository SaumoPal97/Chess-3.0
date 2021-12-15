import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import SplashScreen from "./Components/SplashScreen";
// import CryptoAuth from "./Components/CryptoAuth";
// import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
// import Assets from "./Components/Assets/Assets";
// import Chat from "./Components/Chat/Chat";
// import Transfer from "./Components/Transfer/Transfer";
import Home from "./Components/Home";
import Play from "./Components/Play";
import Stream from "./Components/Stream";
import Profile from "./Components/Profile";
import Chess from "./Chess/Chess";
import SplashScreen from "./Components/SplashScreen";

// import QuickStart from "./Components/QuickStart";
import { App as Default } from "./Components/App";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

import Moralis from "moralis/types";

// const Activecolor =
function Auth(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Default">
      <Stack.Screen
        name="Default"
        options={{ headerShown: false }}
        component={Default}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chess">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stream"
          component={Stream}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Play"
          component={Play}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chess"
          component={Chess}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

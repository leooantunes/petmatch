import auth from "@react-native-firebase/auth";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log("Auth state changed:", user?.email ?? "not logged in");
      setIsLoggedIn(!!user);
      setIsReady(true);
    });

    return unsubscribe;
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/screens/petList/petList.screen" />;
  }

  return <Redirect href="/screens/login/login.screen" />;
}

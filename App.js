import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { auth } from "./src/utils/firebase";
import TodoScreen from "./src/screens/TodoScreen";

export default function App() {
  const [user, setUser] = useState(null);

  // Use the effect hook to listen for changes in authentication
  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    // Cleanup
    return () => unsubscribe;
  });
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!user ? <LoginScreen /> : <TodoScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 90,
  },
});

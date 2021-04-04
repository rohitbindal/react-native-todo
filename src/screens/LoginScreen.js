import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { handleSignIn } from "../utils/firebaseUtils";

const LoginScreen = () => {
  return (
    <View>
      <Button title="Sign in with Email and Password" onPress={handleSignIn} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

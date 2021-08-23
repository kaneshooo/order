import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Footer({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFA500" }]}
        >
          <Text>提供完了</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#f00" }]}
            onPress={() => navigation.popToTop()}
          >
            <Text>販売終了</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#393" }]}
          onPress={() => navigation.navigate("Treasurer")}
        >
          <Text>会計</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFF"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    borderRadius: 50,
    height: 50,
    width: 100,
    fontSize: 20,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Footer;

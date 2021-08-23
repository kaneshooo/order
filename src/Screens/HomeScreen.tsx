import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>HOME</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#99ff66" }]}
        onPress={() => navigation.navigate("Order")}
      >
        <Text style={styles.buttonSize}>start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Setting")}
      >
        <Text style={styles.buttonSize}>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#0099ff" }]}
        onPress={() => navigation.navigate("Log")}
      >
        <Text style={styles.buttonSize}>Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 2,
    fontSize: 50,
    marginBottom: 40,
    borderRadius: 20,
    padding: 30,
    textAlign: "center"
  },
  button: {
    fontSize: 30,
    width: 150,
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  buttonSize: {
    fontSize: 30
  }
});

export default HomeScreen;

import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>HOME</Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("Order")}
      >
        <Text style={styles.buttonSize}>start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logButton}
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
    borderRadius: "solid",
    fontSize: 40,
    marginTop: 50,
    width: 300,
    height: 300,
    borderRadius: 20,
    padding: 15,
    textAlign: "center"
  },
  startButton: {
    fontSize: 30,
    width: 150,
    height: 70,
    backgroundColor: "#99ff66",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSize: {
    fontSize: 30
  },
  logButton: {
    width: 150,
    height: 70,
    backgroundColor: "#0099ff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  }
});

export default HomeScreen;

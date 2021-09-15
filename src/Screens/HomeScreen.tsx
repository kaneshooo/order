import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "firebase/storage";
import "firebase/firestore";

function HomeScreen({ navigation }) {
  let routes;
  const dbget = async () => {
    let db = firebase.firestore();
    const categoryRef = db
      .collection("users")
      .doc("menu")
      .collection("カテゴリー名");

    const result = await categoryRef.get().then(querySnapshot => {
      let str = [];
      querySnapshot.forEach(doc => {
        str.push(
          Object.assign({
            key: doc.id,
            title: doc.data().name
          })
        );
      });

      return str;
    });
    routes = result;
    console.log(routes);
  };
  useEffect(() => {
    dbget();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#053050" }]}
        onPress={() => navigation.navigate("Order")}
      >
        <Text style={[styles.buttonSize, { color: "#FFF" }]}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFF" }]}
        onPress={() => navigation.navigate("Log")}
      >
        <Text style={[styles.buttonSize, { color: "#053050" }]}>Log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Setting", { routes })}
      >
        <Text style={styles.buttonSize}>Setting</Text>
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
    color: "#053050",
    fontWeight: "700",
    fontSize: 70,
    marginBottom: 80,
    padding: 30
  },
  button: {
    fontSize: 30,
    width: 300,
    height: 55,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  buttonSize: {
    fontSize: 30,
    fontWeight: "500"
  }
});

export default HomeScreen;

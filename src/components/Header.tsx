import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Header({ navigation, name }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={30} color="#73899d" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    height: 40
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  headerText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#053050"
  }
});

export default Header;

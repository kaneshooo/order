import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Header(props) {
  let { user, value, navigation, route, name, checker } = props;

  const ReturnButton = () => {
    if (value == "CostemerList" || value == "Setting") {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.navigate(value, { user, value, routes, checker })
          }
        >
          <Icon name="chevron-back" size={30} color="#73899d" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color="#73899d" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.header}>
      <ReturnButton />
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
    height: 60,
    paddingTop: 25,
    backgroundColor: "#053050"
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 25
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  }
});

export default Header;

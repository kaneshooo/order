import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";

function Footer({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Icon2 name="handshake-o" size={20} color="#73899d" />
          <Text style={styles.footerText}>提供完了</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Icon name="home" size={20} color="#73899d" />
          <Text style={styles.footerText}>販売終了</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Treasurer")}
        >
          <Icon name="pay-circle-o1" size={20} color="#73899d" />
          <Text style={styles.footerText}>会計</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fdfdfd",
    height: 45
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 5
  },
  footerText: {
    fontSize: 15,
    marginTop: 5,
    color: "#73899d"
  }
});

export default Footer;

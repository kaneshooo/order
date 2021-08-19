import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>HOME</Text>
        <Button
          style={styles.startButton}
          title="start"
          onPress={() => this.props.navigation.navigate("Order")}
        />
        <Button
          style={styles.logButton}
          title="Log"
          onPress={() => this.props.navigation.navigate("Log")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex" /* 子要素をflexboxで揃える */,
    flexDirection: "column" /* 子要素をflexboxにより縦方向に揃える */,
    justifyContent: "center" /* 子要素をflexboxにより中央に配置する */,
    alignItems: "center" /* 子要素をflexboxにより中央に配置する */
  },
  title: {
    borderRadius: "solid",
    fontSize: 40,
    marginTop: 50,
    width: 200,
    height: 90,
    borderRadius: 20,
    padding: 15,
    textAlign: "center"
  },
  startButton: {
    marginTop: 180,
    fontSize: 30,
    width: 150,
    height: 70,
    backgroundColor: "#99ff66",
    borderRadius: 20
  },
  logButton: {
    marginTop: 20,
    fontSize: 30,
    width: 150,
    height: 70,
    backgroundColor: "#0099ff",
    borderRadius: 20
  }
});

export default HomeScreen;

import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function Header(props) {
  console.log(props)
  let user=props.user
  let value=props.value
  let navigation=props.navigation
  let routes=props.route
  let name=props.name
  let checker=props.checker

  if(value=='CostemerList'||value=='Setting'){
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.navigate(value,{user,value,routes,checker})}
        >
          <Icon name="chevron-back" size={30} color="#73899d" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
      </View>
    );
  }else{
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
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    marginTop:50,
    height: 50,
    backgroundColor:"#053050",
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  }
});

export default Header;

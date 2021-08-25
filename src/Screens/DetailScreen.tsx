import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Image
} from "react-native";
import Header from "../components/Header";

function DetailScreen(props) {
  const item = props.route.params.item;
  console.log(props);
  return (
    <View style={styles.wrapper}>
      <Header navigation={props.navigation} name="アイテム編集" />
      <Image style={styles.img} source={item.img} />
      <TextInput
        style={styles.input}
        defaultValue={item.product_name}
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        defaultValue={item.price.toString()}
        mode="outlined"
      />

      <Button mode="contained" title="保存" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15
  },
  input: {
    fontSize: 30,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  img: {
    width: "50%",
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center"
  }
});

export default DetailScreen;

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";

import ann from "../img/ann.jpg";
import ball from "../img/ball.jpeg";
import koin from "../img/koin.jpeg";
import syateki from "../img/syateki.jpg";
import takoyaki from "../img/takoyaki.jpg";
import watagashi from "../img/watagashi.png";
import yakisoba from "../img/yakisoba.jpg";
import yoyo from "../img/yoyo.jpg";

const itemData = [
  {
    img: ann,
    product_name: "お面",
    price: 300
  },
  {
    img: ball,
    product_name: "ぼーるすくい",
    price: 200
  },
  {
    img: koin,
    product_name: "コイン落とし",
    price: 200
  },
  {
    img: syateki,
    product_name: "射的",
    price: 200
  },
  {
    img: takoyaki,
    product_name: "たこ焼き",
    price: 500
  },
  {
    img: watagashi,
    product_name: "わたがし",
    price: 400
  },
  {
    img: yakisoba,
    product_name: "やきそば",
    price: 500
  },
  {
    img: yoyo,
    product_name: "ヨーヨーすくい",
    price: 200
  }
];

function SettingScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Header navigation={navigation} name="アイテム管理" />

      <View style={styles.distinction}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.distinctionText}>アイテム分類</Text>

        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon name="arrow-forward-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={itemData}
        numColumns={4}
        keyExtractor={item => item.product_name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Detail", { item })}
          >
            <Image style={styles.img} source={item.img} />
            <Text>{item.product_name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>

      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <Icon
          style={styles.add}
          name="add-circle-sharp"
          size={70}
          color="#053050"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15
  },

  distinction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#73899d",
    height: 60
  },
  distinctionText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF"
  },
  add: {
    position: "absolute",
    right: 10,
    bottom: 5
  },

  item: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FFF"
  },
  buttonText: {
    fontSize: 20,
    color: "#73899d"
  },
  img: {
    width: "90%",
    height: 70,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5
  },
  item: {
    width: "25%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 1,
    borderRadius: 10
  }
});

export default SettingScreen;

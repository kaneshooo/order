import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Image
} from "react-native";
import { firebase } from "@firebase/app";
import "firebase/storage";
import "firebase/firestore";

const ImgList = props => {
  const {
    totalAmount,
    setTotalAmount,
    item_list,
    setItemList,
    orderNumber
  } = props;
  var db = firebase.firestore();
  var date = new Date();
  var today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const [data, setdata] = useState();

  const dbget = async () => {
    const docRef = db
      .collection("users")
      .doc("menu")
      .collection("ゲーム");
    const earnings = db
      .collection("users")
      .doc("earning")
      .collection("list")
      .doc(String(today));
    const result = await docRef.get().then(querySnapshot => {
      let bb = [];
      querySnapshot.forEach(doc => {
        bb.push(
          Object.assign({
            id: doc.id,
            // page:pagename,
            url: doc.data().url,
            name: doc.data().name,
            price: doc.data().price
          })
        );
        earnings.set(
          {
            [doc.data().name]: {
              price: doc.data().price,
              num: 0
            }
          },
          { merge: true }
        );
      });
      return bb;
    });
    setdata(result);
  };

  useEffect(() => {
    dbget();
  }, []);

  const checkArray = (product_name, time) => {
    let exist;
    for (var i in item_list) {
      if (item_list[i].name == product_name) {
        item_list[i].num += 1;
        exist = true;
      }
    }
    return exist;
  };
  const setOrderInfo = item => {
    var time =
      date.getMonth() +
      1 +
      "-" +
      date.getDate() +
      "-" +
      date.getHours() +
      "-" +
      date.getMinutes() +
      "-" +
      date.getSeconds() +
      "-" +
      date.getMilliseconds();
    if (!checkArray(item.name, time)) {
      item_list[time] = Object.assign({
        name: item.name,
        num: 1,
        price: item.price,
        time: time,
        check: false
      });
    }
    setTotalAmount(totalAmount + item.price);
  };

  return (
    <View>
      <FlatList
        style={styles.orderMenu}
        data={data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setOrderInfo(item)}
          >
            <Image style={styles.img} source={{ uri: item.url }} />
            <Text>{item.name}</Text>
            <Text>{item.price}円</Text>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: "90%",
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5
  },
  item: {
    width: "48%",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    margin: 2,
    borderRadius: 10
  }
});
export default ImgList;

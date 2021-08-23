import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text
} from "react-native";
import { Button, Divider } from "react-native-paper";
import Footer from "../components/Footer";
import ImgList from "../components/ImgList";

let ItemNum = [];
for (let i = 1; i <= 20; i++) {
  let item = { key: String(i) };
  ItemNum.push(item);
}

function OrderScreen({ navigation }) {
  const [orderNumber, setOrderNumber] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [item_list, setItemList] = useState([]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.orderItemList}>
          <FlatList
            numColumns={2}
            data={item_list}
            renderItem={({ item }) => (
              <Text style={styles.orderItemText}>
                {item.productName} x {item.num}
              </Text>
            )}
          ></FlatList>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.number}>{orderNumber}番</Text>
          <Text style={styles.number}>¥{totalAmount}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.orderList}>
          <View style={styles.menu}>
            <ImgList
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              item_list={item_list}
              setItemList={setItemList}
            />
          </View>
          <FlatList
            style={styles.orderNumber}
            data={ItemNum}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => setOrderNumber(item.key)}
              >
                <Text>{item.key}</Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20
  },
  container: {
    flex: 1
  },
  orderItemList: {
    height: "20%"
  },
  orderItemText: {
    fontSize: 20,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 15
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "8%"
  },
  divider: {
    margin: 5,
    borderWidth: 0.5
  },
  number: {
    fontSize: 30
  },
  menu: {
    width: "70%"
  },
  orderNumber: {
    width: "30%"
  },
  orderList: {
    flexDirection: "row",
    height: "70%"
  },
  item: {
    backgroundColor: "#AAA",
    width: "50%",
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OrderScreen;

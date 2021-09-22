import React, { useState, createContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text
} from "react-native";
import { Button, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Footer from "../components/Footer";
import ImgList from "../components/ImgList";
import CostemerListScreen from "./CostemerListScreen";
import { firebase } from "@firebase/app";
import "firebase/storage";
import "firebase/firestore";

export const UserCount = createContext();
export const OrderData = createContext();

let ItemNum = [];
for (let i = 1; i <= 20; i++) {
  let item = { key: String(i) };
  ItemNum.push(item);
}

function OrderScreen({ navigation, route }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [item_list, setItemList] = useState({});
  console.log(item_list);
  const item = {
    item_list,
    setItemList
  };
  const ordernum = {
    orderNumber,
    setOrderNumber
  };
  const amount = {
    totalAmount,
    setTotalAmount
  };
  let routes = route.params.routes;
  let date = route.params.when;

  const countMinus = item => {
    for (let i in item_list) {
      if (item_list[i].id == item.id) {
        item_list[i].num -= 1;
        console.log(item_list[i]);
        if (item_list[i].num == 0) {
          delete item_list[i];
        }
      }
    }
    setTotalAmount(Number(totalAmount) - Number(item.price));
  };
  const countPlus = item => {
    for (let i in item_list) {
      if (item_list[i].id == item.id) {
        item_list[i].num += 1;
      }
    }
    setTotalAmount(Number(totalAmount) + Number(item.price));
  };
  const deleteButton = item => {
    for (let i in item_list) {
      if (item_list[i].id == item.id) {
        delete item_list[i];
      }
    }
    setTotalAmount(Number(totalAmount) - Number(item.price) * item.num);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.orderInfo}>
          <Text style={styles.number}>{orderNumber}番</Text>
          <Text style={styles.number}>¥{totalAmount}</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.orderItemList}>
          <FlatList
            data={Object.entries(item_list).map(([item, name]) => ({
              item,
              name
            }))}
            renderItem={({ item }) => {
              const name = item.name;
              console.log(item);
              console.log(name);
              return (
                <View style={styles.orderRow}>
                  <Text style={styles.orderItemText}>{name.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      countMinus(name);
                    }}
                  >
                    <Icon name="minus" size={20} color="#73899d" />
                  </TouchableOpacity>
                  <Text style={styles.orderItemText}>x {name.num}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      countPlus(name);
                    }}
                  >
                    <Icon name="plus" size={20} color="#73899d" />
                  </TouchableOpacity>
                  <Text>¥{name.price * name.num}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteButton(name);
                    }}
                  >
                    <AntDesign name="delete" size={20} color="#73899d" />
                  </TouchableOpacity>
                </View>
              );
            }}
          ></FlatList>
        </View>

        <View style={styles.orderList}>
          <View style={styles.menu}>
            <ImgList
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              item_list={item_list}
              setItemList={setItemList}
              orderNumber={orderNumber}
              routes={routes}
            />
          </View>
          <FlatList
            style={styles.orderNumber}
            data={ItemNum}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => setOrderNumber(item.key)}
              >
                <Text style={styles.buttonText}>{item.key}</Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
      <UserCount.Provider value={{ item, ordernum, amount, date }}>
        <Footer navigation={navigation} />
      </UserCount.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#FFF"
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
  orderRow: {
    flexDirection: "row",
    paddingLeft: 10
  },
  divider: {
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#73899d"
  },
  number: {
    fontSize: 30
  },
  menu: {
    width: "80%"
  },
  orderNumber: {
    width: "20%"
  },
  orderList: {
    flexDirection: "row",
    height: "70%",
    backgroundColor: "#f0f0f0"
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
  }
});

export default OrderScreen;

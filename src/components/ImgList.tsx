import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Dimensions
} from "react-native";
import { firebase } from "@firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { TabView, ScrollPager, TabBar } from "react-native-tab-view";

const ListRoute = props => {
  console.log(props)
  const { data, setOrderInfo } = props;
  return (
    <FlatList
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
  );
};

const ImgList = props => {
  const {
    totalAmount,
    setTotalAmount,
    item_list,
    setItemList,
    orderNumber,
    routes,
    user
  } = props;
console.log('routes',routes)
  const [data, setData] = useState(0);
  const [index, setIndex] = useState(0);
  let db = firebase.firestore();
  let date = new Date();
  let today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  let classification = [];

  const dbget = async () => {
    const docRef = db
    .collection("user")
    .doc(user)
    .collection("menu")
    const earnings = db
      .collection('user')
      .doc(user)
      .collection("earn")
      .doc(String(today));
      
    const result = await docRef.get().then(querySnapshot => {
      let str = [];
      let key=[];
      querySnapshot.forEach(doc => {
        key=Object.keys(doc.data())
        key.map((item)=>{
          console.log(item)
        str.push(
          Object.assign({
            id: doc.id,
            url: doc.data()[item].url,
            name: doc.data()[item].name,
            category: doc.data()[item].category,
            price: doc.data()[item].price
          })
        );
      console.log(str)
        earnings.set(
          {
            [doc.data()[item].name]: {
              price: doc.data()[item].price,
              num: firebase.firestore.FieldValue.increment(0)
            },
            earn:firebase.firestore.FieldValue.increment(0)
          },
          { merge: true }
        );
        })
      });
 
      return str;
    });
if(routes!=0){
    routes.forEach(function(category) {
      classification.push(
        result.filter(function(value) {
          return value.category == category.title;
        })
      );
    });
    setData(classification);
  }else{
    setData(classification);
  }
  };

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    dbget().then(data=>{
      if(isMounted){
       console.log(data)
      }
    })
    return()=>{
      isMounted=false;
    }
  },[]);
 
  const setOrderInfo = item => {
    let time =
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
    if (!checkArray(item.id, time)) {
      item_list[time] = Object.assign({
        id: item.id,
        name: item.name,
        num: 1,
        price: item.price,
        time: time,
        check: false
      });
    }
    setTotalAmount(Number(totalAmount) + Number(item.price));
  };

  const checkArray = (product_id) => {
    let exist;
    for (let i in item_list) {
      if (item_list[i].id == product_id) {
        item_list[i].num += 1;
        exist = true;
      }
    }
    return exist;
  };

  const renderScene = ({ route }) => { 
    return <ListRoute data={data[route.key]} setOrderInfo={setOrderInfo} />;
  };
  
  const initialLayout = { width: Dimensions.get("window").width };
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#e91e63" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ color: "black" }}
      scrollEnabled={true}
      tabStyle={{ width: 80 }}
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
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

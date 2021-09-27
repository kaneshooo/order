import React from "react";
import { useState, useEffect } from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { TabView, ScrollPager, TabBar,SceneMap } from "react-native-tab-view";

function ListRoute(props) {

  return (
    <FlatList
      data={props.data}
      numColumns={4}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.navigation.navigate("Detail", { item })}
        >
          <Image style={styles.img} source={{ uri: item.url }} />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
}

function SettingScreen(props) {
   
  let [data, setData] = useState(0);
  const [index, setIndex] = useState(0);
  let routes = props.route.params.routes;
  let navigation = props.navigation;
  let user=props.route.params.user;
  let check=props.route.params.check;
  let classification = [];
console.log(props)
  let db = firebase.firestore();
  const FirstRoute = () => (
      <View style={{ flex: 1, backgroundColor: 'grey'}}>
        <Text>Tab One</Text>
      </View>
    );
  if(check==true){
    check=false
  }
  else{
   
  const dbget = async () => {
    const docRef = db
    .collection("user")
    .doc(user)
    .collection("menu")

    const result = await docRef.get().then(function(querySnapshot){
      let str = [];
      querySnapshot.forEach(doc => {
        console.log(doc.data().category);
        let categoryName = routes[doc.data().category-1 ].title;
        console.log(categoryName);
        str.push(
          Object.assign({
            id: doc.id,
            url: doc.data().url,
            name: doc.data().name,
            categoryName: categoryName,
            price: doc.data().price
          })
        );
      });
      return str;
    });

routes.forEach(function(category) {
  classification.push(
    result.filter(function(value) {
      return value.categoryName == category.title;
    })
  );
});
setData(classification);
};
  
useEffect(()=>{
dbget();
},[])
 }
const renderScene = ({ route }) => {
  if(check==false){
  return <ListRoute data={data[route.key - 1]} navigation={navigation} />;
}else{
  return SceneMap({
    first: FirstRoute,
  })  
}
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
  <View style={styles.wrapper}>
    <Header navigation={navigation} name="アイテム管理" />
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />

    <TouchableOpacity onPress={() => navigation.navigate("Register", {user})}>
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
    color: "#FFF",
    alignItems: 'center',
    justifyContent: 'center'
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

export default SettingScreen
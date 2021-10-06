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
import { TabView, ScrollPager, TabBar, SceneMap } from "react-native-tab-view";

function ListRoute(props) {
  let { user, routes } = props.value;
  return (
    <FlatList
      data={props.data}
      numColumns={4}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            props.navigation.navigate("Detail", { item, user, routes })
          }
        >
          <Image style={styles.img} source={{ uri: item.url }} />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
}

function SettingScreen({ navigation, route }) {
  const [data, setData] = useState(0);
  const [index, setIndex] = useState(0);
  let { checker, routes, user } = route.params;
  let classification = [];

  let db = firebase.firestore();

  const dbget = async () => {
    const docRef = db
      .collection("user")
      .doc(user)
      .collection("menu");

    const result = await docRef.get().then(function(querySnapshot) {
      let str = [];
      let key = [];
      querySnapshot.forEach(doc => {
        key = Object.keys(doc.data());
        key.map(item => {
          str.push(
            Object.assign({
              id: doc.data()[item].id,
              category: doc.data()[item].category,
              name: doc.data()[item].name,
              price: doc.data()[item].price,
              url: doc.data()[item].url
            })
          );
        });
      });
      return str;
    });

    routes.forEach(function(category) {
      classification.push(
        result.filter(function(value) {
          return value.category == category.title;
        })
      );
    });
    console.log(classification);
    console.log(result);
    setData(classification);
  };

  useEffect(() => {
    dbget();
  }, [checker]);

  const renderScene = ({ route }) => {
    return (
      <ListRoute
        data={data[route.key]}
        navigation={navigation}
        value={{ user, routes }}
      />
    );
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
      // onTabPress={({route,preventDefault})=>{
      //   if(route.title=='+'){
      //     console.log('AAAAAAAAAAA')
      //   }
      // }}
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

      <TouchableOpacity
        onPress={() => navigation.navigate("Register", { user, routes })}
      >
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
    backgroundColor: "#FFF"
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
    alignItems: "center",
    justifyContent: "center"
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

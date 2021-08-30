import React from "react";
import { useState ,useEffect} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image
} from "react-native";
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";


function SettingScreen({ navigation }) {

  const [data,setdata]=useState();
  const [pagename,setPageText]=useState();
// firestoreからデータを取得
const dbget=async()=>{
  console.log('DB')
  var db=firebase.firestore();
  const docRef= db.collection("users").doc("menu").collection("ゲーム");
    const result=await docRef.get().then(
    querySnapshot => {
      let bb=[]; 
      querySnapshot.forEach
        (doc=> {
          bb.push(
            Object.assign({
            id:doc.id,
            page:pagename,
            url:doc.data().url,
            name:doc.data().name,
            price:doc.data().price
            })
            )                          
        })
    console.log(bb);
    return bb;
  });   
   setdata(result);
}

useEffect(()=>{
dbget();
},[])
console.log(data)
  return (
    <View style={styles.wrapper}>
      <Header navigation={navigation} name="アイテム管理" />

      <View style={styles.distinction}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon name="arrow-back-outline" size={30} color="#FFF" />
        </TouchableOpacity>

        <TextInput style={styles.distinctionText} 
                   onChangeText={text => setPageText(text)}
                   defaultValue={'page1'}
        />
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon name="arrow-forward-outline" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        numColumns={4}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Detail", { item })}
          >
            <Image style={styles.img} source={{uri:item.url}} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      ></FlatList>

      <TouchableOpacity onPress={() => navigation.navigate("Register", {  })}>
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
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View ,Modal,Pressable} from "react-native";
import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "firebase/storage";
import "firebase/firestore";

function HomeScreen({ navigation,route }) {
  const [time, setdate] = useState<String>("");
  const [modalstate, setstate] = useState(false);
  const [check, setcheck] = useState(false);
  const [routes, setroutes] = useState();
  let date = new Date();
  let user;

  if(route.params.name=='Signin'){
    user=route.params.user.user.uid;
  }else{
    user=route.params.route.params.user
  }
  let db = firebase.firestore();

  const dbget =async() => {
   const checkdoc=await db.collection('user').doc(user).collection("menu").get();
   console.log(checkdoc.size)
   //新規設定をするか否か
    if(checkdoc.size==0){
      db.collection('user').doc(user).set({name:user})
      setcheck(true)
      let tmp=[{key:0,title:'+'}]
      setroutes(tmp)
    }else{
      setcheck(false)
      setstate(false)
      const categoryRef = db
      .collection('user')
      .doc(user)
      .collection("menu")

      const result = await categoryRef.get().then(querySnapshot => {
        let str = [];
        let key=[];
        let count=0;
        querySnapshot.forEach(doc => {
          key.push(doc.id)
          str.push(
            Object.assign({
              key: count,
              title: doc.id
            })
          );
          count++;
        })
        return str;
      });
      console.log(result)
      setroutes(result);
    }
  };
  useEffect(() => {
    dbget();
  }, []);
  console.log(routes)
  console.log(check)
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#053050" }]}
        onPress={() => {
          if (time === "") {
            var when =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate();
            setdate(time);
          }
          navigation.navigate("Order", { when, routes,user });
        }}
      >
        <Text style={[styles.buttonSize, { color: "#FFF" }]}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FFF" }]}
        onPress={() => navigation.navigate("Earning",{user})}
      >
        <Text style={[styles.buttonSize, { color: "#053050" }]}>Log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Setting",  {user,routes,check} )}
      >
        <Text style={styles.buttonSize}>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#999" }]}
        onPress={() => navigation.navigate("Table",  {user,check} )}
      >
        <Text style={styles.buttonSize}>Table</Text>
      </TouchableOpacity>
    <Modal
      visible={modalstate}
      animationType="slide"
      transparent={true}
      style={styles.modal}
    >
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <Text style={styles.ordernumfont}>新規設定</Text>
      <Pressable onPress={() => {navigation.navigate("Setting", { routes,user,check }),setstate(false)}}  style={styles.button}><Text　style={styles.textStyle}>新規設定へ</Text></Pressable>
    </View>
    </View>
    </Modal>
   </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#053050",
    fontWeight: "700",
    fontSize: 70,
    marginBottom: 80,
    padding: 30
  },
  button: {
    fontSize: 30,
    width: 300,
    height: 55,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  buttonSize: {
    fontSize: 30,
    fontWeight: "500"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#697689",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    },
    modal: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },  
       ordernumfont: {
        fontSize: 24,
        color:"white",
      }
});

export default HomeScreen;

import React, { useState ,useEffect} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Button,
  Image
} from "react-native";
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';



const ImgList = props => {
  const { totalAmount, setTotalAmount, item_list, setItemList,orderNumber } = props;

const [data,setdata]=useState();
const dbget=async()=>{

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
            // page:pagename,
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

  const checkArray = (product_name) => {
    let exist;
    item_list.find((item, index) => {
      if (item.name === product_name) {
        let tmp = item_list;
        tmp[index].num += 1;
        setItemList(tmp);
        exist = true;
      }
    });

    return exist;
  }
  const setOrderInfo = (product_name, price) => {
  

   if (!checkArray(product_name)){
    setItemList([...item_list, {name: product_name, num: 1, price:price}]);
    }
    setTotalAmount(totalAmount + price);
  };


const dbset=async()=>{
  var db=firebase.firestore();
  var date=new Date();
  var time=date.getUTCFullYear()+"-"+date.getMonth()+1+"-"+date.getDate();
  
  const docRef= db.collection("users").doc("order").collection(time);
  docRef.doc(item_list.ordernum).put.then(
    
  )
}

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
            onPress={() => setOrderInfo(item.name, item.price) }
            >
            <Image style={styles.img} source={{uri:item.url}}  />
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

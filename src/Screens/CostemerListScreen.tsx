import React from 'react';
import { useState ,useEffect,useContext} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  Modal,
  Button
} from "react-native";
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';
import { OrderData } from './OrderScreen';
import Storage from 'react-native-storage';
import  AsyncStorage  from 'react-native';


// Orderlistに未支払いで注文済みのお客さんの注文詳細を格納する。
// item_listで毎回の注文情報を格納し、Orderlistの格納する.

const CostemerListScreen=(props)=>{

const item = props.route.params.OrderDetail;

// const [OrderList,setOrderList]=useState([]);


// setOrderList(item);
// // console.log(OrderList)
    const Array = [
        {
          title: 'Apple',
          subTitle: 'Fruits',
        },
        {
          title: 'Tomato',
          subTitle: 'Vegetables',
        },
        {
          title: 'water',
          subTitle: 'drink',
        },
      ];
    return(
     <View style={styles.container}>

            <Text>{props.value}</Text>
        <FlatList
          data = {Array}
          renderItem={({ item }) =>
            <View style={styles.textView}>
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.subText}>{item.price}</Text>
              </View>
            </View>
          }
          keyExtractor={item => item.id}
        /> 
      </View>
    );

    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50
    },
    textView: {
      backgroundColor: 'black',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    text: {
      fontSize: 30,
      color: "white"
    },
    subText: {
      fontSize: 20,
      color: "lightblue"
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    
        backgroundColor: '#ecf0f1',
        }
  });
export default CostemerListScreen
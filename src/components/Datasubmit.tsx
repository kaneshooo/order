import React , {useState} from "react";
import { View, StyleSheet, Text ,Button, Modal,Alert, Pressable} from "react-native";
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';

function Datasubmit(props){

  const state=props.value.modal.state;
  const setState=props.value.modal.setState;
  const item_list=props.value.item.item_list;
  const setItemList=props.value.item.setItemList;
  const setOrderList=props.value.value.setOrderList;
  const OrderDetail=props.value.value.OrderDetail;
  const orderNumber=props.value.ordernum.orderNumber;
  const setOrderNumber=props.value.ordernum.setOrderNumber;
  const setTotalAmount=props.value.amount.setTotalAmount;
  const TotalAmount=props.value.amount.totalAmount;
  const date=props.value.date;


  const closeModal=()=> {
      setState(false);
    } 
  const submit=()=>{
    Alert.alert(
      'Good Job!!',
      '送信できました',
      [
        {text: 'OK', onPress: () => {
          setState(false),
          setItemList([]),
          setOrderNumber(''),
          setTotalAmount(0)}
        }
      ],{ cancelable: false }
    )
  }
  const dataset=()=>{
    var db=firebase.firestore();
    const docref=db.collection("users").doc("order").collection("list").doc(String(orderNumber));      
    const earnings=db.collection("users").doc('earning').collection("list").doc(String(date));
    docref.set({
      orderlist:item_list,
      fee:firebase.firestore.FieldValue.increment(TotalAmount)
    },{merge:true}),
    earnings.set({
      earn:firebase.firestore.FieldValue.increment(TotalAmount)
    },{merge:true})
    .then(()=>{
      submit()
      console.log('success');
    })
    .catch((error)=>{
      console.log(error)
    });
  }   
      

    const predata=Object.entries(item_list).map(([item,name])=>({item,name}));

return(
<View style={styles.modal}>
    <Modal
      visible={state}
      animationType="slide"
      transparent={true}
    >
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
    <Text style={styles.ordernumfont}>{orderNumber}番</Text>
       {predata.map(item=>{
        const data=item.name
       return (
        <Text style={styles.font}>{data.name}   ×   {data.num}         {Number(data.price)*Number(data.num)}円</Text>
      )})}  
      <Pressable onPress={() => dataset()}  style={styles.button}><Text　style={styles.textStyle}>送信</Text></Pressable>
      <Pressable onPress={() => closeModal()} style={styles.button}><Text style={styles.textStyle}>キャンセル</Text></Pressable>        
    </View>
    </View>
    </Modal>
    </View>
    
    );
     }

const styles=StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      ordernumfont: {
        fontSize: 24,
        color:"white",
      },
      font: {
        fontSize: 24,
        color:"white",       
      },
      button: {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        backgroundColor: "#00b2ff",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      bar: {
        height: 7,
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: "black",
        width: 50,
        marginTop: 5,
        position: "absolute",
        top: 10
      }
})
export default Datasubmit;
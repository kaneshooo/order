import React , {useState} from "react";
import { View, StyleSheet, Text ,Button, Modal,Alert, Pressable} from "react-native";

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

    const closeModal=()=> {
        setState(false);
      } 
      const submit=()=>{
        Alert.alert(
          'Good Job!!',
          '送信できました',
          [
            {text: 'OK', onPress: () => {
              setOrderList([...OrderDetail,{ordernum:orderNumber,orderlist:item_list}]),
              setState(false),
              setItemList([]),
              setOrderNumber(''),
              setTotalAmount(0)}
            }
          ],          { cancelable: false }
        )
      }
    
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
     {item_list.map(item=>(
        <Text style={styles.font}>{item.name}   ×   {item.num}         {Number(item.price)*Number(item.num)}円</Text>
      ))}
      <Pressable onPress={() => {submit()}}  style={styles.button}><Text　style={styles.textStyle}>送信</Text></Pressable>
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
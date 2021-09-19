import React , {useContext,useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text ,Button, Modal,Alert} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";
import {OrderData, UserCount} from "../Screens/OrderScreen";
import Datasubmit from "./Datasubmit";


function Footer({ navigation }) {

  const {item,ordernum,amount,date}=useContext(UserCount);
  const [OrderDetail,setOrderList]=useState([]);
  const [state,setState]=useState(false);
  
  const value={
    OrderDetail,
    setOrderList,
  };
  const modal={
    state,
    setState,
  }
  const confirm=()=>{
    if(ordernum.orderNumber==''){
        Alert.alert(
          'STOP',
          '注文番号を入力してください',
          [
            {text: 'OK', onPress: () => {setState(false)}}
          ],
          { cancelable: false }
        )
    }
    else{
      setState(true)
    }
  }
  return (
    <View style={styles.wrapper}> 
      <Datasubmit value={{ordernum,item,value,modal,amount,date}}/>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>{confirm()}}
        >
          <Icon2 name="handshake-o" size={20} color="#73899d" />
          <Text style={styles.footerText}>送信</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Icon name="home" size={20} color="#73899d" />
          <Text style={styles.footerText}>販売終了</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Treasurer")}
        >
          <Icon name="pay-circle-o1" size={20} color="#73899d" />
          <Text style={styles.footerText}>会計</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CostemerList")}
        >
          <Icon name="pay-circle-o1" size={20} color="#73899d" />
          <Text style={styles.footerText}>顧客管理</Text>
        </TouchableOpacity>
      </View>
    </View>
  
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fdfdfd",
    height: 45,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 5
  },
  footerText: {
    fontSize: 15,
    marginTop: 5,
    color: "#73899d"
  },

});

export default Footer;

import { useLinkProps } from "@react-navigation/native";
import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { Text, View,  StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import Footer from "../components/Footer";
import ImgList from "../components/ImgList";

function OrderScreen() {
  const [orderNumber, setOrderNumber] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [item_list, setItemList] = useState([]);
  return (
    <View>
      <View>
        <View style={styles.orderItemNum}>
          {item_list.map(item => {
            return (
              <View>
                {item.productName} x {item.num}
              </View>
            );
          })}
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{orderNumber}番</Text>
          <Text style={styles.totalAmount}>¥{totalAmount}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.container}>
            <Menu>
            {<ImgList
            /* totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}*/
            item_list={item_list}
            setItemList={setItemList}
          /> }
            </Menu>
          </View>
          <View style={styles.orderNumberList}>
            {ordernum.map(i =>(
              <Button icon='camera' style={styles.orderNumberButton} onPress={() => setOrderNumber(i)}>  
                <Text style={styles.buttonText}> {i} </Text>
              </Button>
            ))}
          </View>
        </View>
      </View>

      <Footer />
    </View>
  );
}

const ordernum=[];
for(let i=1;i<21;i++){
  ordernum[i]=i;
}

const Menu= styled.div``;
const styles = StyleSheet.create({
  orderItemNum: {
    height: 100,
    overflow: "scroll"
  },
  orderInfo: {
    display: "flex",
    justifyContent: "space-around"
  },
  orderNumber: {
    fontSize: 30
  },
  totalAmount: {
    fontSize: 30
  },
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginBottom: 30
  },
  orderNumberList: {
    flexDirection: "column",
    overflow: "scroll",
    height: 480,
    width: "100%",
    textAlign: "center"
  },
  orderNumberButton: {
    marginTop: 10,
    backgroundColor:'#fff',
    width: "40",
    height: "40"
  }
 
});

export default OrderScreen;

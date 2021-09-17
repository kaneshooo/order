import React from 'react';
import { useState } from "react";
import { StyleSheet,View,Text,Button,TouchableOpacity,Modal,Pressable} from 'react-native';
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';
import Header from '../components/Header'
function TreasurerScreen(props,{navigation}){

  var fee=props.route.params[0].fee
  var id=props.route.params[0].id
  const array=props.route.params
  const [amount,setamount]=useState(0);
  const [result,setresult]=useState(0);
  const [state,setstate]=useState(false);
  
  const onNum=(input)=>{
    var preamount=amount+Number(input)
    setamount(preamount)
    var preresult=amount-fee
    setresult(preresult);
  }
  
  const onReset=()=>{
    setamount(0);
    setresult(0);
  }
  let money1=[1,5,10,50,100,500,1000,3000,5000,10000];

  const ZeroToThree=[];
    for(let i=0;i<3;i++){
      ZeroToThree[i]=money1[i]
    };

  const FourToSix = [];
    for (let i = 3; i< 6; i++) {
      FourToSix[i] =money1[i]
    };

  const SevenToNine = [];
    for (let i = 6; i< 10; i++) {
      SevenToNine[i] =money1[i]
    };

  const del=async()=>{

    var date=new Date();
    var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var yesterday=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()-1);
    const db=firebase.firestore();
    const docref=db.collection('users').doc('order').collection('list').doc(String(id));
    const earnings=db.collection("users").doc('earning').collection("list").doc(String(today));
    const earnings_yes=db.collection("users").doc('earning').collection("list").doc(String(yesterday));
    const check=await earnings.get()

    docref.delete().then(()=>{
      setstate(true)
    }).catch((error)=>{
      console.log(error)
    })

    //売上更新
    //営業中に日付が変わった場合
    if(!check.exists){
      console.log('later')
      array.forEach((items=>{
        earnings_yes.update({
          earn:firebase.firestore.FieldValue.increment(fee),
          [[items['name']]+'.num']:firebase.firestore.FieldValue.increment(items['num'])       
        })
        .catch((error)=>{
          console.log(error)
        })
      }))  
    }
    //営業開始~日付変更迄
    else{
      console.log('before')
      array.forEach((items=>{
        earnings.update({
          earn:firebase.firestore.FieldValue.increment(fee),
          [[items['name']]+'.num']:firebase.firestore.FieldValue.increment(items['num'])       
        })
        .catch((error)=>{
          console.log(error)
        })
      }))  
    }
  }
  
  const closeModal=()=>{
    setstate(false)
  }

return(
    <View >
      <Header navigation={navigation} name="顧客管理"/>
        <View style={styles.countArea}>
            <Text style={styles.value}>{amount}-{fee}={result}</Text>
        </View>
        <View style={styles.buttonArea}>
        <View style={{flexDirection: 'row'}}>
          {ZeroToThree.map(i => (
              <TouchableOpacity style={styles.topbutton,styles.buttonNum} key={i} onPress={() => onNum(i)}>
                <Text style={styles.buttonText}> {i} </Text>
              </TouchableOpacity>
          ))}
        </View> 
        <View style={{ flexDirection: 'row'}}>
          {FourToSix.map(i => (
              <TouchableOpacity style={styles.topbutton, styles.buttonNum} key={i}  onPress={() =>onNum(i)}> 
                <Text style={styles.buttonText}> {i} </Text>
              </TouchableOpacity>
          ))}
          </View>
        <View style={{ flexDirection: 'row'}}>
          {SevenToNine.map(i => (
              <TouchableOpacity style={styles.topbutton, styles.buttonNum} key={i}  onPress={() => onNum(i)}> 
                <Text style={styles.buttonText}> {i} </Text>
              </TouchableOpacity>
          ))}
        </View>
        {/* //足し算ボタン */}
        {/* <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.button, styles.buttonUpText]} onPress={()=>this.onMark("+")}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity> */}
            {/* //引き算ボタン 
            <TouchableOpacity style={[styles.button, styles.buttonMinus]} onPress={()=>this.onMark("-")}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            //掛け算ボタン 
            <TouchableOpacity style={[styles.button, styles.buttonTimes]} onPress={()=>this.onMark("×")}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
              //割り算ボタン 
            <TouchableOpacity style={[styles.button, styles.buttonDivide]} onPress={()=>this.onMark("÷")}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
              //=ボタン 
            <TouchableOpacity style={[styles.button, styles.buttonEqual]} onPress={()=> this.onEqual()}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
            */}
            {/* リセットボタン */}
            <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={()=> onReset()} >
              <Text style={[styles.buttonResetText]}>C</Text>
            </TouchableOpacity>
            <Button title='会計' style={styles.button} onPress={()=> del() }> 会計 </Button>
          </View>
          <View style={styles.modal}>
          <Modal
            visible={state}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.font}>Thank You!</Text>       
                <Pressable onPress={() => closeModal()} style={styles.button}><Text　style={styles.textStyle}>送信</Text></Pressable>
                <Pressable onPress={() => closeModal()} style={styles.button}><Text style={styles.textStyle}>キャンセル</Text></Pressable>  
              </View>
            </View>
          </Modal>
        </View>
        </View>

);
};

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
      },
      countArea: {
        marginTop: 150,
        justifyContent: "center",
        alignItems: "center", 
        marginBottom:30
      },
      buttonArea: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'  
      },
      value: {
        fontSize: 30
      },
      topbutton: {
        marginTop: 50
      },
      buttonText: {
        fontSize: 25,
        color: '#fff',
        alignItems: 'center' 
      },
      buttonUp: {
        backgroundColor: '#A53434',
        fontWeight: "bold"
      },
      buttonUpText: {
        backgroundColor: 'red'
      },
      buttonMinus: {
        backgroundColor: '#343EA5'
      },
      buttonTimes: {
        backgroundColor: 'purple'
      },
      buttonDivide: {
        backgroundColor: "green"
      },
      buttonReset: {
        borderColor: '#AFADAD',
        marginBottom: 200
      },
      buttonResetText: {
        color: '#000',
        fontSize:25
      },
      buttonNum: {
        backgroundColor: 'grey',
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: ('35%'),
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff'
      },
      buttonEqual: {
        backgroundColor: "black"
      }
})

export default TreasurerScreen;
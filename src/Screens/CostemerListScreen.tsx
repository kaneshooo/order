import React from 'react';
import { useState ,useEffect} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  Button
} from "react-native";
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';
import Accordion from 'react-native-collapsible/Accordion';
import Header from '../components/Header'
// Orderlistに未支払いで注文済みのお客さんの注文詳細を格納する。
// item_listで毎回の注文情報を格納し、Orderlistの格納する.

function CostemerListScreen ( {navigation} ) {

const [ordernum,setordernum]=useState([]);
const [state,setState]=useState([]);
const [check,setCheck]=useState(false);
const [update,setUpdata]=useState<boolean>(false)
var db=firebase.firestore()
const getlist=db.collection('users').doc('order').collection('list')
var data=ordernum;

const dbget=()=>{
  //collection('list')内のデータを読み込み
  var array=[]
  const unsubscribe = getlist.onSnapshot(function(querySnapshot){
    querySnapshot.docChanges().forEach((changes)=>{

      //追加か更新がされた時
      if(changes.type==='added'||changes.type==='modified'){ 
        var orderlist=changes.doc.data().orderlist;
        var fee=changes.doc.data().fee;
        var id=changes.doc.id;
        
        //オーダー番号の数だけ、データを格納
        var index=[]

        //各注文を取得する。
        for(var num=0;num<Object.keys(orderlist).length;num++){
          const list=orderlist[Object.keys(orderlist)[num]]
          list.id=id
          list.fee=fee
          index[num]=list
        }
        array[id-1]=index; 
      }     
    })
    data=array
    setordernum(data)
    setUpdata(update?false:true)
    return () => unsubscribe()
  })

}

useEffect(()=>{
  dbget();
  setUpdata(update?false:true)
  },[])

const ordermg=async(item)=>{
  setUpdata(update?false:true)
  if(check==true){
   var counter=false
  }else{
   var counter=true
  }
  setCheck(counter)
  await getlist.doc(String(item.id)).update({
    ['orderlist.'+[item.time]+'.check']:true,
  }) 
}

const _renderSectionTitle = (section) => {
  return (
    <View style={styles.content}>
      <Text></Text>
    </View>
  );
};

const _renderHeader = (section) => {
  return (  
    <View style={styles.header}>    
      <Text style={styles.headerText}>{section[0].id}</Text>   
    </View>
  );
};

const _renderContent = (section) => {
  console.log(section)
  return (
    <View style={styles.content}>
         {section.map(item=>
      <>
      <Text style={styles.contentText}>{item.name}  ×  {item.num}</Text>
      {item.check?(
        <Text style={styles.contentText}>〇</Text>
      ):(
        <Text style={styles.contentText}>×</Text>
      )
      }
      <Button style={styles.button} title='OK' onPress ={()=>ordermg(item)}>OK</Button>
      </> 
      )}
      <Button style={styles.button} title='会計' onPress ={()=>navigation.navigate("Treasurer",  section   ) }>会計</Button>
    </View>    
  );
};

const _updateSections = (activeSections) => {
  setState( activeSections );
};
return(
  <View style={styles.container}>
    <Header navigation={navigation} name="顧客管理"/>
    <Accordion 
    sections={data}
    activeSections={state}
    renderSectionTitle={_renderSectionTitle}
    renderHeader={_renderHeader}
    renderContent={_renderContent}
    onChange={_updateSections}        
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
      },
    header: {
      backgroundColor: '#002763',
      padding: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '500',
      color:'white'
    },
    content: {
      flex:1,
      padding: 5,
      backgroundColor: '#fff',
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
    contentText:{
      padding:5,
      fontSize: 30,
      fontWeight: '500'
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
      },
    button:{
      backgroundColor:"#ff5622",
      margin: 10,
      flexDirection: 'row'
    }
  });
export default CostemerListScreen
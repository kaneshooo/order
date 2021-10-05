import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,  Dimensions} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '@firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';
import _ from "lodash"
import Header from '../components/Header'

export default function TableScreen(props) {
  console.log(props)
  let user=props.route.params.user
  let navigation=props.navigation

  const [ columns, setColumns ] = useState([
    "List",
    "Name",
    "Num",
    "OrderNumber"
  ])
  const [ direction, setDirection ] = useState(null)
  const [ selectedColumn, setSelectedColumn ] = useState(null)
  const [order,setorder]=useState([])
  const [check,setcheck]=useState(false)
  const [width,setwidth]=useState(Dimensions.get("window").width)
  const [height,setheight]=useState(Dimensions.get("window").height)


  Dimensions.addEventListener("change",(e)=>{
    setwidth(e.width)
    setheight(e.height)
  })
  let db=firebase.firestore()
  const getlist=db.collection('user').doc(user).collection('order')

  const dbget=async()=>{
    //collection('list')内のデータを読み込み
     let index=[];
    await getlist.onSnapshot(function(querySnapshot){
      querySnapshot.docChanges().forEach((changes)=>{
        let orderlist=changes.doc.data().orderlist;
        let id=changes.doc.id;
        //追加か更新がされた時
        if(changes.type==='added'){
          //各注文を取得する。
          for(var num=0;num<Object.keys(orderlist).length;num++){
            index.push(
              Object.assign({
                name:orderlist[Object.keys(orderlist)[num]].name,
                num:orderlist[Object.keys(orderlist)[num]].num,
                time:orderlist[Object.keys(orderlist)[num]].time,
                ordernum:id,
              })
            )
          }
          setorder(index)
        }
        if(changes.type==="removed"||changes.type === 'modified'){
          for(var num=0;num<Object.keys(orderlist).length;num++){
            index=index.filter((element)=>{ return (element.time==Object.keys(orderlist)[num])&&(element.ordernum==orderlist[Object.keys(orderlist)[num]].id)})
          }
          setorder(index)
        }
        setcheck(true)
      })
    })
  }

  useEffect(()=>{
    dbget()
  },[])
  useEffect(()=>{
    setcheck(false)
  },[check])

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc" 
    const sortedData = _.orderBy(order, [column],[newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)

  }
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {
        columns.map((column, index) => {
          {
            return (
              <TouchableOpacity 
                key={index}
                style={styles.columnHeader} 
                onPress={()=> sortTable(column)}>
                <Text style={styles.columnHeaderTxt}>{column + " "} 
                  { selectedColumn === column && <MaterialCommunityIcons 
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"} 
                    />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  )

  


const styles = StyleSheet.create({
  all:{
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    height:height,
    width:width
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 5,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: "row",
    height: 40,
    alignItems:"center",
  },
  columnHeader: {
    justifyContent: "center",
    alignItems:"center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width:"30%",
    textAlign:"center",
    flexDirection: "row"
  }
});
return (
    <View style={styles.all} >
      <Header navigation={navigation} name="Order" value="Home"/>
      <View style={styles.container}>
        <FlatList 
          data={order}
          style={{width:"90%"}}
          keyExtractor={(item, index) => index+""}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          renderItem={({item, index})=> {
            return (
              <View style={styles.tableRow}>
                <Text style={styles.columnRowTxt}>{index+1}</Text>
                <Text style={styles.columnRowTxt}>{item.name}</Text>
                <Text style={styles.columnRowTxt}>{item.num}</Text>
                <Text style={styles.columnRowTxt}>{item.ordernum}</Text>
              </View>
            )
          }}
        />
      <StatusBar style="auto" />
      </View>
    </View>
  );
}
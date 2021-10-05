import React from "react";
import { useState ,useEffect, createContext} from "react";
import { firebase } from '@firebase/app'
import 'firebase/storage'; 
import 'firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  FlatList
} from "react-native";
import  { 
    LineChart ,
    BarChart ,
    PieChart ,
    ProgressChart ,
    ContributionGraph ,
    StackedBarChart 
}  from  "react-native-chart-kit" ;
import Header from "../components/Header";
import CreateChart from "../components/Chart";
import CarenderView from "../components/Carender"
import styled from "styled-components";

export const createCarender = createContext();
function Earning({navigation,route}){
    let pro=[]
    let user=route.params.user
    let getdate = new Date();
    let day=getdate.getDate()
      let today =
      getdate.getFullYear() + "-" + (getdate.getMonth() + 1) + "-" + day;
  
    const [num,setnum]=useState(0)
    const [data,setdata]=useState([])
    const [earn,setearn]=useState(0) ; //選択した日の売上
    const [date,setdate]=useState(today) //選択した日付
    const [max,setmax]=useState(1)
    const [width,setwidth]=useState(0)
    console.log(date)
    const date_item={
      date,
      setdate
    }

    const db=firebase.firestore()
    const erdoc = db
      .collection('user')
      .doc(user)
      .collection('earn')
      .doc(date)

    const docRef = db
      .collection("user")
      .doc(user)
      .collection("menu")

    const getdata=async()=>{
        await erdoc.get().then((doc) => {
          //今日の売上データが存在しない場合
          if(!doc.exists){
            docRef.get().then(querySnapshot=>{
              querySnapshot.forEach(snapshot=>{
                let key=Object.keys(snapshot.data())
                key.map((item)=>{
                  erdoc.set(
                    {
                      [snapshot.data()[item].name]: {
                        price: snapshot.data()[item].price,
                        num: 0
                      },
                      earn:0
                    },
                    { merge: true }
                  );
                })
              })
            })
          }
            setearn(doc.data().earn);
            console.log(earn)
            var name=Object.keys(doc.data())
            var val = 'earn';
            var index = name.indexOf(val);
            name.splice(index, 1)
            pro=name
            var tmp=[]
            let maxis=0;
            for(var i=0;i<name.length;i++){
              tmp[i]=
                  Object.assign({
                  name:pro[i],
                  num:doc.data()[name[i]]['num'],
                  price:doc.data()[name[i]]['price']
              })
              if(maxis<tmp[i].num){
                console.log(tmp[i].num)
                maxis=tmp[i].num
              } 
            }
            setmax(maxis)
            setdata(tmp)
            // setdata({...data,labels:pro,datasets:[{data:values}]})

            //今日の売上
            //日付指定日の売上
            //区間指定の売上
            //一週間の売上
            //一か月の売上
            //三か月の売上
            //半年の売上
            //一年間の売上
      })
      .catch((error)=>{
        console.log(error)
      })
    }

    const getWidth =()=> {
        const deviceWidth = Dimensions.get('window').width*0.9
        data.forEach(item => {
          /* React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View */
          if(item.num==0){
            item.width= deviceWidth-deviceWidth
          }else{
          item.width= (deviceWidth/max)*item.num
          }
        })    
        handle()
       }

    const handle=()=>{
        const timing = Animated.timing
        Animated.parallel(data.map(item => {
            item.anime=new Animated.Value(0)
            return timing( item.anime, {toValue: item.width,duration: 1000,useNativeDriver: false})
        })).start()
    }

    useEffect(()=>{
        getdata()
        },[date])
     getWidth()

    return (
        <View>
            <Header navigation={navigation} name="売上"/>
            <View style={styles.container}>
              <createCarender.Provider value={{date_item,getdate}}>
                <CarenderView/>
              </createCarender.Provider>
                <Text style={styles.totalamount}>総売上　{earn}</Text>
                {/* <Chart.Provider value={{data}}>
                    <CreateChart/>
                </Chart.Provider> */}
                <View>
                <FlatList
                    style={styled.chart}
                    data={data}  
                    // keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                        <Text style={styles.label}>{item.name}  {item.price}円</Text>
                        <Text style={styles.label}>{item.num*item.price}円</Text>
                        <View style={styles.data}>
                            <Animated.View style={[styles.bar, styles.points, {width:item.anime}]} />
                            <Text style={styles.dataNumber}>{item.num}</Text> 
                        </View>
                      </View>
                    )}
                ></FlatList>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginTop: 6,
      backgroundColor:'ivory'
    },
    totalamount:{
        fontSize:30,
        color:'black',
        alignSelf: 'center',
    },
    // Item
    item: {
      flexDirection: 'column',
      marginBottom: 2,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor:'white',
      //marginRadius: 5,
      borderRadius: 5,
      backgroundColor: '#053050',
      padding:5,
    },
    label: {
      color: '#CBCBCB',
      flex: 1,
      fontSize: 18,
      position: 'relative',
      top: 2,
      padding:5,
    },
    data: {
      flex: 2,
      flexDirection: 'row',
    },
    dataNumber: {
      color: 'white',
      fontSize: 11
    },
    // Bar
    bar: {
      alignSelf: 'center',
      borderRadius: 5,
      height: 14,
      marginRight: 5
    },
    points: {
      backgroundColor: '#F55443'
    },
    assists: {
      backgroundColor: '#FCBD24'
    },
    rebounds: {
      backgroundColor: '#59838B'
    },
    steals: {
      backgroundColor: '#4D98E4'
    },
    blocks: {
      backgroundColor: '#418E50'
    },
    turnovers: {
      backgroundColor: '#7B7FEC'
    },
    minutes: {
      backgroundColor: '#3ABAA4'
    },
    // controller
    controller: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15
    },
    button: {
      flex: 1,
      position: 'relative',
      top: -1
    },
    chevronLeft: {
      alignSelf: 'flex-end',
      height: 28,
      marginRight: 10,
      width: 28
    },
    chevronRight: {
      alignSelf: 'flex-start',
      height: 28,
      marginLeft: 10,
      width: 28
    },
    date: {
      color: '#6B7C96',
      flex: 1,
      fontSize: 22,
      fontWeight: '300',
      height: 28,
      textAlign: 'center'
    },
    datechange:{
      flexDirection: 'row',
      justifyContent: 'center',
    },
    Button:{
      flex: 1,
      position: 'relative',
      top: -1
    },
    chart:{
      flex:1
    }

  
  })
  
export default Earning
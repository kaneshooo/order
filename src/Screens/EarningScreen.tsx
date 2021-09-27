import React from "react";
import { useState ,useEffect, createContext} from "react";
import { firebase } from '@firebase/app'
import 'firebase/storage'; 
import 'firebase/firestore';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
  Button,
  Image,
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

export const Chart = createContext();
function Earning({navigation,route}){
    var pro=[]
    
    // const values=[]
    // const [data,setdata]=useState({labels:[] , 
    //           datasets:[{data:[]}]
    //         } )
    const [num,setnum]=useState(0)
    const [data,setdata]=useState([])
    const [earn,setearn]=useState(0) ;
    let user=route.params.user
    console.log(user)
    const getdata=async()=>{
        var db=firebase.firestore()
        const erdoc=db.collection('user').doc(user).collection('earn')

        await erdoc.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setearn(doc.data()['earn'])
                var name=Object.keys(doc.data())
                var val = 'earn';
                var index = name.indexOf(val);
                name.splice(index, 1)
                pro=name
                var tmp=[]
                for(var i=0;i<name.length;i++){
                    tmp[i]=
                        Object.assign({
                        name:pro[i],
                        num:doc.data()[name[i]]['num'],
                        price:doc.data()[name[i]]['price']
                    }) 
                }
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
            });
        });
    }

    const getWidth =()=> {
        const deviceWidth = Dimensions.get('window').width
        const maxWidth = deviceWidth
        data.forEach(item => {
          /* React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View */
          item.width= item.num
        
        })    
        handle()
       }
    const handle=()=>{
        const timing = Animated.timing
        Animated.parallel(data.map(item => {
            item.anime=new Animated.Value(0)
            return timing( item.anime, {toValue: item.width,duration: 1000})
        })).start()
    }

    useEffect(()=>{
        getdata()
        },[])
     getWidth()

    return (
        <View>
            <Header navigation={navigation} name="売上"/>
            <View style={styles.container}>
                <Text style={styles.totalamount}>総売上　{earn}</Text>
                {/* <Chart.Provider value={{data}}>
                    <CreateChart/>
                </Chart.Provider> */}
                <FlatList
                    style={styles.container}
                    data={data}  
                    // keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                        <Text style={styles.label}>{item.name}</Text>
                        <View style={styles.data}>
                            <Animated.View style={[styles.bar, styles.points, {width:item.anime}]} />
                            <Text style={styles.dataNumber}>{item.num}</Text> 
                        </View>
                      </View>
                    )}
                ></FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginTop: 6
    },
    totalamount:{
        fontSize:30,
        color:'black',

    },
    // Item
    item: {
      flexDirection: 'column',
      marginBottom: 5,
      paddingHorizontal: 10
    },
    label: {
      color: '#CBCBCB',
      flex: 1,
      fontSize: 12,
      position: 'relative',
      top: 2
    },
    data: {
      flex: 2,
      flexDirection: 'row'
    },
    dataNumber: {
      color: '#CBCBCB',
      fontSize: 11
    },
    // Bar
    bar: {
      alignSelf: 'center',
      borderRadius: 5,
      height: 8,
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
    }
  
  })
  
export default Earning
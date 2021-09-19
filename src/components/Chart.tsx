import React from "react";
import { useState ,useEffect,useContext} from "react";
import { firebase } from '@firebase/app'
import 'firebase/storage'; 
import 'firebase/firestore';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions
} from "react-native";
import  { 
    LineChart ,
    BarChart ,
    PieChart ,
    ProgressChart ,
    ContributionGraph ,
    StackedBarChart 
}  from  "react-native-chart-kit" ;
import {Chart} from "../Screens/EarningScreen";



const CreateChart=()=>{
    const data=useContext(Chart);
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: "black",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "black",
        backgroundGradientToOpacity: 0,
        fillShadowGradient: "gray",
        fillShadowGradientOpacity: 0.7,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 1,
      };
      
    return (
        <View>
            <BarChart
            data={data.data}
            width={screenWidth * 0.99}
            height={220}
            chartConfig={chartConfig}
            yAxisSuffix={"%"}
            fromZero={true}
            showValuesOnTopOfBars={true}
            verticalLabelRotation={180}
            />
        </View>
    )
}
export default CreateChart
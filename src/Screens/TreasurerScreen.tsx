import React from 'react';
import { StyleSheet,View,Text,Button,TouchableOpacity } from 'react-native';
import styles from "../components/style"

class TreasurerScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            rightNum:0,
            amount:0,
            result: 0,
            fee:100,
            mark: "?"
        }
    }

    onNum(input){
        this.setState({amount:this.state.amount+input['i']})
        this.setState({result:this.state.fee-(this.state.amount+input['i'])})
    }
    
    onReset(){
        this.setState({amount:0,rightNum:0,result:0,mark:'?'})
    }

    render(){
    return(
        <View >
            <View style={styles.countArea}>
                <Text style={styles.value}>{this.state.fee}-{this.state.amount}={this.state.result}</Text>
            </View>

            <View style={styles.buttonArea}>
            <View style={{flexDirection: 'row'}}>
              {ZeroToThree.map(i => (
                  <TouchableOpacity style={styles.topbutton,styles.buttonNum} key={i} onPress={() => this.onNum({i})}>
                    <Text style={styles.buttonText}> {i} </Text>
                  </TouchableOpacity>
              ))}
            </View> 

            <View style={{ flexDirection: 'row'}}>
              {FourToSix.map(i => (
                  <TouchableOpacity style={styles.topbutton, styles.buttonNum} key={i}  onPress={() => this.onNum({i})}> 
                    <Text style={styles.buttonText}> {i} </Text>
                  </TouchableOpacity>
              ))}
             </View>
            <View style={{ flexDirection: 'row'}}>
              {SevenToNine.map(i => (
                  <TouchableOpacity style={styles.topbutton, styles.buttonNum} key={i}  onPress={() => this.onNum({i})}> 
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
               <TouchableOpacity style={[styles.button, styles.buttonReset]} onPress={()=> this.onReset()} >
                 <Text style={[styles.buttonResetText]}>C</Text>
               </TouchableOpacity>
             </View>
           </View>
   
    );
};
};
let money1=[1,5,10,50,100,500,1000,3000,5000,10000];

    
const ZeroToThree=[];
    for(let i=0;i<3;i++){
        ZeroToThree[i]=money1[i]
};

const FourToSix = [];
for (let i = 4; i< 7; i++) {
    FourToSix[i] =money1[i]
};

const SevenToNine = [];
for (let i = 7; i< 10; i++) {
    SevenToNine[i] =money1[i]
};



export default TreasurerScreen;
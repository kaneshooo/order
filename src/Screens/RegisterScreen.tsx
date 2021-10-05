import React from "react";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
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
  Alert
} from "react-native";
import Header from "../components/Header";
import ErrorMessage from "../components/ErrorMessage";
import styled from "styled-components";

function DetailScreen(props) {
console.log(props)
let user=props.route.params.user
let routes=props.route.params.routes
const [image,setImage]=useState();
const [File,setFile]=useState();
const [name, onChangeText] = useState();
const [price, onChangePrice] = useState();
const [category, oncategory] = useState();

const db=async(Imurl)=>{

  let size,count=routes.length;
  var db=firebase.firestore();
  const col=db.collection("user").doc(user).collection("menu").doc(String(category));

  await col.get().then(snap=>{
   Imurl.getDownloadURL().then(function(URL){
   if (!snap.exists||length==0) {
    console.log('No such document!');
    size=1
    } else {
      let length=Object.keys(snap.data()).length
      size=length+1;    
    }
    col.set({
      [size]:{
      name:name,
      price:Number(price),
      url:URL,
      id:size,
      category: category
    }},{merge:true}).then(()=>{
      alert('保存できました');
      if(!routes.some((item)=>item.title==category)){
        routes.push(
          Object.assign({
            key: count,
            title: category
          })
        )
      }      
    }).catch((error)=>{
      console.log("failed");
    })    
    });
  })
}

//写真選択タスク
const _pickImage = async () => {
try{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    base64:true,
    aspect: [4, 3],
    quality: 1,
});
  //撮影された（ローカルの）写真を取得 
  const localUri = await fetch(result.uri);
  //blobを取得
  const localBlob = await localUri.blob();
if (!result.cancelled) {
    setFile(localBlob);
    setImage(result.uri)
}}catch(e){
    console.log(e);
    return false;
}};

//アップロードタスク
const approad=()=>{  
var mountainsref=firebase.storage().ref().child('images/'+name+'.jpg');
    mountainsref.put(File).then(function(snapshot){
    db(mountainsref);
    }).catch(function(error){
        console.log(error);
    }
);}

  return (
    <View style={styles.wrapper}>
      
      <Header navigation={props.navigation} name="アイテム登録" route={routes} user={user} value="Setting" checker={{name,price,category,image}}/>
      <TouchableOpacity
       onPress={()=>_pickImage()}>
      <Image style={styles.img} source={image ?{uri:image}:null } 
      />
      </TouchableOpacity>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangeText(text)}
        value={name}
        placeholder="*商品名"
        mode="outlined"
      />
      </View>
      <ErrorMessage name={name} typedText={name}/>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangePrice(text)}
        value={price}
        placeholder="*値段"
        mode="outlined"
      />
      </View>
      <ErrorMessage price={price} typedText={price}/>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={text=>oncategory(text)}
        value={category}
        placeholder="*カテゴリー"
        mode="outlined"
      />
      </View>
      <ErrorMessage category={category} typedText={category}/>
      <Button mode="contained" title="保存"  onPress={()=> {if(name!=''&&price!=''&&category!=''){approad()}else{alert('必要項目を入力してください')}}} type='file'/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15,

  },
  input: {
    color: '#000',
    paddingRight: 7,
    paddingLeft: 7,
    fontSize: 18,
    lineHeight: 25,
    width:350,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: "center"
  },
  img: {
    width: "50%",
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center"
  }
});

export default DetailScreen;

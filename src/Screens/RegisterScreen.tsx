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
  Image
} from "react-native";
import Header from "../components/Header";

function DetailScreen(props) {
console.log(props)
let user=props.route.params.user

const [image,setImage]=useState();
const [File,setFile]=useState();
const [name, onChangeText] = useState('');
const [price, onChangePrice] = useState();
const [category, oncategory] = useState('');
const db=async(Imurl)=>{
  let size;
    var db=firebase.firestore();
    const col=db.collection("user").doc(String(user)).collection("menu");
    await col.get().then(snap=>{
   Imurl.getDownloadURL().then(function(URL){
   if (!snap.exists) {
    console.log('No such document!');
    size=1
    } else {
      size=snap.size+1;    
  }

    col.doc(String(size)).set({
      name:name,
      price:Number(price),
      url:URL,
      id:size,
      category: category
    }).then(()=>{
      alert('保存できました');
      console.log('success');
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
      
      <Header navigation={props.navigation} name="アイテム登録" />
      <TouchableOpacity
       onPress={()=>_pickImage()}>
      <Image style={styles.img} source={image ?{uri:image}:null } 
      />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangeText(text)}
        value={name}
        placeholder="商品名"
        mode="outlined"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangePrice(text)}
        value={price}
        placeholder="値段"
        mode="outlined"
      />
      <TextInput
        style={styles.input}
        onChangeText={text=>oncategory(text)}
        value={category}
        placeholder="カテゴリー"
        mode="outlined"
      />
      <Button mode="contained" title="保存"  onPress={()=> approad()} type='file'/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 15
  },
  input: {
    fontSize: 30,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  img: {
    width: "50%",
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center"
  }
});

export default DetailScreen;

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

const item = props.route.params.item;
const [Url,setUrl]=useState('');
const [ready,setReady]=useState('false');
const [image,setImage]=useState();
const [File,setFile]=useState();
const [name, onChangeText] = React.useState(item.product_name);
const [price, onChangePrice] = React.useState(item.price);

const db=(props)=>{
    var db=firebase.firestore();console.log(name)
    props.getDownloadURL().then(function(URL){
    db.collection("users").doc("menu").collection(item.pagename).doc(String(item.number)).set({
      name:name,
      price:price,
      url:URL
    },{merge:false}).then((doc)=>{
      console.log('success');
    }).catch((error)=>{
      console.log("failed");
    })    
    }).catch(function(error){
        console.log(error);
    });
}

//写真選択タスク
const _pickImage = async (item) => {
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
    alert('保存できました');
    db(mountainsref);
    }).catch(function(error){
        console.log(error);
    }
);}

  return (
    <View style={styles.wrapper}>
      
      <Header navigation={props.navigation} name="アイテム編集" />
      <TouchableOpacity
       onPress={()=>_pickImage()}>
      <Image style={styles.img} source={image ?{uri:image}:null } />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangeText(text)}
        value={name}
        mode="outlined"
      />
      
      <TextInput
        style={styles.input}
        onChangePrice={text=>onChangePrice(text)}
        value={price}
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
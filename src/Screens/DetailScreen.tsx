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
import ErrorMessage from "../components/ErrorMessage";

function DetailScreen(props) {
  console.log(props)
  let item = props.route.params.item;
  let user = props.route.params.user;
  let routes = props.route.params.routes;
  let navigation=props.navigation
  const [image,setImage]=useState();
  const [File,setFile]=useState();
  const [name, onChangeText] = useState(item.name);
  const [price, onChangePrice] = useState(item.price);
  const [category, oncategory] = useState(item.category);
  let db=firebase.firestore();
  const colref=db.collection("user").doc(user).collection("menu")

  const dbget=async(Imurl)=>{
    let count=routes.length;
    let length;
    const col=db.collection("user").doc(user).collection("menu").doc(String(category))
    await col.get().then(snap=>{
      Imurl.getDownloadURL().then(function(URL){
        if(!snap.exists){
          length=1
        }else{
          length=(Object.keys(snap.data()).length)+1    
        }
      col.set({
        [length]:{
          name:name,
          price:Number(price),
          url:URL,
          category:category,
          id:length
        }
      },{merge:true}).then(()=>{
        alert('保存できました');
        if(!routes.some((item)=>item.title==category)){
          console.log
          routes.push(
            Object.assign({
              key: count,
              title: category
            })
          )
        }
        if(item.category!=category){
          db.collection("user").doc(user).collection("menu").doc(String(item.category)).update({
            [item.id]:firebase.firestore.FieldValue.delete()
          })
        }
      }).catch((error)=>{
        console.log(error);
      })    
      }).catch(function(error){
          console.log(error);
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
const uproad=()=>{  
var mountainsref=firebase.storage().ref().child('images/'+name+'.jpg');
    mountainsref.put(File).then(function(snapshot){
    dbget(mountainsref);
    }).catch(function(error){
        console.log(error);
    }
);}

const del=async()=>{
  const col=db.collection("user").doc(user).collection("menu").doc(String(category))
  await col.get().then((doc)=>{
    let str;
    str=Object.keys(doc.data()).length
    console.log(str)
    if(str==1){
      col.delete()
      .then(async()=>{
        let tmp=routes.findIndex(element=>element.title==category)
        routes.splice(tmp,1)
        console.log(routes)
         alert('削除できました')
      })
      let checker={name,price,category,image}
      navigation.navigate('Setting', { routes,checker ,user})
    }
    else{
      col.update({
        [item.id]:firebase.firestore.FieldValue.delete()
      })
      .then(async()=>{
        alert('削除できました')
      })
      let checker={name,price,category,image}
      navigation.navigate('Setting', { routes,checker ,user})
    }

  }).catch((error)=>{
    console.log(error)
  })
}

  return (
    <View style={styles.wrapper}>
      
      <Header navigation={navigation} name="アイテム編集" route={routes} user={user} value="Setting" checker={{name,price,image}}/>
      <TouchableOpacity
       onPress={()=>_pickImage()}>
      <Image style={styles.img} source={image ?{uri:image}:null } 
      />
      </TouchableOpacity>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangeText(text)}
        defaultValue={item.name}
        value={name}
        mode="outlined"
      />
      </View>
      <ErrorMessage name={name} typedText={name}/>
      <View>
      <TextInput
        style={styles.input}
        onChangeText={text=>onChangePrice(text)}
        defaultValue={item.price}
        value={price}
        mode="outlined"
      />
      </View>
      <ErrorMessage name={price} typedText={price}/>
      <View>
       <TextInput
        style={styles.input}
        onChangeText={text=>oncategory(text)}
        defaultValue={item.category}
        value={category}
        mode="outlined"
      />
      </View>
      <ErrorMessage name={category} typedText={category}/>
      <Button mode="contained" title="保存"  onPress={()=> uproad()} type='file'/>
      <Button mode="contained" title="削除"  onPress={()=> del()} type='file'/>
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

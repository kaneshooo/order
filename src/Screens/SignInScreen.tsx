import React, {useState} from 'react';
import {Button,View,Text,SafeAreaView,TextInput,Alert,KeyboardAvoidingView,StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { firebase } from "@firebase/app"
// import {useDispatch} from 'react-redux';
// import {signInAction} from '../redux/users/Action';
import {jpCheck,blankCheck,checkEmailFormat,} from '../util/index';
import ErrorMessage from '../components/ErrorMessage';
import "firebase/auth";
import Header from "../components/Header";
const deviceHeight = Dimensions.get('window').height
function SignInScreen({navigation}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [state,setState]=useState(false)
   // const dispatch = useDispatch();

    const signIn=(email,password)=>{
        const isJapanese=jpCheck(email)
        const isBlankEmail=blankCheck(email)
        const isBlankPassword=blankCheck(password)
        const isFormatAddress=checkEmailFormat(email)
        if(isJapanese|| isBlankPassword ||isBlankEmail||isFormatAddress){
            Alert.alert('入力に誤りがあります。正しく入力してください');
            return;
        }else{
            firebase.auth()
            .signInWithEmailAndPassword(email,password).then((user)=>{
                if(user){
                   // dispatch(signInAction({userEmail: email, userPassword: password}));
                   console.log(user.user.uid)
                   let name='Signin'
                   navigation.navigate("Home",{user,name})
                    
            }
            }).catch((error)=>{
                if(
                error.message===
                'There is no user record corresponding to this identifier. The user may have been deleted.'
                ){
                    Alert.alert('アカウントが見つかりません')
                }else{
                    Alert.alert('エラーです')
                }
            });
            }
    }
    
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView > 
        <View style={styles.header}>
          <Text style={styles.headerText}>サインイン</Text>
        </View>
        <View style={styles.wrap}>
          <View >
          <View >
            <TextInput
            style={styles.inputStyle}
              placeholder={'メールアドレス'}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>
          <ErrorMessage email={email} typedText={email} />
          <View >
            <TextInput
            style={styles.inputStyle}
              placeholder={'パスワード'}
              type={'password'}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <ErrorMessage password={password} typedText={password} />
        
          <View >
            <TouchableOpacity onPress={() => signIn(email, password)}  style={[styles.button, { backgroundColor: "#053050" }]}>
            <Text style={[styles.buttonSize, { color: "white" }]}>ログイン</Text>   
            </TouchableOpacity>
          </View>
          <View >
            <View >
              <Text style={styles.guide}>アカウントをお持ちでない方は下記よりご登録ください。</Text>
            </View>
          </View>
          <View>
            <Button
              title="新規登録はこちらから"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View> 
          </View>
        </View>
      </SafeAreaView>  
      </KeyboardAvoidingView>
    );
}
const styles=StyleSheet.create({
  wrap: {
    height:deviceHeight-110,
    padding: 1,
    backgroundColor:'linen',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "ivory",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",

  },
  Text: {
     fontSize: 18,
     marginTop: 5,
     color: "#73899d"
   },
   inputStyle: {
 
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
 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    height: 60,
    backgroundColor:"#053050"
  },

  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  },
  guide:{
    fontSize:17,
    fontWeight: "600",
    color: "#053050",
    alignItems: "center",
    justifyContent: "center",
    
  },
  buttonSize: {
    fontSize: 30,
    fontWeight: "500"
  },
  button: {
    fontSize: 30,
    width: 350,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
})
export default SignInScreen;
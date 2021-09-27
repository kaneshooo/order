import React, {useState} from 'react';
import {Button,View,Text,SafeAreaView,TextInput,Alert,} from 'react-native';
import { firebase } from "@firebase/app";
// import {useDispatch} from 'react-redux';
// import {signInAction} from '../redux/users/Action';
import {jpCheck,blankCheck,checkEmailFormat,} from '../util/index';
import ErrorMessage from '../components/ErrorMessage';
import "firebase/auth";
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
                   navigation.navigate("Home",{user})
                    
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
        <SafeAreaView>
        <View>
          <Text>サインイン</Text>
        </View>
        <View>
          <View >
            <TextInput
              placeholder={'メールアドレス'}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>
          <ErrorMessage email={email} typedText={email} />
          <View >
            <TextInput
              placeholder={'パスワード'}
              type={'password'}
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <ErrorMessage password={password} typedText={password} />
          <View >
            <Button title="サインイン" onPress={() => signIn(email, password)} />
          </View>
          <View >
            <View >
              <Text>アカウントをお持ちでない方は下記よりご登録ください。</Text>
            </View>
          </View>
          <View>
            <Button
              title="新規登録はこちらから"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </SafeAreaView>  
    );
}

export default SignInScreen;
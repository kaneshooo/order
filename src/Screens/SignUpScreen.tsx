import React, { useState } from "react";
import { Button, View, Text, SafeAreaView,Dimensions, StyleSheet, TextInput, Alert ,KeyboardAvoidingView,TouchableOpacity } from "react-native";
import { firebase } from "@firebase/app";
// import { useDispatch } from "react-redux"
// import { signInAction } from '../redux/users/Action';
import { jpCheck, blankCheck, checkEmailFormat } from "../util/index"
import ErrorMessage from "../components/ErrorMessage"
import "firebase/auth";
import 'firebase/firestore';
const deviceHeight = Dimensions.get('window').height
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
//   const dispatch = useDispatch();

  const signUp = (email, password, confirmPassword) => {
    const isJapanese = jpCheck(email)
    const isBlankEmail = blankCheck(email)
    const isBlankPassword = blankCheck(password)
    const isBlankConfirmPassword = blankCheck(confirmPassword)
    const isFormatAddress = checkEmailFormat(email)
    const isMatchPassword = password !== confirmPassword
    if (isJapanese || isBlankEmail || isBlankPassword || isFormatAddress || isBlankConfirmPassword || !isMatchPassword) {
      Alert.alert('入力に誤りがあります。正しく入力してください')
      return
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
             
            if (user) {
              Alert.alert("アカウントの登録が完了しました")
                //dispatch(signInAction({ userEmail: email, userPassword: password }));

                return
            }
          })
          .catch(error => {
            if (error.message === "The email address is already in use by another account.") {
                Alert.alert("すでに登録されているメールアドレスです。")
            } else if (error.message === "Password should be at least 6 characters") {
                Alert.alert("パスワードは6文字以上で登録してください。")
            } else {
                Alert.alert("エラーです。異る入力内容でもう一度お試しください")
                  console.log(error.message);
            }
         })
      }
   }
  return (
   <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    <SafeAreaView >
    <View style={styles.header}>
          <Text style={styles.headerText}>アカウント登録</Text>
        </View>
        <View style={styles.wrap}>
           <View>
              <TextInput
              style={styles.inputStyle}
                 placeholder="メールアドレス"
                 autoCapitalize='none'
                 onChangeText={setEmail}
              />
           </View>
           <ErrorMessage email={email} typedText={email} />
           <View>
              <TextInput
              style={styles.inputStyle}
                 placeholder="パスワード"
                 type="password"
                 secureTextEntry={true}
                 onChangeText={setPassword}
              />
           </View>
           <ErrorMessage password={password} typedText={password} />
           <View>
              <TextInput
              style={styles.inputStyle}
                 placeholder="確認用パスワード"
                 type="confirmPassword"
                 secureTextEntry={true}
                 onChangeText={setConfirmPassword}
              />
           </View>
           <ErrorMessage password={password} confirmPassword={confirmPassword} typedText={confirmPassword} />
           <View >
            <TouchableOpacity onPress={() => signUp(email, password)}  style={[styles.button, { backgroundColor: "#053050" }]}>
            <Text style={[styles.buttonSize, { color: "white" }]}>登録</Text>   
            </TouchableOpacity>
          </View>
                <View style={styles.Text}>
                   <View>
                      <Text>・全ての項目を入力してください。</Text>
                   </View>
                <View>
                   <Text>・メールアドレスは[@]があり、[@]後に1つ以上の[.]が</Text>
                </View>
                <View>
                   <Text>   なければ登録できません。</Text>
                </View>
                <View>
                   <Text>・赤文字が出力されている状態では登録できません。</Text>
                </View>
                <View>
                   <Text>・パスワードは6文字以上で入力してください。</Text>
                </View>
                </View>
            <View>
                <Button
                   title="サインイン画面へ戻る"
                   onPress={() => navigation.navigate("SignIn")}
                />
            </View>
         </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
   )
}

const styles=StyleSheet.create({
   wrap: {
   height:deviceHeight-100,
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
export default SignUpScreen
import React, { useState } from "react";
import { Button, View, Text, SafeAreaView, StyleSheet, TextInput, Alert } from "react-native";
import { firebase } from "@firebase/app";
// import { useDispatch } from "react-redux"
// import { signInAction } from '../redux/users/Action';
import { jpCheck, blankCheck, checkEmailFormat } from "../util/index"
import ErrorMessage from "../components/ErrorMessage"
import "firebase/auth";
import 'firebase/firestore';
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
    <SafeAreaView>
        <View>
           <Text style={{ fontSize: 20 }}>アカウント登録</Text>
        </View>
        <View>
           <View>
              <TextInput
                 placeholder="メールアドレス"
                 autoCapitalize='none'
                 onChangeText={setEmail}
              />
           </View>
           <ErrorMessage email={email} typedText={email} />
           <View>
              <TextInput
                 placeholder="パスワード"
                 type="password"
                 secureTextEntry={true}
                 onChangeText={setPassword}
              />
           </View>
           <ErrorMessage password={password} typedText={password} />
           <View>
              <TextInput
                 placeholder="確認用パスワード"
                 type="confirmPassword"
                 secureTextEntry={true}
                 onChangeText={setConfirmPassword}
              />
           </View>
           <ErrorMessage password={password} confirmPassword={confirmPassword} typedText={confirmPassword} />
             <View>
                <Button
                   title="送信"
                   onPress={() => signUp(email, password)}
                />
            </View>
                <View>
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
   )
}
export default SignUpScreen
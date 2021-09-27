import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {jpCheck, blankCheck, checkEmailFormat,} from '../util/index';

const ErrorMessage = ({ email, password, confirmPassword, typedText }) => {
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    useEffect(() => {
        const isJapanese = jpCheck(email);
        const isBlankEmail = blankCheck(email);
        const isFormatEmail = checkEmailFormat(email);
        if (isJapanese) {
            setEmailErrorMessage('日本語は含めずに入力してください');
        } else if (isBlankEmail) {
            setEmailErrorMessage('必須項目です。入力してください');
        } else if (isFormatEmail) {
            setEmailErrorMessage('正しいメールアドレス形式で入力してください');
        } else {
            setEmailErrorMessage('');
        }
    }, [email])

    useEffect(() => {
        const isBlankPassword = blankCheck(password);
        if (isBlankPassword) {
            setPasswordErrorMessage('必須項目です。入力してください');
        } else {
            setPasswordErrorMessage('');
        }
    }, [password]);

    // useEffect(() => {
    //     const isBlankPassword = blankCheckConfirmPassword(confirmPassword);
    //     if (isBlankPassword) {
    //         setConfirmPasswordErrorMessage('必須項目です。入力してください');
    //     } else if (password !== confirmPassword) {
    //         setConfirmPasswordErrorMessage('パスワードが一致しません')
    //     } else {
    //         setConfirmPasswordErrorMessage('');
    //     }
    // }, [confirmPassword]);


    if (typedText === password) {
        return (
            <View>
                <Text style={styles.text}>
                    {passwordErrorMessage}
                </Text>
            </View>
        )
    } else if (typedText === email) {
        return (
            <View>
                <Text style={styles.text}>
                    {emailErrorMessage}
                </Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={styles.text}>
                    {confirmPasswordErrorMessage}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      color: "#053050",
      fontWeight: "700",
      fontSize: 70,
      marginBottom: 80,
      padding: 30
    },
    button: {
      fontSize: 30,
      width: 300,
      height: 55,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      margin: 10
    },
    buttonSize: {
      fontSize: 30,
      fontWeight: "500"
    }
  });
  
export default ErrorMessage
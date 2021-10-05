import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {jpCheck, blankCheck, checkEmailFormat,blankCheckConfirmPassword} from '../util/index';

const ErrorMessage = ({ email, password, confirmPassword, typedText ,name,category,price}) => {
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

    useEffect(() => {
        const isBlankPassword = blankCheck(name);
        if (isBlankPassword) {
            setPasswordErrorMessage('必須項目です。入力してください');
        } else {
            setPasswordErrorMessage('');
        }
    }, [name]);

    useEffect(() => {
        const isBlankPassword = blankCheck(price);
        if (isBlankPassword) {
            setPasswordErrorMessage('必須項目です。入力してください');
        } else {
            setPasswordErrorMessage('');
        }
    }, [price]);

    useEffect(() => {
        const isBlankPassword = blankCheck(category);
        if (isBlankPassword) {
            setPasswordErrorMessage('必須項目です。入力してください');
        } else {
            setPasswordErrorMessage('');
        }
    }, [category]);

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


    if (typedText === password||typedText === name||typedText === category||typedText === price) {
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
      fontSize: 28,
      marginBottom: 20,
      padding: 10
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
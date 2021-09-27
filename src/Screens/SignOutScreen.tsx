import React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import { useDispatch } from "react-redux"
// import { signOutAction } from '../redux/users/Action';

function SignOutScreen({navigation}) {
   // const dispatch = useDispatch()
    const submitSignOut = () => {
        //dispatch(signOutAction())
        return
    }
    return (
        <SafeAreaView>
            <View>
                <Text>Sign Out</Text>
                <View>
                    <Button
                        title='サインアウトする'
                        onPress={submitSignOut}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignOutScreen
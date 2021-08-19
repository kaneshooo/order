import React from "react";
import { Text, View,Button } from "react-native";

function LogScreen({navigation}) {
  console.log(navigation)
  return (
    <View >
            <Text>Treasurer</Text>
            <Button 
                title="会計"
                onPress={()=>{
                    navigation.navigate('Treasurer');
                }}
                />
        </View>
  )
}
export default LogScreen;

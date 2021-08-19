import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";



export default function Footer ()  {

  return(
    <View>
      <View>
        <Button title="提供完了"
                onPress={()=>{
                navigation.navigate('Treasurer');
                }}
                  />
        <View>
          <Button title="販売終了"
                  onPress={()=>{
                  navigation.navigate('Home');
                  }}
                  />
        </View>
        <Button title="会計"
                onPress={()=>{
                navigation.navigate('Treasurer');
         }}
          />
      </View>
    </View>
  );
};


//export default Footer;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import OrderScreen from "./Screens/OrderScreen";
import SettingScreen from "./Screens/SettingScreen";
import DetailScreen from "./Screens/DetailScreen";
import LogScreen from "./Screens/LogScreen";
import TreasurerScreen from "./Screens/TreasurerScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import './firebase';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Log" component={LogScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Treasurer" component={TreasurerScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;

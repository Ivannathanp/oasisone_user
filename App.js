import React from 'react';
import { Button, Image, StyleSheet, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Tabs from "./src/navigation/BottomTab";
import Order from "./src/screens/OrderScreen";
import { Tab } from 'react-native-elements/dist/tab/Tab';
import AppContext from "./src/AppContext";
import Restaurant from "./src/screens/RestaurantScreen";
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic,
} from '@expo-google-fonts/nunito-sans';
import AppLoading from 'expo-app-loading';
import BasketScreen from './src/screens/BasketScreen';
import CallWaiter from './src/screens/CallWaiterScreen';
import OrderPlaced from './src/screens/OrderPlacedScreen';

import HomeScreen from './src/screens/HomeScreen';

export default function App() {

  let [fontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Stack = createStackNavigator();

  return (
    <View style={styles.center}>
       <View style={styles.container}>
          <NavigationContainer>
          <Stack.Navigator screenOptions={
            {headerShown: false}
          }>
            
          {/* <Stack.Screen name="Home" component={Tabs}/>
          <Stack.Screen name="Restaurant" component={Restaurant}/>
          <Stack.Screen name="Basket" component={BasketScreen}/>
          <Stack.Screen name="OrderPlaced" component={OrderPlaced}/> */}
          <Stack.Screen name="CallWaiter" component={CallWaiter}/>
   
            </Stack.Navigator>
              
          </NavigationContainer>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: '#000'},
  center: {flex: 1, width:'auto' }
});


import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/OrderScreen";
import BasketScreen from "../screens/BasketScreen";
import PaymentMethod from "../screens/PaymentMethodScreen";

function OrderStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={
      {headerShown: false}
    }>
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
}

function BottomTab() {

  const Tab = createBottomTabNavigator();
  const Home = require("../icons/Menu1.png");
  const Cart = require("../icons/Menu2.png");
  const Order = require("../icons/Menu3.png");

  return (
    <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
        screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          elevation: 1,
          borderRadius: 200,
          height: 60,
          width: 250,
          backgroundColor: '#ffff',
          justifyContent: 'center',
          alignContent: 'center',
          margin: 'auto',
          overflow: 'hidden',
          borderStyle: 'none',
          borderWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex:1,
                height: hp('100%'),
              }}
            >
              <Image
                 source={Home}
                  style={{
                  resizeMode: 'center',
                  width: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignItems:"center",
                  alignContent: 'center',
                  tintColor: focused ? "#fff" : "#D0D0D0",
                  backgroundColor: focused ? "#E52C32" : "",
                  padding: 20,
                  borderRadius: 50
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={BasketScreen}
        options={{
          headerShown: false,
          tabBarBadge: 5 ,    
          tabBarStyle: { display: "none" },   
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex:1,
                height: hp('100%'),
              }}
            >
              <Image
                 source={Cart}
                  style={{
                  resizeMode: 'center',
                  width: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignItems:"center",
                  alignContent: 'center',
                  tintColor: focused ? "#fff" : "#D0D0D0",
                  backgroundColor: focused ? "#E52C32" : "",
                  padding: 20,
                  borderRadius: 50
                }}
              />
              

        
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={PaymentMethod}
        options={{
          headerShown: false,
          
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex:1,
                height: hp('100%'),
              }}
            >
              <Image
                 source={Order}
                  style={{
                  resizeMode: 'center',
                  width: 27,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignItems:"center",
                  alignContent: 'center',
                  tintColor: focused ? "#fff" : "#D0D0D0",
                  backgroundColor: focused ? "#E52C32" : "",
                  padding: 20,
                  borderRadius: 50
                }}
              />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  );
}

export default BottomTab;

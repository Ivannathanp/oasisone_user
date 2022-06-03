import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import NumberFormat from "react-number-format";
import { COLORS, FONTS } from "../constants/theme";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../form/FormLib";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useOutlineSelectStyles } from "../select/index";

function OrderPlacedScreen({ navigation, route }) {
const Home = require("../icons/Menu1.png");
const orderplaced = require("../icons/OrderPlaced.png");

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerbutton}
          onPress={() => navigation.goBack()}
          disabled={true}
        >  
          <Text style={styles.heading}></Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={styles.orderbutton}>
        <Pressable
          style={styles.cartbutton}
        //   onPress={() =>
        //     navigation.navigate("OrderPlaced")}
        
        >
            <Image
                 source={Home}
                  style={{
                  resizeMode: 'center',
                  width:27,
                  height:19,
                  fontSize:24,
                  marginTop:'-1%',
                  marginRight:'2%',
                  color:'#fff',
                }}
              />
          <Text style={styles.orderbuttontext}>
            Check Order Status
            
            
           
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
      
    <View style={styles.outercontainer}>
      <View style={styles.innercontainer}>
        {renderHeader()}

        <View style={styles.backgroundoverlay}></View>
        <View style={styles.emptycontainer}>
<View style={styles.centered}>
        <Image
                source={orderplaced}
                style={styles.cartemptyicon}
                resizeMode="contain"
              />

          <Text style={styles.orderlabel}>Order Placed Successfully.</Text>
          <View style={styles.center} >
          <Text style={styles.orderlabel}>Your Order No is:</Text>
          <Text style={styles.odernumber}>ODR - 1629840579</Text>
          </View>
          </View>
          {renderButton()}
        </View>
      </View>
    </View>
  );
}

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  outercontainer: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#424242",
    height: ScreenHeight,
  },
  innercontainer: {
    margin: "auto",
    width: "414px",
    backgroundColor: "#DF3030",
    height: ScreenHeight,
  },
  header: {
    height: hp("4%"),
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  headerbutton: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
    justifyContent: "center",
  },
  orderbutton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    elevation: 2,
  },
  cartbutton: {
    position: "absolute",
    bottom: 20,
    elevation: 1,
    borderRadius: 200,
    height: 60,
    width: "373px",
    backgroundColor: "#E52C32",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "none",
    margin: "auto",
    borderWidth: 0,
    flexDirection: "row",
  },
  orderbuttontext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
  },
  backgroundoverlay: {
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 20,
    width: "100%",
  },
  emptycontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAF4",
    height: ScreenHeight,
  },
  centered:{
      flex:5,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  center:{
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop:'20%'
  },
  cartemptyicon: {
  
    width: 185,
    height: 185,
    marginBottom: "10%",
  },
  orderlabel: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#424242",
    justifyContent: "center",
  },
  odernumber:{
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FF7B01",
    justifyContent: "center",
  }
});

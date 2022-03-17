import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { FONTS } from "../constants/theme";
import NumberFormat from "react-number-format";
import Random from "../randommenu/random";
import Recommended from "../Recommended/Scrollable";
import Promo from "../Promo/Scrollable";
import Modal from "react-native-modal";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../paymentform/FormLib";

function PaymentMethodScreen({ navigation, route }) {
  const cashier = require("../icons/OfflinePayment.svg");
  const cashieractive = require("../icons/OfflinePaymentActive.svg");

  const online = require("../icons/OnlinePayment.svg");
  const onlineactive = require("../icons/OnlinePaymentActive.svg");

  const [paymentmethod, setPaymentMethod] = useState(false);
  function handlepaymentmethod() {
    if (paymentmethod) {
      setPaymentMethod(false);
    } else {
      setPaymentMethod(true);
    }
  }

  const ovo = require("../icons/Ovo.svg");
  const [ovodropdown, setovoDropDown] = useState(false);
  const [ovonumber, setovoNumber] = useState();
  function handleovodropdown() {
    if (ovodropdown) {
      setovoDropDown(false);
    } else {
      setovoDropDown(true);
    }
  }

  const dana = require("../icons/Dana.svg");
  const [danadropdown, setdanaDropDown] = useState(false);
  const [dananumber, setdananumber] = useState();
  function handledanadropdown() {
    if (danadropdown) {
      setdanaDropDown(false);
    } else {
      setdanaDropDown(true);
    }
  }

  const shoppee = require("../icons/Shoppee.svg");
  const [shoppeedropdown, setshoppeeDropDown] = useState(false);
  const [shoppeenumber, setshopeenumber] = useState();
  function handleshoppeedropdown() {
    if (shoppeedropdown) {
      setshoppeeDropDown(false);
    } else {
      setshoppeeDropDown(true);
    }
  }

  const [billnotif, setBillNotif] = useState(false);
  function handlenotification() {
    if (billnotif) {
      setBillNotif(false);
    } else {
      setBillNotif(true);
    }
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerbutton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={19}
            color="white"
            style={{ marginTop: "-1%" }}
          />
          <Text style={styles.heading}>Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.outercontainer}>
      <View style={styles.innercontainer}>
        {renderHeader()}

        <View style={styles.backgroundoverlay}></View>
        {/*Landing Page*/}
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ backgroundColor: "#FFFAF4", paddingBottom: "20%" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.paymentinnercontainer}>
                <View>
                  <Text style={styles.title}>Payment Method</Text>
                </View>
                <View style={billnotif ? styles.notification : styles.hidden}>
                  <View style={styles.notificationtextcontainer}>
                    <Text style={styles.notificationtext}>
                      Calling waiter...
                    </Text>
                  </View>

                  <View style={styles.notificationclose}>
                    <Pressable
                      style={styles.notifclosebutton}
                      onPress={handlenotification}
                    >
                      <AntDesign name="closecircleo" size={16} color="white" />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.paymentbuttoncontainer}>
                  <View
                    style={
                      paymentmethod ? styles.cashieractive : styles.cashier
                    }
                  >
                    <Pressable
                      style={styles.cashierbutton}
                      onPress={() => handlepaymentmethod()}
                    >
                      <Image
                        source={paymentmethod ? cashieractive : cashier}
                        style={{ flex: 1, width: 41, height: 43 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={paymentmethod ? styles.active : styles.deactive}
                      >
                        Pay at Cahier
                      </Text>
                    </Pressable>
                  </View>

                  <View
                    style={paymentmethod ? styles.online : styles.onlineactive}
                  >
                    <Pressable
                      style={styles.onlinebutton}
                      onPress={() => handlepaymentmethod()}
                    >
                      <Image
                        source={paymentmethod ? online : onlineactive}
                        style={{ flex: 1, width: 41, height: 49 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={paymentmethod ? styles.deactive : styles.active}
                      >
                        Online Payment
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={styles.completepaymentmethod}>
                <View>
                  <Text style={styles.title}>Complete the Payment</Text>
                </View>

                <View>
                  <Formik>
                    <Form>
                      <View
                        style={ovodropdown? styles.fullbox : styles.minibox }
                      >
                        <View style={styles.boxrow}>
                          <Image
                            source={ovo}
                            style={{ width: 44, height: 20 }}
                            resizeMode="contain"
                          />

                          <Text style={styles.paymenttext}>Ovo</Text>
                          <Pressable style={styles.downiconcontainer} onPress={()=>handleovodropdown()}>
                          <Entypo
                            name="chevron-down"
                            size={24}
                            color="black"
                            style={styles.downicon}
                          /></Pressable>
                        </View>

                        {ovodropdown ? (
                          <>
                          <View>
                            <Text style={styles.boxparagraph}>
                              Please enter the phone number registered in Ovo.
                              Billing will be sent to the phone number you
                              entered.
                            </Text>
                          </View>
                        

                        <View style={styles.boxrow2}>
                          <Ionicons
                            name="phone-portrait-sharp"
                            size={24}
                            color="black"
                            style={styles.phoneicon}
                          />

                          <TextField
                            name="phonenumber"
                            type="text"
                            onChange={(e) => setovoNumber(e.target.value)}
                            placeholder="Phone Number"
                          />   
                        </View>
                      <View style={{marginBottom: '3%', width: 364, justifyContent:'flex-end'}}>
                        <Pressable style={styles.paybutton}>Pay Rp.110,000</Pressable>
                      </View>
                        
                        </>) : null}
                     
                      </View>
                    </Form>
                  </Formik>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default PaymentMethodScreen;

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
  backgroundoverlay: {
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFAF4",
  },
  paymentbuttoncontainer: {
    flexDirection: "row",
    marginTop: "3%",
    marginBottom: "5%",
  },
  cashier: {
    width: 150,
    height: 96,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#c4c4c4",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cashieractive: {
    width: 150,
    height: 96,
    backgroundColor: "#FFE4E5",
    borderWidth: 2,
    borderColor: "#E52C32",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  online: {
    width: 150,
    height: 96,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#c4c4c4",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: "3%",
  },
  onlineactive: {
    width: 150,
    height: 96,
    backgroundColor: "#FFE4E5",
    borderWidth: 2,
    borderColor: "#E52C32",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: "3%",
  },
  cashierbutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  onlinebutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  active: {
    marginTop: "6%",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#424242",
  },
  deactive: {
    marginTop: "6%",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#808080",
  },

  paymentinnercontainer: {
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
    position: "relative",
    marginTop: "2%",
  },
  completepaymentmethod: {
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "10%",
    position: "relative",
    marginTop: "2%",
  },
  fullbox: {
    width: 364,
    height: 211,
    borderRadius: 15,
    marginTop:'3%',
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "#DF3030",
    borderWidth: 1,
  },
  minibox: {
    width: 364,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop:'3%',
    borderColor: "#c4c4c4",
    borderWidth: 1,
  },
  boxrow: {
    flex:1,
    width:'100%',
    height:'100%',
    flexDirection: "row",
    justifyContent:'flex-start',
    paddingTop: 15,
    paddingLeft:15,
    paddingRight:15
  },
  paymenttext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#46445C",
    marginLeft:'8%',
  },
  downiconcontainer:{
    marginTop:'-1%',
    position:'absolute',
    right:10,
  },
  downicon: {

    position:'absolute',
    right:10,
    color: '#df3030'
  },
  boxparagraph: {
    paddingLeft:15,
    paddingRight:15,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 300,
    fontSize: 13,
    lineHeight: 17,
    color:'#424242'
  },
  boxrow2:{
flex:1,
flexDirection:'row',
alignItems:'center',
justifyContent:'flex-start',

  },
  paybutton:{
width:145,
height:34,
backgroundColor:'#df3030',
borderRadius:100,
fontFamily: "Nunito Sans, sans-serif",
fontWeight: 600,
fontSize: 14,
lineHeight: 28,
color:'#fff',
justifyContent:'center',
alignItems:'center'
  },
  phoneicon: {
    color:'#838FA6'
  },
  ordercompletedcontainer: {
    marginTop: "3%",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
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
  title: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#424242",
  },
  note: {
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  ordernone: {
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
    color: "#C4C4C4",
    width: 186,
  },

  notification: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    zIndex: 2,
    top: -10,
    right: 10,
    width: 173,
    height: 42,
    backgroundColor: "#219D36",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
  },
  hidden: {
    display: "none",
  },
  notificationtextcontainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: "5%",
  },
  notificationtext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#fff",
  },
  notificationclose: {
    marginTop: "4%",
    marginLeft: "6%",
  },
  notifclosebutton: {},
  modal: {
    backgroundColor: "#fff",
    minWidth: 374,
    height: 296,
    border: "1px solid #e6e6e6",
    justifyContent: "center",
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: 10,
  },
  closemodalbuttoncontainer: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  closemodalbutton: {
    position: "absolute",
    width: 12,
    height: 12,
    top: -15,
    right: 0,
  },
  closeicon: {
    position: "absolute",
    top: -4,
    right: -4,
    color: "#df3030",
  },
  currentordercontainer: {
    width: 374,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: "2%",
    marginBottom: "4%",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    paddingBottom: "4%",
    borderBottomColor: "#e52c32",
    borderBottomWidth: 0.5,
  },
  pending: {
    width: 105,
    height: 33,
    backgroundColor: "#FFA800",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  served: {
    width: 105,
    height: 33,
    backgroundColor: "#4678BC",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  callwaiter: {
    width: 139,
    height: 33,
    borderColor: "#e52c32",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#E52C32",
    justifyContent: "center",
    alignItems: "center",
  },
  waiterbutton: {},
  row2: {
    paddingTop: "2%",
    paddingBottom: "3%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#c4c4c4",
    marginBottom: "2%",
  },
  orderid: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#FF7B01",
    marginBottom: "1%",
  },
  ordertext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#424242",
    marginBottom: "1%",
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
  },

  text1: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#424242",
  },
  text2: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#424242",
    marginLeft: "2%",
  },
  menurighttext: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  text3: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#424242",
    marginLeft: "2%",
  },
  row4: {
    borderTopColor: "#c4c4c4",
    marginTop: "2%",
    paddingTop: "2%",
    borderTopWidth: 0.5,
    flexDirection: "column",
  },
  row5: {
    borderTopColor: "#c4c4c4",
    borderTopWidth: 0.5,
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paybuttoncontainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: "8%",
    marginBottom: "4%",
  },
  paymentbutton: {
    width: 183,
    height: 41,
    borderRadius: 100,
    backgroundColor: "#c4c4c4",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  completedordercontainer: {
    width: 374,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: "2%",
    marginBottom: "4%",
    padding: 15,
  },
  crow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    marginBottom: "2%",
  },
  cleft: {},
  corderid: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#1DC250",
    marginBottom: "1%",
  },
  cright: {
    justifyContent: "center",
  },
  viewdetail: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#e52c32",
  },
});

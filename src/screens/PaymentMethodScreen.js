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

  const [paymentmethod, setPaymentMethod] = useState(true);
  function handlepaymentmethod() {
    if (paymentmethod) {
      setPaymentMethod(false);
    } else {
      setPaymentMethod(true);
    }
  }

  const ovo = require("../icons/Ovo.png");
  const [ovodropdown, setovoDropDown] = useState(false);
  const [ovonumber, setovoNumber] = useState();
  function handleovodropdown() {
    if (ovodropdown) {
      setovoDropDown(false);
    } else {
      setovoDropDown(true);
      setdanaDropDown(false);
      setshopeeDropDown(false);
    }
  }

  const dana = require("../icons/Dana.png");
  const [danadropdown, setdanaDropDown] = useState(false);
  const [dananumber, setdananumber] = useState();
  function handledanadropdown() {
    if (danadropdown) {
      setdanaDropDown(false);
    } else {
      setdanaDropDown(true);
      setovoDropDown(false);
      setshopeeDropDown(false);
    }
  }

  const shopee = require("../icons/Shopee.png");
  const [shopeedropdown, setshopeeDropDown] = useState(false);
  const [shopeenumber, setshopeenumber] = useState();
  function handleshopeedropdown() {
    if (shopeedropdown) {
      setshopeeDropDown(false);
    } else {
      setshopeeDropDown(true);
      setdanaDropDown(false);
      setovoDropDown(false);
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

  const [callforbill, setCallForBill] = useState(false);
  function handlecallforbill() {
    setCallForBill(true);
    setBillNotif(true);
  }

  const paymenticon = require("../icons/OrderPlaced.png");
  const [paymentsuccess, setPaymentSuccess] = useState(false);

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
       
          
{paymentsuccess? 
  <View style={styles.emptycontainer}>
<View style={styles.centered}>
        <Image
                source={paymenticon}
                style={styles.paymenticon}
                resizeMode="contain"
              />

          <Text style={styles.paymentlabel}>Payment Successfully.</Text>
         
          <Pressable style={styles.homepagebutton} onPress={() =>
           navigation.navigate("Home")}>
           <Text style={styles.buttontext}>Back to Homepage</Text> 
          </Pressable>
       
          </View>
        
        
</View>:
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
                      Generating Bill...
                    </Text>

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
                      disabled={callforbill ? true : false}
                    >
                      <Image
                        source={paymentmethod ? cashieractive : cashier}
                        style={{ flex: 1, width: 41, height: 43 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={paymentmethod ? styles.active : styles.deactive}
                      >
                        Pay at Cashier
                      </Text>
                    </Pressable>
                  </View>

                  <View
                    style={paymentmethod ? styles.online : styles.onlineactive}
                  >
                    <Pressable
                      style={styles.onlinebutton}
                      onPress={() => handlepaymentmethod()}
                      disabled={callforbill ? true : false}
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
                {paymentmethod ? (
                  <View>
                    <View style={styles.textfullbox}>
                      <View style={styles.textinnerbox}>
                        <Text>
                          Payment at cashier we accept payments via{" "}
                          <span style={{ fontWeight: 700 }}> cash</span> or by{" "}
                          <span style={{ fontWeight: 700 }}> card</span> ( Debit
                          or Credit card ).
                        </Text>
                        <Text style={styles.cashiertext}>
                          To make a payment, press the button below to ask our
                          staff for a bill, after this you will only be able to
                          make payments at the cashier
                        </Text>
                      </View>

                      <View style={{ marginTop: "5%", alignItems: "center" }}>
                        <Pressable
                          style={
                            callforbill
                              ? styles.cashierpaymentbuttonactive
                              : styles.cashierpaymentbutton
                          }
                          onPress={handlecallforbill}
                          disabled={callforbill ? true : false}
                        >
                          <Text style={styles.buttontext}>{callforbill ? "Waiting for Bills" : "Call for Bill"}</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Formik>
                      <Form>
                        <View
                          style={ovodropdown ? styles.fullbox : styles.minibox}
                        >
                          <View style={styles.innerbox}>
                            <View style={styles.boxrow}>
                              <Pressable
                                style={styles.downiconcontainer}
                                onPress={() => handleovodropdown()}
                              >
                                <Image
                                  source={ovo}
                                  style={{ width: 44, height: 20 }}
                                  resizeMode="contain"
                                />

                                <Text style={styles.paymenttext}>Ovo</Text>

                                <Entypo
                                  name={
                                    ovodropdown ? "chevron-up" : "chevron-down"
                                  }
                                  size={24}
                                  color="black"
                                  style={styles.downicon}
                                />
                              </Pressable>
                            </View>

                            {ovodropdown ? (
                              <>
                                <View style={styles.boxparagraphcontainer}>
                                  <Text style={styles.boxparagraph}>
                                    Please enter the phone number registered in
                                    Ovo. Billing will be sent to the phone
                                    number you entered.
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
                                    onChange={(e) =>
                                      setovoNumber(e.target.value)
                                    }
                                    placeholder="Phone Number"
                                  />
                                </View>
                                <View
                                  style={{
                                    marginBottom: "5%",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Pressable style={styles.paybutton}>
                                    <Text style={styles.buttonpaytext}>Pay Rp.110,000</Text>
                                  </Pressable>
                                </View>
                              </>
                            ) : null}
                          </View>
                        </View>

                        <View
                          style={danadropdown ? styles.fullbox : styles.minibox}
                        >
                          <View style={styles.innerbox}>
                            <View style={styles.boxrow}>
                              <Pressable
                                style={styles.downiconcontainer}
                                onPress={() => handledanadropdown()}
                              >
                                <Image
                                  source={dana}
                                  style={{ width: 44, height: 20 }}
                                  resizeMode="contain"
                                />

                                <Text style={styles.paymenttext}>Dana</Text>

                                <Entypo
                                  name={
                                    danadropdown ? "chevron-up" : "chevron-down"
                                  }
                                  size={24}
                                  color="black"
                                  style={styles.downicon}
                                />
                              </Pressable>
                            </View>

                            {danadropdown ? (
                              <>
                                <View style={styles.boxparagraphcontainer}>
                                  <Text style={styles.boxparagraph}>
                                    Please enter the phone number registered in
                                    Ovo. Billing will be sent to the phone
                                    number you entered.
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
                                    onChange={(e) =>
                                      setdananumber(e.target.value)
                                    }
                                    placeholder="Phone Number"
                                  />
                                </View>
                                <View
                                  style={{
                                    marginBottom: "5%",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Pressable style={styles.paybutton}>
                                  <Text style={styles.buttonpaytext}>Pay Rp.110,000</Text>
                                  </Pressable>
                                </View>
                              </>
                            ) : null}
                          </View>
                        </View>

                        <View
                          style={
                            shopeedropdown ? styles.fullbox : styles.minibox
                          }
                        >
                          <View style={styles.innerbox}>
                            <View style={styles.boxrow}>
                              <Pressable
                                style={styles.downiconcontainer}
                                onPress={() => handleshopeedropdown()}
                              >
                                <Image
                                  source={shopee}
                                  style={{ width: 44, height: 20 }}
                                  resizeMode="contain"
                                />

                                <Text style={styles.paymenttext}>Shopee</Text>

                                <Entypo
                                  name={
                                    shopeedropdown
                                      ? "chevron-up"
                                      : "chevron-down"
                                  }
                                  size={24}
                                  color="black"
                                  style={styles.downicon}
                                />
                              </Pressable>
                            </View>

                            {shopeedropdown ? (
                              <>
                                <View style={styles.boxparagraphcontainer}>
                                  <Text style={styles.boxparagraph}>
                                    Please enter the phone number registered in
                                    Ovo. Billing will be sent to the phone
                                    number you entered.
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
                                    onChange={(e) =>
                                      setshopeenumber(e.target.value)
                                    }
                                    placeholder="Phone Number"
                                  />
                                </View>
                                <View
                                  style={{
                                    marginBottom: "5%",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Pressable style={styles.paybutton}>
                                  <Text style={styles.buttonpaytext}>Pay Rp.110,000</Text>
                                  </Pressable>
                                </View>
                              </>
                            ) : null}
                          </View>
                        </View>
                      </Form>
                    </Formik>
                  </View>
                )}
              </View>
            </View>


          </ScrollView>
        </View>
        }
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
    marginTop: "5%",
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
  textfullbox: {
    width: 364,
    marginTop: "3%",
    backgroundColor: "transparent",
  },
  textinnerbox: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 19,
    color: "#000",
  },
  cashiertext: {
    marginTop: "5%",
  },
  cashierpaymentbutton: {
    width: 260,
    height: 42,
    backgroundColor: "#df3030",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cashierpaymentbuttonactive: {
    width: 260,
    height: 42,
    backgroundColor: "#FFE4E5",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 28,
    color: "#df3030",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#df3030",
  },
  fullbox: {
    width: 364,
    height: 211,
    borderRadius: 15,
    marginTop: "3%",
    backgroundColor: "#fff",
    borderColor: "#DF3030",
    borderWidth: 1,
  },
  minibox: {
    width: 364,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: "3%",
    borderColor: "#c4c4c4",
    borderWidth: 1,
  },
  innerbox: {
    width: "100%",
    height: "100%",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  boxrow: {
    width: "100%",
  },
  paymenttext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#46445C",
    marginLeft: "8%",
  },
  downiconcontainer: {
    width: "100%",
    flexDirection: "row",
  },
  downicon: {
    marginTop: "-1%",
    position: "absolute",
    right: 5,
    color: "#df3030",
  },
  boxparagraphcontainer: {
    marginTop: "5%",
    marginRight: "2%",
  },
  boxparagraph: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 300,
    fontSize: 13,
    lineHeight: 18,
    color: "#424242",
  },
  boxrow2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  paybutton: {
    width: 145,
    height: 34,
    backgroundColor: "#df3030",
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 28,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "6%",
  },
  phoneicon: {
    color: "#838FA6",
    marginLeft: "2%",
    marginRight: "2%",
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
    position: "absolute",
    zIndex: 5,
    top: -8,
    right: 10,
    width: 173,
    height: 42,
    backgroundColor: "#df3030",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
  },
  hidden: {
    display: "none",
  },
  notificationtextcontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationtext: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#fff",
    marginLeft: "5%",
  },
  notifclosebutton: {
    position: "absolute",
    top: 5,
    right: 6,
  },
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


  emptycontainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAF4",
    height: ScreenHeight,
  },
  centered:{
      flex:1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  paymenticon: {
    width: 185,
    height: 185,
    marginBottom: "10%",
  },
  paymentlabel: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 33,
    color: "#424242",
    justifyContent: "center",
  },
  homepagebutton:{
    width: 260,
    height: 42,
    backgroundColor: "#df3030",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop:'5%',
  },
  buttontext:{
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
  },
  buttonpaytext:{
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 28,
    color: "#fff",
  }
});

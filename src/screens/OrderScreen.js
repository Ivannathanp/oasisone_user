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

function OrderScreen({ navigation, route }) {
  const [currentorder, setCurrentOrder] = useState(false);
  const [completedorder, setCompletedOrder] = useState(false);

  const OrderData = [
    {
      id: "ODR - 1629840579",
      tenantname: "Telaga Seafood",
      status: 1,
      ordertime: "23 Feb 2022, 11:00 am",
      menu: [
        {
          id: 1,
          menu: "Gurame Asam Manis",
          quantity: 1,
          price: "65000",
        },
        {
          id: 2,
          menu: "Udang Bakar",
          quantity: 1,
          price: "45000",
        },
      ],
      total: "110000",
      tax: "11000",
      subtotal: "121000",
    },
  ];

  const CompletedOrderData = [
    {
      id: "ODR - 1629840579",
      tenantname: "Telaga Seafood",
      status: 1,
      ordertime: "23 Feb 2022, 11:00 am",
      menu: [
        {
          id: 1,
          menu: "Gurame Asam Manis",
          quantity: 1,
          price: "65000",
        },
        {
          id: 2,
          menu: "Udang Bakar",
          quantity: 1,
          price: "45000",
        },
      ],
      total: "110000",
      tax: "11000",
      subtotal: "121000",
    },
    {
      id: "ODR - 1929840579",
      tenantname: "Telaga Seafood",
      status: 2,
      ordertime: "23 Feb 2022, 11:00 am",
      menu: [
        {
          id: 1,
          menu: "Gurame Asam Manis",
          quantity: 1,
          price: "65000",
        },
        {
          id: 2,
          menu: "Udang Bakar",
          quantity: 1,
          price: "45000",
        },
      ],
      total: "110000",
      tax: "11000",
      subtotal: "121000",
    },
  ];

  const [passmodalinfo, setPassModalInfo] = useState([]);
  const [completeordermodal, setCompleteOrderModal] = useState(false);
  const handleopencompleteorder = (item) => {
    setPassModalInfo(item);
    setCompleteOrderModal(true);
  };
  const handleclosecompleteorder = () => setCompleteOrderModal(false);

  const [waiternotif, setWaiterNotif] = useState(false);
  function handlenotification() {
    if (waiternotif) {
      setWaiterNotif(false);
    } else {
      setWaiterNotif(true);
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
          <Text style={styles.heading}>My Order</Text>
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
        <ScrollView  style={{    backgroundColor: "#FFFAF4", paddingBottom: "20%" }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
      
       
          <View style={styles.orderinnercontainer}>
   
            <View>
              
            <Text style={styles.title}>Current Order</Text></View>

            <View style={waiternotif ? styles.notification : styles.hidden}>
              <View style={styles.notificationtextcontainer}>
                <Text style={styles.notificationtext}>Calling waiter...</Text>
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

            {currentorder ? (
              <View style={styles.note}>
                <Text style={styles.ordernone}>
                  Looks like you don’t have any Current Order status
                </Text>
              </View>
            ) : (
              <View style={styles.currentordercontainer}>
                {OrderData.map((post, index) => (
                  <View>
                    <View style={styles.row1}>
                      {post.status == 1 ? (
                        <View style={styles.pending}>Pending</View>
                      ) : post.status == 2 ? (
                        <View style={styles.served}>Served</View>
                      ) : null}
                      <View style={styles.callwaiter}>
                        <Pressable
                          style={styles.waiterbutton}
                          onPress={handlenotification}
                        >
                          Call The Waiter
                        </Pressable>
                      </View>
                    </View>
                    <View style={styles.row2}>
                      <Text style={styles.orderid}>{post.id}</Text>
                      <Text style={styles.ordertext}>
                        Store :&nbsp;{post.tenantname}
                      </Text>
                      <Text style={styles.ordertext}>
                        Time :&nbsp;{post.ordertime}
                      </Text>
                    </View>
                    {post.menu.map((a, b) => (
                      <View style={styles.row3}>
                        <Text style={styles.text1}>{a.quantity}</Text>

                        <View style={styles.menurighttext}>
                          <Text style={styles.text2}>{a.menu}</Text>
                          <Text style={styles.text3}>
                            <NumberFormat
                              value={a.price}
                              prefix="Rp. "
                              decimalSeparator="."
                              thousandSeparator=","
                              displayType="text"
                            />
                          </Text>
                        </View>
                      </View>
                    ))}

                    <View style={styles.row4}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text1}>Subtotal :</Text>
                        <Text style={styles.text3}>
                          <NumberFormat
                            value={post.total}
                            prefix="Rp. "
                            decimalSeparator="."
                            thousandSeparator=","
                            displayType="text"
                          />
                        </Text>
                      </View>

                      <View style={styles.innerrow}>
                        <Text style={styles.text1}>Tax 10% :</Text>
                        <Text style={styles.text3}>
                          <NumberFormat
                            value={post.tax}
                            prefix="Rp. "
                            decimalSeparator="."
                            thousandSeparator=","
                            displayType="text"
                          />
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row5}>
                      <Text style={styles.text1}>Bill Amount :</Text>

                      <Text style={styles.text3}>
                        <NumberFormat
                          value={post.subtotal}
                          prefix="Rp. "
                          decimalSeparator="."
                          thousandSeparator=","
                          displayType="text"
                        />
                      </Text>
                    </View>
                    <View style={styles.paybuttoncontainer}>
                      <Pressable
                        style={styles.paymentbutton}
                        onPress={() =>
                          navigation.navigate("PaymentMethod")
                        }
                      >
                        Payment
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.ordercompletedcontainer}>
            <Text style={styles.title}>Completed Order</Text>
            {completedorder ? (
              <View style={styles.note}>
                <Text style={styles.ordernone}>
                  Looks like you don’t have any Completed Order status
                </Text>
              </View>
            ) : (<>
              {CompletedOrderData.map((post, index) => (
              <View style={styles.completedordercontainer}>
               
                    <View style={styles.crow1}>
                      <View style={styles.cleft}>
                        <Text style={styles.corderid}>{post.id}</Text>
                        <Text style={styles.ordertext}>
                          Store :&nbsp;{post.tenantname}
                        </Text>
                        <Text style={styles.ordertext}>
                          Time :&nbsp;{post.ordertime}
                        </Text>
                      </View>
                      <View style={styles.cright}>
                        <Pressable
                          style={styles.viewdetail}
                          onPress={() => handleopencompleteorder(post)}
                        >
                          View Details
                        </Pressable>
                      </View>

                      <Modal isVisible={completeordermodal} hasBackdrop={true}>
                        <View style={styles.modal}>
                          <View style={styles.closemodalbuttoncontainer}>
                            <Pressable
                              style={styles.closemodalbutton}
                              onPress={() => handleclosecompleteorder()}
                            >
                              {" "}
                              <Entypo
                                name="cross"
                                size={18}
                                color="black"
                                style={styles.closeicon}
                              />
                            </Pressable>
                          </View>

                          <View style={styles.row2}>
                            <Text style={styles.orderid}>{post.id}</Text>
                            <Text style={styles.ordertext}>
                              Store :&nbsp;{post.tenantname}
                            </Text>
                            <Text style={styles.ordertext}>
                              Time :&nbsp;{post.ordertime}
                            </Text>
                          </View>
                          {post.menu.map((a, b) => (
                            <View style={styles.row3}>
                              <Text style={styles.text1}>{a.quantity}</Text>

                              <View style={styles.menurighttext}>
                                <Text style={styles.text2}>{a.menu}</Text>
                                <Text style={styles.text3}>
                                  <NumberFormat
                                    value={a.price}
                                    prefix="Rp. "
                                    decimalSeparator="."
                                    thousandSeparator=","
                                    displayType="text"
                                  />
                                </Text>
                              </View>
                            </View>
                          ))}

                          <View style={styles.row4}>
                            <View style={styles.innerrow}>
                              <Text style={styles.text1}>Subtotal :</Text>
                              <Text style={styles.text3}>
                                <NumberFormat
                                  value={post.total}
                                  prefix="Rp. "
                                  decimalSeparator="."
                                  thousandSeparator=","
                                  displayType="text"
                                />
                              </Text>
                            </View>

                            <View style={styles.innerrow}>
                              <Text style={styles.text1}>Tax 10% :</Text>
                              <Text style={styles.text3}>
                                <NumberFormat
                                  value={post.tax}
                                  prefix="Rp. "
                                  decimalSeparator="."
                                  thousandSeparator=","
                                  displayType="text"
                                />
                              </Text>
                            </View>
                          </View>
                          <View style={styles.row5}>
                            <Text style={styles.text1}>Bill Amount :</Text>

                            <Text style={styles.text3}>
                              <NumberFormat
                                value={post.subtotal}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </Text>
                          </View>
                        </View>
                      </Modal>
                    </View>
                    <View style={styles.row5}>
                            <Text style={styles.text1}>Bill Amount :</Text>

                            <Text style={styles.text3}>
                              <NumberFormat
                                value={post.subtotal}
                                prefix="Rp. "
                                decimalSeparator="."
                                thousandSeparator=","
                                displayType="text"
                              />
                            </Text>
                          </View>
             
                  </View>
                ))}
         </>
            )}
          </View>
          
      
        </View>
        </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default OrderScreen;

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
    height: ScreenHeight,
  },
  orderinnercontainer: {
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: '10%',
    position:'relative',
    marginTop:'2%',
    height: 430,
  },
  ordercompletedcontainer: {
    marginTop:'3%',
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
    zIndex:2,
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
  currentordercontainer:{
width:374,
backgroundColor:'#fff',
borderRadius:15,
marginTop:'2%',
marginBottom:'4%',
paddingTop: 15,
paddingLeft:15,
paddingRight:15,
  },
  row1:{
flexDirection:'row',
justifyContent:'space-between',
alignContent:'space-between',
paddingBottom: '4%',
borderBottomColor: "#e52c32",
borderBottomWidth:0.5,
  },
  pending:{
width: 105,
height: 33,
backgroundColor: '#FFA800',
borderRadius: 100,
fontFamily: "Nunito Sans, sans-serif",
fontWeight: 600,
fontSize: 14,
lineHeight: 19,
color: "#fff",
justifyContent:'center',
alignItems:'center'
  },
  served:{
    width: 105,
height: 33,
backgroundColor: '#4678BC',
borderRadius: 100,
fontFamily: "Nunito Sans, sans-serif",
fontWeight: 600,
fontSize: 14,
lineHeight: 19,
color: "#fff",
justifyContent:'center',
alignItems:'center'
  },
  callwaiter:{
    width: 139,
    height: 33,
    borderColor:'#e52c32',
    borderWidth:1,
    backgroundColor: '#fff',
    borderRadius: 100,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#E52C32",
    justifyContent:'center',
    alignItems:'center'
  },
  waiterbutton:{

  },
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
  paybuttoncontainer:{
alignContent:'center',
alignItems:'center',
marginTop:'8%',
marginBottom: '4%'
  },
  paymentbutton:{
    width:183,
    height:41,
    borderRadius:100,
    backgroundColor:"#c4c4c4",
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 22,
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  completedordercontainer:{
    width:374,
    backgroundColor:'#fff',
    borderRadius:15,
    marginTop:'2%',
    marginBottom:'4%',
padding:15,
  },
  crow1:{
flexDirection:'row',
justifyContent: 'space-between',
alignItems:"space-between",
marginBottom:'2%',
  },
  cleft:{

  },
  corderid:{
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 19,
    color: "#1DC250",
    marginBottom: "1%",
  },
  cright:{
justifyContent:'center',
  },
  viewdetail:{
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#e52c32",
  },
});

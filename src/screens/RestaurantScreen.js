import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
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
import { Ionicons, AntDesign } from "@expo/vector-icons";
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

function RestaurantScreen({ navigation, route }) {
  const [menu, setMenu] = useState();
  const state = route.params.paramkey.recommended;

  const Recommend = require("../icons/Recommend.png");


  //Render extra menu
  const restaurantData = [
    {
      id: 1,
      name: "Telaga Seafood",
      uri: require("../icons/Logo.png"),
      location:
        "Jl. Raya Serpong Kav. Komersial No. 6, Bumi Serpong Damai, Jelupang, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten.",
      menu: [
        {
          menuId: 1,
          allcat: 0,
          category: 1,
          name: "Gurame Bakar",
          uri: require("../icons/Gurame Bakar.png"),
          duration: 15,
          recommended: true,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 65000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 2,
          allcat: 0,
          category: 1,
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 3,
          allcat: 0,
          category: 5,
          name: "Udang Bakar",
          uri: require("../icons/Udang Bakar.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 45000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 4,
          allcat: 0,
          category: 4,
          name: "Kailan Polos",
          uri: require("../icons/Kailan Polos.png"),
          duration: 5,
          recommended: false,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 30000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 5,
          allcat: 0,
          category: 4,
          name: "Kailan Polos",
          uri: require("../icons/Kailan Polos.png"),
          duration: 5,
          recommended: false,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 30000,
          quantity: 10,
          availability: true,
          value: 0,
        },
      ],
    },
  ];
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [text, setText] = useState(0);
  const [menuquantity, setMenuQuantity] = useState();

  function renderMenu() {
    const MenuScrollable = ({ item, index }) => {
      const handleIncrement = (i) => {
        setMenuQuantity((menuquantity) => {
          const formatData = item.menu.map((item, j) => {
            if (item.menuId === i) {
              item.value = item.value + 1;
              return item;
            } else {
              return item;
            }
          });
          return {
            formatData,
          };
        });
      };

      const handleDecrement = (i) => {
        setMenuQuantity((menuquantity) => {
          const formatData = item.menu.map((item, j) => {
            if (item.menuId === i) {
              item.value = item.value - 1;
              return item;
            } else {
              return item;
            }
          });
          return {
            formatData,
          };
        });
      };

      return (
        <View style={{ alignItems: "center" }}>
          {item.menu.map((v, i) => (
            <>
              <View style={styles.menuitem}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Restaurant", {
                      paramkey: v,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: v.uri,
                    }}
                    style={styles.menuitemPhoto}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View>
                  <Text style={styles.menutext}>{v.name}</Text>
                  <View style={styles.menutext}>
                    <NumberFormat
                      value={v.price}
                      prefix="Rp. "
                      decimalSeparator="."
                      thousandSeparator=","
                      displayType="text"
                    />
                  </View>
                </View>

                <View style={styles.cartcontainer}>
                  <View style={v.value > 0 ? styles.cart : styles.cartactive}>
                    <Pressable
                      style={v.value > 0 ? styles.button : styles.buttonactive}
                      onPress={() => {
                        handleIncrement(v.menuId);
                      }}
                      disabled={v.value == v.quantity ? true : false}
                    >
                      <Text
                        style={
                          v.value > 0
                            ? styles.buttontext
                            : styles.disabledbuttontext
                        }
                      >
                        +
                      </Text>
                    </Pressable>
                    <View style={styles.carttext}>{v.value}</View>
                    <Pressable
                      style={text > 0 ? styles.button : styles.buttonactive}
                      onPress={() => {
                        handleDecrement(v.menuId);
                      }}
                      disabled={v.value == 0 ? true : false}
                    >
                      <Text
                        style={
                          v.value > 0
                            ? styles.buttontext
                            : styles.disabledbuttontext
                        }
                      >
                        -
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </>
          ))}
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            horizontal={false}
            data={restaurants}
            renderItem={MenuScrollable}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

  const Cart = require("../icons/Cart.svg");
  const [totalprice, setTotalprice] = useState();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let { v } = route.params;
    setMenu(v);
  });

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={19} color="white" style={{marginTop:'-5%'}}/>
          <Text style={styles.heading}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //edit order
  function editOrder(action, menuId, price) {
    console.log(menuId);
    console.log(price);
    if (action == "+") {
      let orderList = orderItems.slice();
      console.log(orderList);
      let item = orderList.filter((a) => a.menuId == menuId);
      console.log(item);
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  }

  //
  function getOrderQty(menuId) {
    let orderItem = orderItems.filter((a) => a.menuId == menuId);
    console.log(menuId);
    console.log(orderItem);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    console.log(total);
    return total;
  }

  function renderButton() {
    return (
      <View style={styles.buttoncontainer}>
        <Pressable
          style={styles.cartbutton}

          /*
          onPress={() => {
            editOrder("+", route.params.paramkey.menuId, route.params.paramkey.price)
          }}*/

          //onPress={() =>navigation.navigate("Basket")}

          onPress={()=>handlenotification()}
        >
          <Image
            source={Cart}
            style={styles.buttonPhoto}
            resizeMode="contain"
          />
          <Text style={styles.tambahkanbuttontext}>
            Tambahkan | &nbsp;
            <Text style={styles.tambahkanbuttontext}>
              {console.log(sumOrder())}
              <NumberFormat
                value={route.params.paramkey.price}
                prefix="Rp. "
                decimalSeparator="."
                thousandSeparator=","
                displayType="text"
              />
            </Text>{" "}
          </Text>
        </Pressable>
      </View>
    );
  }

  const [additemnotif, setAddItemNotif] = useState(false);
  function handlenotification() {
    if (additemnotif) {
      setAddItemNotif(false);
    } else {
      setAddItemNotif(true);
    }
  }
  return (
    <View style={styles.outercontainer}>
      <View style={styles.innercontainer}>
        {renderHeader()}
        <View style={styles.backgroundcontainer}>
          <View style={styles.background}>
            <Image
              source={{
                uri: route.params.paramkey.uri,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
            />

            <View style={additemnotif ? styles.notification : styles.hidden}>
              <View style={styles.notificationtextcontainer}>
                <Text style={styles.notificationtext}>Item Added to Cart</Text>
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
          </View>

          <View style={styles.backgroundoverlay}></View>
        </View>

        {/*Landing Page*/}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.restaurantcontainer}>
            <View style={styles.uppercontainer}>
              <Text style={styles.title}>{route.params.paramkey.name}</Text>
              <View style={styles.price}>
                <View>
                  <Text style={styles.h3}>
                    RP :{" "}
                    <Text style={styles.h2}>
                      <NumberFormat
                        value={route.params.paramkey.price}
                        prefix="RP. "
                        decimalSeparator="."
                        thousandSeparator=","
                        displayType="text"
                      />
                    </Text>
                  </Text>
                </View>
                <View>
                  {state ? (
                    <Image
                      source={Recommend}
                      style={styles.recommenPhoto}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </View>
              <AntDesign
                style={styles.h3t}
                name="clockcircleo"
                size={10}
                color="#424242"
              >
                <Text style={styles.h2}> Cooking Time</Text>
              </AntDesign>
              <Text style={styles.h3}>{route.params.paramkey.duration} Minutes</Text>
              <Ionicons
                style={styles.h3t}
                name="newspaper-outline"
                size={10}
                color="#424242"
              >
                <Text style={styles.h2}> Product Details</Text>
              </Ionicons>
              <Text style={styles.h3}>{route.params.paramkey.description}</Text>
            </View>

            <View style={styles.lowercontainer}>
              <Text style={styles.heading2}>Maybe you like this too!</Text>
              <View style={{ flex: 1, marginTop: '3%' }}>
                <SafeAreaView>{renderMenu()}</SafeAreaView>
              </View>
            </View>
          </View>
        </ScrollView>
        {renderButton()}
      </View>
    </View>
  );
}

export default RestaurantScreen;

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
  heading: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
    justifyContent: "center",
  },
  backbutton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  backgroundcontainer: {
    width: "auto",
    height: 321,
    backgroundColor: "grey",
  },
  background: {
    backgroundColor: "black",
    position: "relative",
    height: 321,
  },

  notification: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    elevation: 1,
    top: 10,
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

  backgroundoverlay: {
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 20,
    width: "100%",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  itemPhoto: {
    flex: 1,
    height: 321,
  },
  recommenPhoto: {
    flex: 1,
    height: 16,
    width: 70,
    justifyContent: "center",
    marginLeft: 10,
  },
  title: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "22px",
    lineHeight: "30px",
    color: "#424242",
    marginLeft: 20,
    marginBottom: 10,
  },
  price: {
    flexDirection: "row",
  },
  restaurantcontainer: {
    backgroundColor: "#FFFAF4",
    height: ScreenHeight - 200,
  },
  uppercontainer: {
    marginBottom: "5%",
  },
  lowercontainer: {
    height: 200,
  },

  h3: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#424242",
    marginLeft: 20,
  },

  h2: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#424242",
  },
  h3t: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#424242",
    marginLeft: 20,
    marginTop: 20,
  },
  heading2: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    marginLeft: 20,
    color: "#424242",
  },
  buttoncontainer: {
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
    width: "90%",
    backgroundColor: "#E52C32",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "none",
    margin: "auto",
    borderWidth: 0,
    flexDirection: "row",
  },
  buttonPhoto: {
    flex: 0.3,
    height: 24,
    width: 24,
    color: "#fff",
  },
  buttontext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
  },
  menuitem: {
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffff",
    width: 374,
    height: 80,
    borderRadius: 20,
  },
  menuitemPhoto: {
    width: 88,
    height: 66,
    borderRadius: 15,
    marginTop: 7,
    marginBottom: 4,
    marginLeft: 10,
  },
  menutext: {
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    fontWeight: 600,
    color: "#424242",
  },
  carttext: {
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    fontWeight: 600,
    color: "white",
  },
  cart: {
    width: 80,
    height: 30,
    backgroundColor: "#E52C32",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    margin: "auto",
    borderRadius: 20,
  },
  cartactive: {
    width: 80,
    height: 30,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    margin: "auto",
    borderRadius: 20,
  },
  cartcontainer: {
    position: "absolute",
    right: 5,
  },
  button: {
    width: 20,
    height: 20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttonactive: {
    width: 20,
    height: 20,
    color: "black",
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttontext: {
    color: "#E52C32",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  disabledbuttontext: {
    color: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
});

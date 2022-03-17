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
import { Ionicons, AntDesign } from "@expo/vector-icons";
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

import axios from "axios";

function BasketScreen({ navigation, route }) {

  const restaurantData = [
    {
      id: 1,
      name: "Telaga Seafood",
      uri: require("../icons/Logo.png"),
      location:
        "Jl. Raya Serpong Kav. Komersial No. 6, Bumi Serpong Damai, Jelupang, Lengkong Karya, Kec. Serpong Utara, Kota Tangerang Selatan, Banten.",
      schedule: [
        {
          id: 1,
          day: "Sunday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 2,
          day: "Monday",
          open: "",
          close: "",
        },
        {
          id: 3,
          day: "Tuesday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 4,
          day: "Wednesday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 5,
          day: "Thursday",
          open: "08:30",
          close: "19:30",
        },
        {
          id: 6,
          day: "Friday",
          open: "08:30",
          close: "20:30",
        },
        {
          id: 7,
          day: "Saturday",
          open: "08:30",
          close: "20:30",
        },
      ],
      menu: [
        {
          menuId: 1,
          category: [1, 2],
          name: "Gurame Bakar",
          uri: require("../icons/Gurame Bakar.png"),
          duration: 15,
          recommended: true,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 65000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 2,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 3,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 4,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 2,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 3,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
        {
          menuId: 4,
          category: [3],
          name: "Gurame Asam Manis",
          uri: require("../icons/Gurame Saus Tiram.png"),
          duration: 15,
          recommended: false,
          description:
            "Sweet and sour fish is a traditional Chinese dish made in Shandong Province primarily from carp. It is one of the representative dishes of Lu cuisine.",
          price: 85000,
          quantity: 10,
          availability: true,
          value: 1,
        },
      ],
    },
  ];

  const [restaurants, setRestaurants] = useState(restaurantData);
  const [text, setText] = useState(0);
  const [menuquantity, setMenuQuantity] = useState();

  const [value, setValue] = useState(0);
  const [OrderItems, setOrderItems] = useState([]);

  const TableData = [
    {
      id: 1,
      table_ID: "T1",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: true,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 1,
      totalitems: 2,
    },

    {
      id: 2,
      table_ID: "T2",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 2,
      totalitems: 2,
    },
    {
      id: 3,
      table_ID: "T3",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "Minta Garpu",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 1,
      totalitems: 2,
    },
    {
      id: 4,
      table_ID: "T4",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 4,
      totalitems: 2,
    },
    {
      id: 5,
      table_ID: "T5",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 2,
      totalitems: 2,
    },
    {
      id: 6,
      table_ID: "T6",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 1,
      totalitems: 2,
    },
    {
      id: 7,
      table_ID: "T7",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 5,
      totalitems: 2,
    },
    {
      id: 8,
      table_ID: "T8",
      time_start: "11:00",
      time_end: "11:30",
      customer: 0,

      waitercall: false,
    },
    {
      id: 9,
      table_ID: "T9",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 1,
      totalitems: 2,
    },
    {
      id: 10,
      table_ID: "T10",
      time_start: "11:00",
      time_end: "11:30",
      customer: 2,
      customername: "John",
      customerphone: "0891232232323",
      instruction: "",
      waitercall: false,
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
      status: 2,
      totalitems: 2,
    },
  ];
  const [tablenumber, setTableNumber] = useState(0);
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [specialinstruction, setSpecialInstrusction] = useState();
  const [numberofpeople, setNumberOfPeople] = useState(1);

  const outlineSelectClasses = useOutlineSelectStyles();
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return <AntDesign name="down" style={styles.selecticon} />;
  };

  function editOrder(action, menuId, price) {
    console.log("menu ID", menuId);
    console.log("price is", price);
    let orderList = OrderItems.slice();
    console.log("orderlist is", orderList);
    let item = orderList.filter((a) => a.menuId == menuId);
    console.log(item);

    if (action == "+") {
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

  function renderCartMenu() {
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
        <View style={styles.itemcontainer}>
          {item.menu.map(
            (v, i) => (
              console.log("v", v.value),
              (
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
                          prefix="RP. "
                          decimalSeparator="."
                          thousandSeparator=","
                          displayType="text"
                        />
                      </View>
                    </View>

                    <View style={styles.cartcontainer}>
                      <View
                        style={v.value > 0 ? styles.cart : styles.cartactive}
                      >
                        <Pressable
                          style={
                            v.value > 0 ? styles.button : styles.buttonactive
                          }
                          onPress={() => {
                            editOrder("+", v.menuId, v.price);
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
                          style={
                            v.value > 0 ? styles.button : styles.buttonactive
                          }
                          onPress={() => {
                            editOrder("-", v.menuId, v.price);
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
              )
            )
          )}
        </View>
      );
    };

    return (
      <View style={styles.menucontainer}>
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
            style={{ marginTop: "-2%" }}
          />
          <Text style={styles.heading}>Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={styles.orderbutton}>
        <Pressable
          style={styles.cartbutton}
          onPress={() =>
            navigation.navigate("OrderPlaced")}
        >
          <Text style={styles.orderbuttontext}>
            Total Cost:
            <Text>
              <NumberFormat
                value={368000 + sumOrder()}
                prefix=" RP. "
                decimalSeparator="."
                thousandSeparator=","
                displayType="text"
              />{" "}
              | Confirm Order
              <AntDesign
                style={{
                  backgroundColor: "#fff",
                  padding: 3,
                  borderRadius: 30,
                  marginTop: "-2%",
                  marginLeft: 5,
                }}
                name="right"
                size={11}
                color="#E52C32"
              />
            </Text>{" "}
          </Text>
        </Pressable>
      </View>
    );
  }

  function getOrderQty(menuId) {
    let orderItem = OrderItems.filter((a) => a.menuId == menuId);
    console.log(menuId);
    console.log(orderItem);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

  function getBasketItemCount() {
    let itemCount = OrderItems.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function sumOrder() {
    let total = OrderItems.reduce((a, b) => a + (b.total || 0), 0);
    console.log(total);
    return total;
  }

  //Take from local storage
  const [emptycart, setEmptyCart] = useState(false);
  const cartemptyicon = require("../icons/EmptyCart.svg");
  return (
    <>
      {emptycart ? (
        <View style={styles.outercontainer}>
          <View style={styles.innercontainer}>
            {renderHeader()}

            <View style={styles.backgroundoverlay}></View>
            <View style={styles.emptycontainer}>
              <Image
                source={cartemptyicon}
                style={styles.cartemptyicon}
                resizeMode="contain"
              />
              <Text style={styles.emptycart}>Your Cart is Empty.</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.outercontainer}>
          <View style={styles.innercontainer}>
            {renderHeader()}
            <View style={styles.backgroundcontainer}>
              <View style={styles.column}>
                <Text style={styles.headingr}>Items :</Text>
                <Text style={styles.headingl}>4</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.column}>
                <Text style={styles.headingr}>Subtotal :</Text>
                <Text style={styles.headingl}>
                  <NumberFormat
                    value={320000}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.column}>
                <Text style={styles.headingr}>Service Charge :</Text>
                <Text style={styles.headingl}>
                  <NumberFormat
                    value={16000}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.column}>
                <Text style={styles.headingr}>Tax(%) : </Text>
                <Text style={styles.headingl}>
                  <NumberFormat
                    value={32000}
                    prefix="Rp. "
                    decimalSeparator="."
                    thousandSeparator=","
                    displayType="text"
                  />
                </Text>
              </View>
            </View>

            <View style={styles.backgroundoverlay}></View>
            <View style={styles.container}>
              <ScrollView
                style={{ paddingBottom: "20%" }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.cartmenucontainer}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderCartMenu()}
                  </View>
                </View>

                <View style={styles.form}>
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Invalid e-mail address")
                        .required("Required"),
                      password: Yup.string()
                        .required("Required")
                        .min(
                          8,
                          "Password is too short - should be 8 chars minimum."
                        )
                        .matches(
                          /(?=.*[0-9])/,
                          "Password must contain a number."
                        )
                        .max(30, "Password is too long"),
                    })}
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                      console.log(values);
                      loginUser(values, history, setFieldError, setSubmitting);
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <View style={styles.forminputs}>
                          <Text style={styles.label}>
                            Name<Text style={styles.span}>*</Text>
                          </Text>
                          <TextField
                            name="name"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Name"
                          />
                        </View>
                        <View style={styles.forminputs}>
                          <Text style={styles.label}>
                            Phone Number<Text style={styles.span}>*</Text>
                          </Text>
                          <TextField
                            name="phonenumber"
                            value={phonenumber}
                            type="text"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter Your Phone Number"
                          />
                        </View>
                        <View style={styles.forminputs}>
                          <Text style={styles.label}>
                            Special Instructions (optional)
                          </Text>
                          <TextField
                            name="specialinstruction"
                            value={specialinstruction}
                            type="text"
                            placeholder="E.g No onions, please"
                            onChange={(e) =>
                              setSpecialInstrusction(e.target.value)
                            }
                          />
                        </View>
                        <View style={styles.forminputs}>
                          <Text style={styles.label}>
                            Select Your Table<Text style={styles.span}>*</Text>
                          </Text>
                          <Select
                            defaultValue=""
                            disableUnderline
                            classes={{ root: outlineSelectClasses.select }}
                            MenuProps={menuProps}
                            IconComponent={iconComponent}
                            value={tablenumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            renderValue={(selected) => {
                              if (selected === 0) {
                                return (
                                  <Text style={styles.placeholder}>
                                    Select Your Table
                                  </Text>
                                );
                              }
                              return selected;
                            }}
                          >
                            {TableData.map((post, index) => (
                              <MenuItem value={post.table_ID}>
                                {post.table_ID}
                              </MenuItem>
                            ))}
                          </Select>
                        </View>
                        <View style={styles.forminputs}>
                          <Text style={styles.label}>Number of People</Text>
                          <View style={styles.numberofpeople}>
                  
                          <Pressable
                              style={
                                numberofpeople == 1
                                  ? styles.sbuttonL
                                  : styles.sbuttonactiveL
                              }
                              onPress={() => {                              
                                setNumberOfPeople(numberofpeople - 1)
                              }}
                              disabled={numberofpeople == 1 ? true : false}
                            >
                              <Text
                                style={
                                  
                                    styles.sbuttontext
                                }
                              >
                                -
                              </Text>
                            </Pressable>

                            <View style={styles.snumberpeople}>{numberofpeople}&nbsp;Guest</View>
                                                       
                            <Pressable
                              style={
                                numberofpeople < 1
                                  ? styles.sbuttonR
                                  : styles.sbuttonactiveR
                              }
                              onPress={() => {
                                setNumberOfPeople(numberofpeople + 1)
                              }}
                              
                            >
                              <Text
                                style={
                                  styles.sbuttontext
                                   
                                }
                              >
                                +
                              </Text>
                            </Pressable>
                            
                          </View>
                        </View>
                      </Form>
                    )}
                  </Formik>
                </View>
              </ScrollView>

              {renderButton()}
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default BasketScreen;

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
    overflow: "hidden",
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
  form: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  formtitle: {
    marginLeft: 20,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  heading: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
    justifyContent: "center",
  },
  headingr: {
    flex: 0.5,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#fff",
    justifyContent: "center",
  },
  headingl: {
    flex: 0.5,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#fff",
    justifyContent: "center",
    textAlign: "right",
  },
  column: {
    width: "90%",
    flexDirection: "row",
  },
  headerbutton: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  backgroundcontainer: {
    width: "auto",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  backgroundoverlay: {
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  itemPhoto: {
    flex: 1,
    height: 321,
  },
  line: {
    width: "90%",
    marginTop: "2%",
    marginBottom: "2%",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 2,
  },
  recommenPhoto: {
    flex: 1,
    height: 16,
    width: 70,
    justifyContent: "center",
    marginLeft: 10,
  },
  price: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFAF4",
    height: ScreenHeight,
  },
  emptycontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAF4",
    height: ScreenHeight,
  },
  cartemptyicon: {
    width: 185,
    height: 185,
    marginBottom: "10%",
  },
  emptycart: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#424242",
    justifyContent: "center",
  },
  title: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 22,
    color: "#424242",
    marginLeft: 20,
    marginBottom: 10,
  },
  h3: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
    color: "#424242",
    marginLeft: 20,
  },
  h3t: {
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
    color: "#424242",
    marginLeft: 20,
    marginTop: 20,
  },
  h2: {
    fontFamily: "NunitoSans_700Bold",
    fontSize: 14,
    color: "#424242",
  },
  orderbutton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    elevation: 2,
  },
  orderbuttontext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#fff",
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
  buttonPhoto: {
    flex: 0.3,
    height: 24,
    width: 24,
  },
  
  scrollbutton: {
    maxWidth: wp("40%"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: "auto",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },

  itemcontainer: {},
  menucontainer: {
    marginBottom: 20,
  },
  item: {
    marginRight: -15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item2: {
    marginRight: -15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  itemPhoto: {
    width: 18,
    height: 18,
  },
  menubutton: {
    height: 100,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
  },
  row2: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  text: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
  },
  text2: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
  },
  text3: {
    color: COLORS.secondary,
    fontWeight: "600",
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 14,
  },
  menuitem: {
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "white",
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
  scrollbutton: {
    maxWidth: wp("40%"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    backgroundColor: "#E52C32",
    borderRadius: 50,
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFAF4",
    height: ScreenHeight,
  },
  form: {
    flex: 1,
    height: ScreenHeight,
    backgroundColor: "#42442",
  },
  forminputs: {
    paddingRight: "3%",
    paddingLeft: "3%",
    marginBottom: "5%",
  },
  label: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#424242",
    marginLeft: "5%",
    marginBottom: "2%",
  },
  span: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#E52C32",
  },
  selecticon: {
    width: 24,
    height: 24,
    backgroundColor: "#df3030",
    borderRadius: 50,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop:'2%',
    right: "5%",
    color: "#fff",
  },
  placeholder: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#C4C4C4",
  },
  numberofpeople:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    width: 193,
    height: 50,
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 100,
  },
  sbuttonL:{
    marginLeft:'5%',
    width: 20,
    height: 20,
    backgroundColor: "#C4C4C4",
    borderRadius: 50,

  },
  sbuttonactiveL:{
    marginLeft:'5%',
    width: 20,
    height: 20,
    backgroundColor: "#df3030",
    borderRadius: 50,

  },
  sbuttonR:{
    marginRight:'5%',
    width: 20,
    height: 20,
    backgroundColor: "#C4C4C4",
    borderRadius: 50,

  },
  sbuttonactiveR:{
    marginRight:'5%',
    width: 20,
    height: 20,
    backgroundColor: "#df3030",
    borderRadius: 50,

  },
  sbuttontext:{
    color: "#fff",
    flexDirection:'row',
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  snumberpeople: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#424242",

  },
});

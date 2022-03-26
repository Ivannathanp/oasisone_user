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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "../form/FormLib";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useOutlineSelectStyles } from "../select/index";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

function CallWaiterScreen({ navigation }) {
  const [tablenumber, setTableNumber] = useState(0);
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [specialinstruction, setSpecialInstrusction] = useState();

  console.log("screen height", ScreenHeight)

  console.log("name", name);
  console.log("phone number", phonenumber);
  console.log("instruction", specialinstruction);
  console.log("table number", tablenumber);

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
          <Text style={styles.heading}>Call The Waiter</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
    return (
      <ExpandMoreRoundedIcon
      className={props.className + " " + outlineSelectClasses.icon}
    />

    );
  };

  return (
    <View style={styles.outercontainer}>
      <View style={styles.innercontainer}>
        {renderHeader()}
        <View style={styles.backgroundcontainer}></View>
        <View style={styles.restaurantcontainer}>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid e-mail address")
                .required("Required"),
              password: Yup.string()
                .required("Required")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
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
                    onChange={(e) => setSpecialInstrusction(e.target.value)}
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
                      <MenuItem value={post.table_ID}>{post.table_ID}</MenuItem>
                    ))}
                  </Select>
                </View>
              </Form>
            )}
          </Formik>

         

        
        <Pressable
          style={styles.waiterbutton}
          
          /*
          onPress={() => {
            editOrder("+", route.params.v.menuId, route.params.v.price)
          }}*/
          
//onPress={() =>navigation.navigate("Basket")}
        >
         <Ionicons name="call-outline" style={styles.callicon} />
          <Text style={styles.buttontext}>
            Call Now
             
          </Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CallWaiterScreen;

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
    overflow:'hidden'
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
  backgroundcontainer: {
    width: "auto",
    height: 30,
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  restaurantcontainer: {
    backgroundColor: "#FFFAF4",

    alignItems: "center",
    height: ScreenHeight - 40 - hp("4%"),
    position:'relative',
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
  waiterbutton: {
    position: "absolute",
    bottom: 20,
    elevation: 1,
    borderRadius: 200,
    height: 60,
    width: 373,
    backgroundColor: "#E52C32",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "none",
    margin: "auto",
    borderWidth: 0,
    flexDirection: "row",
  },
  callicon:{
width:24,
height:24,
fontSize:24,
color:'#fff',

  },
  buttontext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "21px",
    color: "#fff",
    marginLeft: '2%'
  },
});

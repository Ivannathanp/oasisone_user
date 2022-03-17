import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import SearchBar from "../searchbar/searchbar";
import Promo from "../Promo/Scrollable";
import Recommended from "../Recommended/Scrollable";
import Category from "../categories/Scrollable";
import Menu from "../menu/Scrollable";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";
import { Feather, Entypo } from "@expo/vector-icons";

function HomeScreen() {
  const Logo = require("../icons/Logo.png");
  const Home = require("../icons/Menu1.png");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  console.log("Search is", searchPhrase)
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
          value: 0,
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
          value: 0,
        },
        {
          menuId: 3,
          category: [5],
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
          category: [4],
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
          category: [2, 4],
          name: "Udang Galah Rebus",
          uri: require("../icons/Udang Galah Rebus.png"),
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
          menuId: 6,
          category: [6],
          name: "Ice Vietnam Drip",
          uri: require("../icons/Ice Vietnam Drip.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 7,
          category: [6],
          name: "Kerapu Kukus",
          uri: require("../icons/Kerapu Kukus.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 8,
          category: [6],
          name: "Cumi Goreng",
          uri: require("../icons/Cumi Goreng.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 9,
          category: [6],
          name: "Sayur Asem",
          uri: require("../icons/Sayur Asem.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
        {
          menuId: 10,
          category: [6],
          name: "Kerang",
          uri: require("../icons/Kerang.png"),
          duration: 10,
          recommended: true,
          description:
            "Juicy prawns (shrimp) cooked on the grill then coated in a spicy garlic lemon butter sauce. Served with rice or crusty bread, this is a showstopper meal.",
          price: 15000,
          quantity: 10,
          availability: true,
          value: 0,
        },
      ],
    },
  ];

  const [restaurants, setRestaurants] = useState(restaurantData);

  function renderMenu() {
    const navigation = useNavigation();

    const MenuScrollable = ({ item }) => {
      console.log("search is", searchPhrase);
      return (
        <View style={styles.outercontainer}>
          <View style={styles.innercontainer}>
            <View style={styles.row}>
              <View style={styles.logocolumn}>
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={styles.logoimage}
                />
              </View>

              <View style={styles.headercolumn}>
                <Text style={styles.title}> {item.name} </Text>

                <Text style={styles.body}>
                  <Ionicons name="location-outline" size={15} color="white" />
                  {item.location}
                </Text>

                <View style={styles.row}>
                  <View style={styles.headerbutton}>
                    <Pressable
                      style={styles.button}
                      onPress={handleOpenModalPress}
                    >
                      <Text style={styles.text}>Info</Text>

                      <Modal isVisible={isModalVisible} hasBackdrop={true}>
                        <View style={styles.modal}>
                          <Text style={styles.modaltitle}>Opening Hours</Text>

                          {item.schedule.map((v, i) => (
                            <>
                              <View style={styles.row}>
                                <View style={styles.column}>
                                  <Text style={styles.righttext}>{v.day}</Text>
                                </View>
                                <View style={styles.column}>
                                  {v.open != "" ? (
                                    <Text style={styles.lefttext}>
                                      {v.open} - {v.close}
                                    </Text>
                                  ) : (
                                    <Text style={styles.lefttext}>Closed</Text>
                                  )}
                                </View>
                              </View>
                              {i != 6 ? <View style={styles.line} /> : null}
                            </>
                          ))}
                        </View>
                        <Pressable
                          style={styles.modalbutton}
                          onPress={handleCloseModalPress}
                        >
                          <AntDesign
                            name="closecircleo"
                            size={24}
                            color="white"
                          />
                        </Pressable>
                      </Modal>
                    </Pressable>

                    <Pressable
                      style={styles.button}
                      onPress={() =>  navigation.navigate("CallWaiter")}
                    >
                      <Text style={styles.text}>Call the Waiter</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.searchbar}>
              <Feather
          name="search"
          size={20}
          color="black"
          style={styles.feather}
        />
                <SearchBar
                  searchPhrase={searchPhrase}
                  setSearchPhrase={(e)=>setSearchPhrase(e.target.value)}
                  onfocus={()=>setClicked(true)}
                />
                {searchPhrase != "" && (
          <Entypo name="cross" size={20} color="black" style={styles.cross} onPress={() => {
              setSearchPhrase(""); setClicked(false)
          }}/>
        )}
              </View>
              <View style={styles.container2}>
                <View style={{ flex: 1 }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.heading}>Promos For You</Text>
                      <Promo />
                      <Text style={styles.heading}>Recommended For You</Text>
                      <Recommended />
                      <Text style={styles.heading}>Menu</Text>
                      <Category />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
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

  return <SafeAreaView>{renderMenu()}</SafeAreaView>;
}

export default HomeScreen;

const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  outercontainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  innercontainer: {
    margin: "auto",
    width: "414px",
    backgroundColor: "#DF3030",
  },
  logocolumn: {
    marginTop: "5%",
    justifyContent: "center",
    alignContent: "center",
    height: 59,
    marginLeft: "5%",
  },
  logoimage: {
    resizeMode: "contain",
    width: 59,
    height: 59,
  },
  searchbar: {
    marginTop: "5%",
    marginBottom: "3%",
    width: "100%",
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent:'center'
  },
  feather:{
    position:'absolute',
    left: '8%',
    width: '26px',
    height: 26,
    color: '#C4C4C4',
    zIndex: 1,
  },
  cross:{
    position:'absolute',
    right: '8%',
    width: '26px',
    height: 26,
    color: '#C4C4C4',
    zIndex: 1,
  },
  headercolumn: {
    marginTop: "5%",
    marginLeft: "2%",
    flex: 1,
  },
  title: {
    flex: 1,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#fff",
  },
  body: {
    flex: 1,
    width: 295,
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#fff",
    marginLeft: "2%",
    color: "white",
  },
  headerbutton: {
    marginLeft: "2%",
    marginTop: "4%",
    marginBottom: "5%",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 5,
    border: "1px solid #fff",
    width: "auto",
    marginRight: "5%",
  },
  text: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#fff",
  },
  container: {
    backgroundColor: "#FFFAF4",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: ScreenHeight,
  },
  container2: {
    paddingBottom: 80,
  },
  modal: {
    backgroundColor: "#fff",
    minWidth: 287,
    height: 326,
    border: "1px solid #e6e6e6",
    justifyContent: "center",
    padding: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    borderRadius: 10,
  },
  modaltitle: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    color: "#000",
    textAlign: "center",
    marginBottom: "15%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "2%",
  },
  column: {
    flexWrap: "wrap",
  },
  righttext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: "#000",
    textAlign: "right",
  },
  lefttext: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: "#000",
    textAlign: "left",
  },
  hide: {
    border: "none",
  },
  modalbutton: {
    maxWidth: wp("40%"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "auto",
  },

  line: {
    width: "100%",
    marginTop: "2%",
    marginBottom: "2%",
    borderBottomColor: "#E6E6E6",
    borderBottomWidth: 2,
  },

  headingtext: {
    textAlign: "left",
    fontSize: "16",
    fontWeight: "700",
    marginLeft: 22,
    marginBottom: 15,
  },
  heading: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    color: "#424242",
  },
});

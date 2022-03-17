import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Data from "../data/data";
import { useNavigation } from "@react-navigation/native";
import NumberFormat from "react-number-format";
import { COLORS, FONTS } from "../constants/theme";

const Scrollable = () => {
  const navigation = useNavigation();
  const Menu = require("../icons/Book.png");

  const categoryData = [
    {
      id: 1,
      text: "Gurame",
    },
    {
      id: "2",
      text: "Kerapu",
    },
    {
      id: "3",
      text: "Udang",
    },
    {
      id: "4",
      text: "Cumi",
    },
    {
      id: "5",
      text: "Sayur",
    },
    {
      id: "6",
      text: "Minum",
    },
  ];

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
  close: "19:30"
},
{
  id: 2,
  day: "Monday",
  open: "",
  close: ""
},
{
  id: 3,
  day: "Tuesday",
  open: "08:30",
  close: "19:30"
},
{
  id: 4,
  day: "Wednesday",
  open: "08:30",
  close: "19:30"
},
{
  id: 5,
  day: "Thursday",
  open: "08:30",
  close: "19:30"
},
{
  id: 6,
  day: "Friday",
  open: "08:30",
  close: "20:30"
},
{
  id: 7,
  day: "Saturday",
  open: "08:30",
  close: "20:30"
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

  const [categories, setCategories] = useState(categoryData);
  const [selectCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [selectedMenu, setSelectedMenu] = React.useState(new Map());
  const [text, setText] = useState(0);
  const [state, setState] = useState();

  function renderMenu() {
    const MenuScrollable = ({ item, index }) => {

      return (
        <View style={{flexDirection: 'row'}}>
          {item.menu.map((v, i) => (
            <>
              <View style={styles.item}>
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
                    style={styles.itemPhoto}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View>
                  <Text style={styles.itemText} numberOfLines={1}>{v.name}</Text>
                  <View style={styles.itemText}>
                    <NumberFormat
                      value={v.price}
                      prefix="RP. "
                      decimalSeparator="."
                      thousandSeparator=","
                      displayType="text"
                    />
                  </View>
                </View>

                <Pressable
                  style={styles.scrollbutton}
                  onPress={() =>
                    navigation.navigate("Restaurant", {
                      paramkey: v,
                    })
                  }
                >
                  <AntDesign name="right" size={11} color="white" />
                </Pressable>


                
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
            horizontal
                        data={restaurants}
            renderItem={MenuScrollable}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView>
      {renderMenu()}
    </SafeAreaView>
  );
};

export default Scrollable;

const styles = StyleSheet.create({
  container: {

  },
  sectionHeader: {
    fontWeight: "700",
    fontSize: 16,
    color: "#424242",
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  item: {
    marginLeft: 18,
    marginRight: -10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    height: 159,
  },
  itemPhoto: {
    width: 110,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemText: {
    marginTop: 2,
    width:100,
    fontFamily: "Nunito Sans, sans-serif",
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#424242",
    textAlign: 'center'
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
});

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

  function RenderMenu() {

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
    const [selectedMenu, setSelectedMenu] = React.useState(new Map());
    const [text, setText] = useState(0);
    const [state, setState] = useState();

    const MenuScrollable = ({ item, index }) => {
      const handleIncrement = (i) => {
        setState((state) => {
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
        setState((state) => {
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
        <View>
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
                      prefix="RP. "
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
                            : styles.buttontextactive
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
                            : styles.buttontextactive
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
        <SafeAreaView >
          <FlatList
            horizontal
            maxToRenderPerBatch={5}
            data={restaurants}
            renderItem={MenuScrollable}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

export default RenderMenu;

const styles = StyleSheet.create({
  container: {},
  sectionHeader: {
    fontWeight: "700",
    fontSize: 16,
    color: "#424242",
    marginLeft: 22,
    marginBottom: 15,
    marginTop: 10,
  },
  item: {
    marginLeft: 22,
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
    marginLeft: 22,
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
  column1: {},
  column2: {},
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
    marginLeft: 22,
    marginRight: -15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
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
    margin: "auto",
  },
  buttontextactive: {
    color: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    margin: "auto",
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

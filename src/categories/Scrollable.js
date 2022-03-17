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
  const Menu = require("../icons/Menu.svg");

  const categoryData = [
    {
      id: 0,
      text: "Menu",
    },
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
          category: 2,
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
          allcat: 0,
          category: 6,
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
          allcat: 0,
          category: 6,
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
          allcat: 0,
          category: 6,
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
          allcat: 0,
          category: 6,
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
          allcat: 0,
          category: 6,
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
  const [menu, setMenu] = useState();
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [selectedMenu, setSelectedMenu] = React.useState(new Map());
  const [text, setText] = useState(0);

  {
    /*
  const [classes, setClasses] = useState(data);
  const [category, setCategory] = useState(category);
  const [division, setDivision] = useState(division);

  useEffect(() => {
    let filteredClasses = restaurants;
    if (category !== 'all') {
      filteredClasses = filteredClasses.filter(
        (menu) => menu.category === category
      );
    }
    if (division !== 'all') {
      filteredClasses = filteredClasses.filter(
        (classes) => classes.division === division
      );
    }
    setClasses(filteredClasses);
  }, [category, division]);
*/
  }

  function onSelectCategory(category) {
    //filter restaurant
    //let restaurantList = restaurantData.filter((menu) => restaurants === category.id);
    if (category.id == 0) {
      let restaurantList = restaurantData.map((element) => {
        return {
          ...element,
          menu: element.menu.filter((menu) => menu.allcat == category.id),
        };
      });
      console.log(restaurantList);
      console.log(category.id);
      setRestaurants(restaurantList);
      setSelectedCategory(category);
    } else {
      let restaurantList = restaurantData.map((element) => {
        return {
          ...element,
          menu: element.menu.filter((menu) => menu.category == category.id),
        };
      });
      console.log(restaurantList);
      console.log(category.id);
      setRestaurants(restaurantList);
      setSelectedCategory(category);
    }
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].text;

    return "";
  }

  function renderCategory() {
    const CategoryScrollable = ({ item }) => {
      return (
        <View style={styles.itemcatergorycontainer}>
          {item.id == 0 ? (
            <TouchableOpacity
              style={
                selectCategory?.id == item.id
                  ? styles.itemicon2
                  : styles.itemicon
              }
              onPress={() => onSelectCategory(item)}
            >
              <Image
                source={Menu}
                style={{ flex: 1, width: 20, height: 20 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={selectCategory?.id == item.id ? styles.item2 : styles.item}
              onPress={() => onSelectCategory(item)}
            >
              <Text
                style={
                  selectCategory?.id == item.id ? styles.text : styles.text2
                }
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={CategoryScrollable}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }

  const [state, setState] = useState();

  function renderMenu() {
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

  return (
    <SafeAreaView>
      {renderCategory()}
      {renderMenu()}
    </SafeAreaView>
  );
};

export default Scrollable;

export const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 15,
    backgroundColor: "white",
    width: 110,
    height: 45,
  },
  item2: {
    marginLeft: 22,
    marginRight: -15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 15,
    backgroundColor: "white",
    width: 110,
    height: 45,
    borderWidth: 0.5,
    borderColor: COLORS.secondary,
  },
  itemicon: {
    marginLeft: 22,
    marginRight: -15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    width: 63,
    height: 45,
  },
  itemicon2: {
    marginLeft: 22,
    marginRight: -15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    width: 63,
    height: 45,
    borderWidth: 0.5,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
    fontFamily: "Nunito Sans, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
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
  rendermenucontainer: {
    height: 200,
    backgroundColor: "#424242",
    overflow: "scroll",
  },
});

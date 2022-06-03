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
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Scrollable = () => {
  const promoData = [
    {
      id: "1",
      name: "Promo 1",
      price:'250000',
      recommended: false,
      duration: "30",
      description:"This is promo 1",
      uri: require("../icons/Banner1.jpg"),
    },
    {
      key: "2",
      name: "Promo 2",
      price:'550000',
      recommended: true,
      duration: "30",
      description:"This is promo 2",
      uri: require("../icons/Banner2.jpg"),
    },
  ];

  const [promos, setPromos] = useState(promoData);
  const navigation = useNavigation();

  function renderPromo() {
    const PromoScrollable = ({item}) => {
      
      return (
        <View style={styles.item}>
     
          <TouchableOpacity onPress={() =>
                    navigation.navigate("Restaurant", {
                      paramkey: item,
                    })
                  }>
            <Image
              source={{
                uri: item.uri,
              }}
              style={styles.itemPhoto}
              resizeMode="contain"
            />
          </TouchableOpacity>
     
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            horizontal
            data={promos}
            renderItem={PromoScrollable}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    );
  }
  return <SafeAreaView>{renderPromo()}</SafeAreaView>;
};
export default Scrollable;

const styles = StyleSheet.create({
  container: {},
  item: {
    marginLeft: 18,
    marginRight: -10,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  itemPhoto: {
    width: 374,
    height: 110,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#424242",
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

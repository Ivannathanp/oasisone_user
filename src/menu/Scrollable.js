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
import RnIncrementDecrementBtn from "react-native-increment-decrement-button";
import { TextInput } from "react-native-gesture-handler";

const Scrollable = ({ item }) => {
  const [text, setText] = useState(0);
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => alert("image clicked")}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.text}>
        <Text style={styles.menutext}>{item.name}</Text>
        <Text style={styles.menutext}>{item.price}</Text>
      </View>
      <View style={styles.cartcontainer}>
      <View style={text> 0 ? styles.cart : styles.cartactive}>
        <Pressable style={text> 0 ? styles.button : styles.buttonactive} onPress={() => {
          setText(text + 1);
        }} disabled={text == item.maxval ? true : false}>
          <Text style={text> 0 ? styles.buttontext : styles.buttontextactive}>+</Text>
        </Pressable>
        <View style={styles.text}>
          {text}
        </View>
        <Pressable style={text> 0 ? styles.button : styles.buttonactive} onPress={() => {
          setText(text - 1);
        }} disabled={text == 0 ? true : false}>
          <Text style={text> 0 ? styles.buttontext : styles.buttontextactive}>-</Text>
        </Pressable>
      </View>
      </View>
    </View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal={false}
                data={section.data}
                renderItem={({ item }) => <Scrollable item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            return null;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: "Gurame",
    data: [
      {
        key: "1",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
      {
        key: "2",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
      {
        key: "3",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
      {
        key: "4",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
      {
        key: "5",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
      {
        key: "6",
        name: "Item text 1",
        price: "Rp. 100,000",
        uri: require("../icons/Logo.png"),
        maxval: "10",
      },
    ],
  },
];

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
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    width: 374,
    height: 80,
    borderRadius: 20,
  },
  itemPhoto: {
    width: 88,
    height: 66,
    borderRadius: 15,
    marginTop: 7,
    marginBottom: 4,
    marginLeft: 10
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  menutext: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: 600,
    color: "#424242",
  },
  cart: {
    width: 80,
    height: 30,
    backgroundColor: "#E52C32",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    margin: 'auto',
    borderRadius: 20
  },
  cartactive: {
    width: 80,
    height: 30,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    margin: 'auto',
    borderRadius: 20
  },
  cartcontainer: {
    position: 'absolute',
    right: 5,
  },  
  button: {
    width:20,
    height:20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttonactive: {
    width:20,
    height:20,
    color: "black",
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttontext: {
    color: '#E52C32',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    margin: 'auto'
  },
  buttontextactive: {
    color: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    margin: 'auto'
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

import { Dimensions } from "react-native";
const {width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#FFFAF4",
    secondary: "#DF3030",
}

export const FONTS = {
    title: {fontFamily: "NunitoSans_700Bold", fontSize:14 },
    heading: {fontFamily: "NunitoSans_700Bold", fontSize: 16},
    text1: {fontFamily: "NunitoSans_600SemiBold", fontSize: 12},
    text2: {fontFamily: "NunitoSans_600SemiBold", fontSize: 14},
    h1: {fontFamily: "NunitoSans_700Bold", fontSize: 22},
    h3: {fontFamily: "NunitoSans_400Regular", fontSize: 14},
    h2: {fontFamily: "NunitoSans_700Bold", fontSize: 14},
}

const appTheme = {COLORS,FONTS};
export default appTheme;
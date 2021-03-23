import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#e63946",
    secondary: "#25282F",

    // colors
    black: "#1E1B1f",
    white: "#FFFFFF",
    lightGray: "#64676D",
    lightGray2: "#EFEFF0",
    lightGray3: '#D4D5D6',
    lightGray4: '#7D7E84',
    gray: "#2D3038",
    gray1: "#282C35",
    darkRed: "#31262F",
    lightRed: "#C5505E",
    darkBlue: "#22273B",
    lightBlue: "#424BAF",
    darkGreen: "#213432",
    lightGreen: "#4e9b8f",

};

export const LINK ={
    deleteFileURL:'http://bahadirtiras.com.tr/ogrenciEvi/delete/index.php?res=',
    imageUploadURL:'http://bahadirtiras.com.tr/ogrenciEvi/',
}
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 27,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "GoogleSans-Regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    bold: {fontFamily: "GoogleSans-Bold"},
    medium:{fontFamily: "GoogleSans-Medium"},
    regular:{ fontFamily: "GoogleSans-Regular",},

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
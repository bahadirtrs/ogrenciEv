import React from "react";
import {StyleSheet, Text, View} from "react-native";
import { COLORS, FONTS } from "../../constants";

const ShoppingItemTitle = (props) => {
  return (
    <View style={{borderBottomColor:'#cccccc90', borderBottomWidth:1, paddingVertical:5, marginHorizontal:props.status? 10: 20}} >
      <Text style={{fontSize:17, ...FONTS.medium, color:'#333'}} > {props.title} </Text>
      <Text style={{fontSize:10, ...FONTS.regular, color:'#888'}} > {props.titleDescription} </Text>
    </View>
  );
};

export default ShoppingItemTitle;

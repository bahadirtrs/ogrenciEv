import React, { useState } from "react";
import {Modal,StyleSheet,Alert,Text,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, SIZES} from '../../constants/theme';
const InfoModal = (props) => {

  return (
    <View >
    <TouchableOpacity activeOpacity={0.7} onPress={props.url} >
      <View style={styles.listContainer} >
        <View style={[styles.secondButton, {backgroundColor:props.color}]} >
          <Icon name={props.icon} size={20} color={'#fff'}/>
        </View>
        <View>
          <Text style={{...FONTS.medium, fontSize:16, marginLeft:10}}>{props.title}</Text>
          <Text style={{...FONTS.regular, color:'#555', fontSize:10, marginLeft:10, maxWidth:SIZES.width-150 }}>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({

 

  listContainer:{
      flexDirection:'row', 
      alignItems:'center', 
      backgroundColor:'#f1f1f1', 
      marginVertical:0,
      paddingLeft:15,
      paddingVertical:5,
      borderRadius:0, 
      borderBottomWidth:1, 
      width:SIZES.width, 
      borderBottomColor:'#e1e1e180',
      elevation:0.1,
    },
    secondButton:{
      flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:50,
    height:50,
    borderRadius:50,
    borderWidth:2, 
    borderColor:'#fff',
    backgroundColor:'#4e9b8f'
},
});

export default InfoModal;
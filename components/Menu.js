import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Image, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Menu(props) {
  return (
    <View style={styles.bigButtonContainerLeft}>
     
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} onPress={props.butonLeftPress}>
          <Icon name="arrow-back-outline" size={25} color="#fff" />
      </TouchableOpacity>
      <Text style={{color:'#fff', fontFamily:'GoogleSans-Medium', fontSize:18,}}>{props.pageName}</Text>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}} onPress={props.butonRightPress}>
          <Icon name="ellipsis-horizontal-outline" size={23} color="#fff" />
          
      </TouchableOpacity>

    </View>
  );
}
  const styles = StyleSheet.create({ 
    bigButtonContainerLeft:{
      flexDirection:'row',
      width:Dimensions.get('screen').width,
      backgroundColor:'#3c89ae00',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#4e9b8f',
      paddingVertical:10,
      paddingHorizontal:20,
      position:'relative',
    },
});
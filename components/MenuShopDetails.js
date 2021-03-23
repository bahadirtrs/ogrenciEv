import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Image, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteShopping from '../components/DeleteShopping';
import EditShopping from '../components/EditShopping';
import BackButton from '../components/Button/BackButton'

export default function MenuShopDetails(props) {
  return (
    <View style={styles.bigButtonContainerLeft}>     
      <BackButton icon={'arrow-back-outline'} />
      <Text></Text>
      <Text style={{color:'#fff', fontFamily:'GoogleSans-Medium', fontSize:18}}>{props.pageName}</Text>
      <View style={{flexDirection:'row'}}>
          <EditShopping icon={'create-outline'} data={props.data} />
          <DeleteShopping icon={'trash-outline'} data={props.data} />
      </View>
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
      paddingVertical:15,
      paddingHorizontal:20,
      position:'relative',
    },
});
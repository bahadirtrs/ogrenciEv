import React from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native';
import {COLORS, FONTS, SIZES } from "../../constants";


export default function HomeCodeItem(props) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescription}>{props.text}</Text>
            <TouchableOpacity style={styles.itemButton} onPress={props.butonPress} >
              <Text style={styles.itemButtonText} >{props.butonText} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flexDirection: 'column',  
      justifyContent:'center', 
      alignItems:'center', 
      paddingHorizontal:10, 
      paddingTop:5,
      backgroundColor:'#f1f1f1',
     
    },
    itemContainer:{
      width:'100%', 
      paddingHorizontal:10, 
      paddingVertical:10, 
      backgroundColor:'#fff', 
      borderRadius:7, 
      marginVertical:5,
      shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3
    },
    itemDescription:{
      ...FONTS.regular, 
      fontSize:14, 
      textAlign:'left', 
      paddingTop:10,
      marginHorizontal:5,
      color:'#555',
    },
    textInputStyle:{ 
      fontSize:16, 
      paddingHorizontal:10, 
      paddingVertical:5, 
      margin:10, 
      color:'#222', 
      ...FONTS.regular, 
      borderWidth:1, 
      borderColor:'#888', 
      borderRadius:5
    },
    itemButton:{
      backgroundColor:COLORS.lightGreen, 
      paddingVertical:10,
      paddingHorizontal:30, 
      borderRadius:5, 
      marginVertical:10,
      marginHorizontal:5
    },
    itemButtonText:{
      ...FONTS.regular, 
      color:'#fff', 
      textAlign:'center',
      fontSize:15
    }
  })
  

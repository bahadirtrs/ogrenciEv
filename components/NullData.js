import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function NullData() {
    return (
    <View style={styles.container} >
        <Icon style={{paddingVertical:20}} name={'notes-medical'} size={75} color={COLORS.lightGreen} />
        <Text style={styles.text} >Burada gösterecek bir alışveriş bulamadık! Hemen bir alışveriş girmeyi dene!</Text>
    </View> 

    )
}

const styles = StyleSheet.create({
    container:{
        height:'80%',
        justifyContent:'center', 
        alignItems:'center'},

    text:{
        paddingVertical:5,
        paddingHorizontal:70, 
        borderRadius:20,
        fontSize:SIZES.h4,
        ...FONTS.regular,
        textAlign:'center',
        color:COLORS.black
    },

    textTwo:{
        paddingVertical:0,
        paddingHorizontal:10, 
        borderRadius:20,
        fontSize:SIZES.h4, 
        ...FONTS.regular,
        textAlign:'center'
    },

    allShoppingText:{
        ...FONTS.regular, 
        color:COLORS.white
    },
})

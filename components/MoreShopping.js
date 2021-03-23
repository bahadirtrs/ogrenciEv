import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from 'react-native-reanimated';

export default function MoreShopping() {
    return (
        <View style={styles.container} >
        <TouchableOpacity style={styles.butonAllShopping} >
            <Text style={styles.allShoppingText}>Tüm Harcamaları İncele</Text>
        </TouchableOpacity>
    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        width:SIZES.width, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:20, 
        marginTop:10, 
        marginBottom:500
    },

    butonAllShopping:{
        paddingVertical:10,
        paddingHorizontal:30, 
        backgroundColor:COLORS.lightGreen, 
        borderRadius:20,
    },

    allShoppingText:{
        ...FONTS.regular, 
        color:COLORS.white
    },
})

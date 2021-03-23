import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet, Image } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

export default function ShoppingTitle(props) {
    return (
    <View style={styles.container}>
        <View style={styles.shoppingList} >
          <Text style={styles.shoppingTitle} >Yakındaki İşlemler</Text>
          <Text style={styles.shoppingCount} >{props.count} Adet</Text>
        </View>  
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingVertical:5,
    },

    shoppingTitle:{  
        color:COLORS.black,
        fontSize:16,
        ...FONTS.bold
    },

    shoppingCount:{ 
        ...FONTS.bold, 
        color: COLORS.black,
        fontSize:14,
    },
    shoppingList:{
        width:SIZES.width,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:10,
    },
    
})

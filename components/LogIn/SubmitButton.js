import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import { FONTS, SIZES, COLORS } from "../../constants/theme";

export default function Input(props) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.butonPress} style={styles.expContainer} >
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:SIZES.width,
        padding:15,
    },
    expContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:SIZES.width*0.8,
        backgroundColor:COLORS.lightGreen,
        marginVertical:0,
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:15,
        elevation:1,
    },
    text:{
        marginHorizontal:10, 
        fontSize:18,
        ...FONTS.regular,
        color:'#fff',
        paddingVertical:5,
       
    }
})


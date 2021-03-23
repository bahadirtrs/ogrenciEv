import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS, SIZES } from "../../constants/theme";



export default function ButtonLog(props) {
    return (
        <TouchableOpacity onPress={props.butonPress} style={[styles.container, {backgroundColor:props.backgroundColor}]} >
            <Icon name={props.icon}  size={20} color={props.iconColor} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:42,
        height:42,
        marginVertical:10,
        marginHorizontal:4,
        padding:10,
        borderRadius:16,
        elevation:1,
    },
    text:{
        ...FONTS.medium,
        fontSize:16,
        paddingLeft:10
    }

})


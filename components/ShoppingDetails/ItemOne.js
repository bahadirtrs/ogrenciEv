import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, SIZES} from '../../constants/theme';

export default function ItemOne(props) {
    return (
        <View style={styles.shopItem}>
            <Icon style={{width:40}} name={props.icon} size={30} color="#4e9b8f" />
            <View style={{ width:SIZES.width-80, paddingLeft:20}} >
                <Text style={styles.shopItemTitle}>{props.title}</Text>
                <Text style={styles.shopItemAns}>{props.answer}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    shopItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:SIZES.width, 
        backgroundColor:'#fff', 
        paddingVertical:5, 
        paddingHorizontal:10,
        elevation:0.5,
        marginVertical:4
    },
    shopItemAns:{
        ...FONTS.medium,
        fontSize:18,
        color:COLORS.black
    },
    shopItemTitle:{
        ...FONTS.regular,
        fontSize:16,
        paddingVertical:5,
        color:COLORS.black,
    },
})


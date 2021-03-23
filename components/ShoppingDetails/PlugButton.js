import React,{useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { COLORS, FONTS, SIZES} from '../../constants/theme';
import PlugShowModal from '../PlugShowModal'

export default function ItemOne(props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <>
        <PlugShowModal  
            profilePhotoName={props.imageUrl} 
            visible={modalVisible} 
            modalPress={()=>setModalVisible(!modalVisible)}
        />
        <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} activeOpacity={0.8} style={styles.shopItem}>
            <View style={{paddingLeft:20}} >
                <Text style={[styles.shopItemTitle, {color:COLORS.white}]}>Alışveriş Fişini Görüntüle</Text>
            </View>
        </TouchableOpacity>
    </>
    )
}
const styles = StyleSheet.create({
    shopItem:{
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center',
        width:SIZES.width*0.85, 
        backgroundColor:COLORS.lightGreen, 
        borderRadius:10, 
        padding:7, 
        marginVertical:5,
        marginTop:20,
        elevation:1
    },

    shopItemAns:{
        ...FONTS.regular,
        fontSize:20,
    },
    shopItemTitle:{
        ...FONTS.regular,
        fontSize:16,
        paddingVertical:5,
    },
})


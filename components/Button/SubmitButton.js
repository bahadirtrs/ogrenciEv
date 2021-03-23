import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {FONTS, SIZES } from '../../constants/theme';

export default function SubmitButton(props) {
    return (
    <View style={styles.container} >
        <TouchableOpacity style={styles.butonStyle} onPress={props.butonPress}>
            <Text style={styles.butonText}> {props.title} </Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:SIZES.width,
        justifyContent:'center', 
        alignItems:'center', 
        paddingTop:15,
        paddingVertical:5,
        paddingHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        
    },

    butonStyle:{
        justifyContent:'center', 
        alignItems:'center', 
        width:SIZES.width*0.85, 
        paddingVertical:8, 
        paddingHorizontal:20, 
        backgroundColor:'#4e9b8f', 
        borderRadius:7
    },
    butonText:{
        fontSize:16, 
        color:'#fff', 
        ...FONTS.regular
    }
})


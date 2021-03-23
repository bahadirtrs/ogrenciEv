import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import { FONTS } from "../../constants/theme";


export default function SingLoginButton(props) {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.butonPress} >
           <View style={{flexDirection:'row', paddingTop:50}} >
                <Text style={styles.orThenks}>{props.textOne}</Text>
                <Text style={styles.orThenks2}> {props.textTwo}</Text>
           </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    orThenks:{
        ...FONTS.regular,
        fontSize:14,
        color:'#333'
    },
    orThenks2:{
        ...FONTS.bold,
        fontSize:14,
        color:'#333'
    },
})

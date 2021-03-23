import React from 'react'
import { View, Text,StyleSheet,Alert } from 'react-native'
import { FONTS, SIZES } from "../../constants/theme";
import ButtonLog from '../../components/LogIn/ButtonLog'


export default function SocialLogin() {
    return (
        <>
            <Text style={styles.or} ></Text>
             <View style={{flexDirection:'row'}} >
                 <ButtonLog butonPress={()=>Alert.alert("Çok yakında")} icon={'logo-facebook'}
                        iconColor={'#fff'} backgroundColor={'#3b5998'}
                />
                    <ButtonLog butonPress={()=>Alert.alert("Çok yakında sizlerle")} icon={'logo-google'}
                        iconColor={'#fff'} backgroundColor={'#dd4b39'}
                />
                    <ButtonLog butonPress={()=>Alert.alert("Çok yakında")}icon={'logo-twitter'}
                        iconColor={'#fff'} backgroundColor={'#5baaf4'}
                />
            </View>
            <Text style={styles.or} >ile kaydolun!</Text>
        </>
    )
}
const styles = StyleSheet.create({
    or:{
        ...FONTS.regular,
        fontSize:14,
        color:'#333'
    },
})

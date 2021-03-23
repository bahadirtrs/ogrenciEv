import React, {useEffect, useState} from 'react'
import { View, Text,TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import { FONTS, SIZES, COLORS } from "../../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Input(props) {
    const [passView, setPassView]=useState(true)

    useEffect(() => {
        props.type=='1' 
        ? setPassView(true)
        : setPassView(false)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.expContainer} >
                <Icon name={props.icon} size={20} color={COLORS.lightGreen} />
                <TextInput
                    style={[styles.textInput, {fontSize:14}]}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#333'}
                    value={props.username}
                    onChangeText={props.setUsername}
                    textAlignVertical='auto'
                    secureTextEntry={passView ?true :false} 
                    autoCapitalize ={props.type==2 ? 'none' : 'words' } 
                    keyboardType='email-address'
                />
                {
                    props.type=='1' 
                    ? passView==true
                        ? <TouchableOpacity onPress={()=>setPassView(!passView)}  >
                            <Icon name={'eye'}  size={20} color={COLORS.lightGreen} />
                          </TouchableOpacity>
                        : <TouchableOpacity onPress={()=>setPassView(!passView)}  >
                            <Icon name={'eye-off'}  size={20} color={COLORS.lightGreen} />
                          </TouchableOpacity>
                    :<Icon name={props.icon}  size={20} color={'#f1f1f1'} />
                }

            </View>
         
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:SIZES.width,
        padding:4,
    },
    expContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#11111130',
        paddingVertical:3
    },
    textInput:{
        width:SIZES.width*0.65,
        marginHorizontal:10, 
        fontSize:16,
        ...FONTS.regular,
        color:'#000',
        paddingVertical:0
    }
})


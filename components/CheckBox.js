import React, {useState} from 'react'
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../constants/theme";

export default function CheckBox(props) {
    return (
        <View style={{flexDirection:'row', alignItems:'center', paddingVertical:1}} >
        { props.data 
            ? 
            <TouchableOpacity activeOpacity={1} onPress={props.dataPress} >
               <Icon name={'checkbox-outline'} size={20} color={COLORS.lightGreen}/>
            </TouchableOpacity>
            : 
            <TouchableOpacity activeOpacity={1} onPress={props.dataPress} >
                <Icon name={'square-outline'} size={20} color={COLORS.lightGreen}/>
            </TouchableOpacity> 
        }
    </View>
    )
}

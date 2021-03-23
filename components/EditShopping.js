import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

export default function EditShopping(props) {
    const navigation=useNavigation();

    return (
        <TouchableOpacity onPress={null} style={styles.container} >
            <Icon name={props.icon} size={25}  color ={'#fff'} solid/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingLeft:10
    }
})


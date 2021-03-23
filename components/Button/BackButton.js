import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

export default function DeleteShopping(props) {
    const navigation=useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}style={styles.container} >
            <Icon name={props.icon} size={25}  color ={'#fff'}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingRight:10
    }
})


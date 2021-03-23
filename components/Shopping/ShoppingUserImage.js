import React from 'react'
import { View, Text,Image, StyleSheet } from 'react-native';
import {COLORS, FONTS, SIZES } from '../../constants';


export default function ShoppingUserImage(props) {
    return (
        <View>
            <Image 
                source={{
                headers: {Pragma: 'no-cache'},
                uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+props.email+'.jpg'}}
                style={props.status?styles.imageSelected:styles.imageDontSelected}  
            />
          <Text style={{fontSize:12, textAlign:'center', ...FONTS.regular,color:'#000'}}>{(props.name.slice(0, props.name.lastIndexOf(" ")))}</Text>
        </View>
    )
} const styles = StyleSheet.create({
    imageSelected:{ 
        width:70, 
        height:70, 
        margin:3, 
        borderRadius:5, 
        borderWidth:2, 
        borderRadius:35, 
        borderColor:'#4e9b8f'
    },
    imageDontSelected:{ 
        width:60, 
        height:60, 
        margin:3, 
        borderRadius:5, 
        borderWidth:1, 
        borderRadius:30, 
        borderColor:'#ce4257'
    }
})


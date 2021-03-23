import React from 'react'
import { View, Text, TouchableOpacity, TextInput,StyleSheet  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS, FONTS, SIZES } from '../../constants';

export default function ShoppingHeader(props) {
    return (
        <View style={{ flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start', paddingVertical:0, paddingHorizontal:15, width:'70%'}} >
        <TouchableOpacity onPress={props.pressModal} style={{flexDirection:'row', alignItems:'center'}} >
           <Text style={{color:'#fff', ...FONTS.regular, fontSize:13}}> {props.shoppingUser} ödüyor</Text>
        </TouchableOpacity>
         <View style={{flexDirection:'row', paddingVertical:0, alignItems:'center'}} >
         <Text style={{fontSize:38, color:'#fff', ...FONTS.bold}}>₺</Text>
          <TextInput
             style={{width:'100%', fontSize:40, paddingHorizontal:0, paddingVertical:0, margin:0, color:'#fff', ...FONTS.bold}}
             placeholder={'0.00  '}
             value={String(props.shopSales)}
             placeholderTextColor={'#fff'}
             onChangeText={props.setShopSales}
             alignItems={'center'}
             keyboardType="decimal-pad"
             
            />
            
         </View>
         <View>
         <TextInput
           style={[styles.textInput, {fontSize:16}]}
           placeholder={'Alışveriş Adı'}
           placeholderTextColor={'#ffffff99'}
           value={props.shopName}
           multiline={true}
           onChangeText={props.setShopName}
         />
         </View> 
         <View>
         <TextInput
           style={[styles.textInput, {fontSize:14}]}
           placeholder={'Açıklama'}
           multiline={true}
           placeholderTextColor={'#ffffff99'}
           value={props.shopDescription}
           onChangeText={props.setShopDescription}
         />
         </View>             
       </View>
    )
}

const styles = StyleSheet.create({
    textInput:{ 
        width:SIZES.width*0.6,
        paddingVertical:1, 
        fontSize:16,
        borderBottomWidth:0.3,
        borderBottomColor:'#bbbbbb90',
        ...FONTS.regular,
        color:'#fff',
      },
})


import React from "react";
import {View, Text, StyleSheet, FlatList,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FONTS, SIZES} from '../../constants/theme';

export default function ItemOne(props) {
    return (
    <View style={{marginVertical:4}} >
        <View style={styles.shopItem} >
            <Icon style={{width:40}} name={props.icon} size={30} color="#4e9b8f" />
            <View style={{ width:SIZES.width-80, paddingLeft:20}} >
               <Text style={styles.shopItemTitle}>{props.title} </Text>
            </View>  
        </View>
        <View style={styles.shopItemUserList}>
        <FlatList
            data={props.answer}
            horizontal={true}
            style={{flexDirection:'row', paddingHorizontal:10}}
            keyExtractor={(item)=>item.key}
            renderItem={({ item }) => (
                item.selected ?
            <TouchableOpacity activeOpacity={0.8} style={{ width:50, margin:5, alignItems:'center', justifyContent:'center'}} >
                <Image 
                    source={{
                    headers: {Pragma: 'no-cache'},
                    uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+item.email+'.jpg'}}
                    style={{ width:55, height:55, margin:3, borderRadius:5, borderWidth:1, borderRadius:35, borderColor:'#4e9b8f'}}  />
                <Text style={{fontSize:12, textAlign:'center', ...FONTS.regular,color:'#000'}}>{(item.name.slice(0, item.name.lastIndexOf(" ")))}</Text>
            </TouchableOpacity>
            :null
            )}
            /> 
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    shopItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:SIZES.width, 
        backgroundColor:'#fff', 
        paddingTop:10, 
        elevation:0.5,
        
    },
    shopItemUserList:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:SIZES.width, 
        backgroundColor:'#fff', 
        elevation:0.5,
        paddingLeft:60,
    },

    shopItemAnsUser:{
        ...FONTS.regular,
        fontSize:12,
        paddingVertical:3
    },
    shopItemTitle:{
        ...FONTS.regular,
        fontSize:18,
        paddingVertical:5,
    },
    userList:{
        flexDirection:'row', 
        justifyContent:'flex-start',
        alignItems:'center', 
        marginVertical:4, 
        paddingVertical:3, 
        paddingHorizontal:7, 
        borderRadius:6,
        elevation:1,
    },
})


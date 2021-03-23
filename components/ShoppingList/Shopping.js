import React, {useEffect,useState} from 'react'
import { View, Text,TouchableOpacity, StyleSheet, Image } from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import {useNavigation} from '@react-navigation/native'

export default function Shopping({data,userName}) {
    const navigation=useNavigation();
    const[sales, setSales]=useState(false);

    useEffect(() => {
        for (let i = 0; i<data.users.length; i++) {
            if(data.users[i].name==userName){
                if(data.users[i].selected==true ){
                    setSales(true)
                }else{
                    setSales(false)
                }
            }
        }
    })

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.push('Detay',{data:data})}  >
        <View style={styles.container} >
            <View style={{}}>
                { data && data.type=='1'
                ?    <Image style={{width:65,height:65, marginRight:10, borderBottomLeftRadius:5,  borderTopLeftRadius:5 }} source={require('../../assets/images/shop.png')} />
                : data && data.type=='2'
                    ? <Image style={{width:65,height:65, marginRight:10, borderBottomLeftRadius:5,  borderTopLeftRadius:5 }} source={require('../../assets/images/fatura.png')} />
                    : <Image style={{width:65,height:65, marginRight:10, borderBottomLeftRadius:5,  borderTopLeftRadius:5 }} source={require('../../assets/images/borc.png')} />

                }
            </View>
            
            <View style={{flex:8}}>
                <Text style={styles.shoppingMarket}>{data && data.shoppingName.length<22 ? data.shoppingName :  (data.shoppingName.slice(0,22)+"..." ) } </Text>
                <Text style={styles.shoppingDate}>21 Kasım 2021, Cmrtsi</Text>
                <View style={{flexDirection:'row'}} >    
                            {data.users && data.users.map((data) => {
                        return (
                            data && data.selected ?
                                <View style={{flexDirection:'row'}} key={data.key}>
                                    <Text style={styles.shopItemAnsUser}>{(data.name.slice(0, data.name.lastIndexOf(" ")))}, </Text>   
                                </View>
                            :null
                        )
                    })}
                </View>  
            </View>
            <View style={{flex:5}}>
            {
                (data.name==userName && sales==true)
                ?
                <View style={{minWidth:100, alignItems:'flex-end' }} >
                    <Text style={styles.amountMarket}>+{data && (data.sales-data.salesExp).toFixed(1)} ₺</Text>
                </View>
                :
                sales==true 
                ?
                <View style={{minWidth:100, alignItems:'flex-end' }} >
                    <Text style={styles.amountMarketTwo}>-{data && data.salesExp.toFixed(1)} ₺</Text>
                </View>
                :
                <View style={{minWidth:100, alignItems:'flex-end' }} >
                    <Text style={[styles.amountMarketTwo, {color:'#555'}]}>0.00₺</Text>
                </View>
            }
            </View>
     
      </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:10,
        backgroundColor:COLORS.white,
        borderRadius:7,
        marginVertical:5,
        marginHorizontal:7,
        elevation:1,

    },

    shoppingTitle:{  
        color:COLORS.black,
        fontSize:18,
        ...FONTS.bold
    },

    shoppingCount:{ 
        ...FONTS.bold, 
        color: COLORS.black,
        fontSize:16,
    },
    shoppingList:{
        width:SIZES.width,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:10,
    },
    shoppingItem:{
        width:SIZES.width-20,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        paddingBottom:10,
        marginHorizontal:10,
        paddingVertical:10,
        backgroundColor:COLORS.white,
        borderRadius:7,
        padding:10,
        elevation:1
    },

    shopItemAnsUser:{
        color:COLORS.black,
        fontSize:12,
        ...FONTS.regular
    },

    shoppingMarket:{
        color:COLORS.black,
        fontSize:16,
        ...FONTS.medium
    },

    shoppingUser:{
        color:COLORS.black,
        fontSize:12,
        ...FONTS.regular
    },

    shoppingDate:{
        color:COLORS.black,
        fontSize:13,
        ...FONTS.regular
    },

    amountMarket:{
        fontSize:18,
        ...FONTS.bold,
        color:COLORS.lightGreen,
    },

    amountMarketTwo:{
        fontSize:18,
        ...FONTS.bold,
        color:COLORS.primary,
    },

    headerButton:{
        backgroundColor:'#f1f1f1',
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:5
    },

    butonText:{
        ...FONTS.regular,
        fontSize:SIZES.h3
    }
})

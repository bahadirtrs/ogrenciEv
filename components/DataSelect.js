import React, {useState} from 'react'
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import {FONTS, SIZES } from '../constants';
import DatePicker from 'react-native-date-picker'
const options={weekday:'long', year:'numeric', month:'long', day:'numeric'};
import moment from 'moment'
import 'moment/locale/tr'  
moment.locale('tr')

export default function DataSelect(props) {
    const[up, setUp]=useState('Değiştirmek için dokunun')
    const[dateExp,setDateExp]=useState(true);

    const DateExp=()=>{
        setDateExp(!dateExp)
        if(dateExp)
        setUp("Küçültmek için dokunun")
        else
        setUp("Değiştirmek için dokunun")
    }
    return (
        <View style={styles.container} >
        <View style={styles.bordContainer} >
        <TouchableOpacity activeOpacity={0.9} onPress={()=>DateExp()}  style={styles.openPress} >
          <Text style={styles.title}>Fatura ödeme tarihini seçiniz</Text>
          <Text style={styles.titleDes}>{up}</Text>
        </TouchableOpacity>
         { dateExp
           ? <TouchableOpacity onPress={()=>DateExp()} >
                 <Text style={styles.date}>
                     {props.shopDate && moment(props.shopDate).format('LL')}{' '}
                     {props.shopDate && moment(props.shopDate).format('dddd')}{' '}
                     {props.shopDate && moment(props.shopDate).format('LT')} 
                </Text>
             </TouchableOpacity>
           :<View style={{justifyContent:'center', alignItems:'center'}} >
               <Text style={styles.dateOn}>
                     {props.shopDate && moment(props.shopDate).format('LL')}{' '}
                     {props.shopDate && moment(props.shopDate).format('dddd')}{' '}
                     {props.shopDate && moment(props.shopDate).format('LT')} 
                </Text>
                <DatePicker
                date={props.shopDate}
                onDateChange={props.setShopDate}
                locale={'tr'}
                textColor={'#555'}
                androidVariant="nativeAndroid"
                />                
           </View>
         }
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
        container:{
          width:SIZES.width, 
          paddingVertical:5,
          paddingHorizontal:10,
          paddingTop:5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      

    bordContainer:{ 
        elevation:1, 
        backgroundColor:'#fff', 
        paddingVertical:10, 
        paddingHorizontal:20, 
        borderRadius:10, 
        alignItems:'flex-start', 
        justifyContent:'flex-start'
    },
    openPress:{
        borderBottomColor:'#cccccc90', 
        borderBottomWidth:1, 
        paddingVertical:5, 
        width:'100%'
    },

    title:{
        fontSize:16, 
        ...FONTS.medium, 
        color:'#333'
    },
    titleDes:{
        fontSize:10, 
        ...FONTS.regular, 
        color:'#888'
    },
    date:{
        fontSize:20, 
        ...FONTS.regular, 
        color:'#333', 
        paddingVertical:10
    },
    dateOn:{
        fontSize:18, 
        ...FONTS.regular, 
        color:'#333', 
        paddingTop:10
    },
    closeButton:{
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'#118ab3',
        width:SIZES.width*0.85, 
        paddingVertical:10, 
        paddingHorizontal:30, 
        borderRadius:10
    },
    closeText:{
        fontSize:16, 
        color:'#fff', 
        ...FONTS.regular
    }
})


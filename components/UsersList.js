import React from 'react'
import {View, StatusBar, StyleSheet, Alert, Text,SafeAreaView, FlatList, Image, TextInput, TouchableOpacity, TouchableOpacityBase, ScrollView} from 'react-native';
import {FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function UsersList(props) {
    return (
        <View style={styles.container} >
        <View style={{ elevation:1,  backgroundColor:'#fff', paddingVertical:10, paddingHorizontal:20, borderRadius:10, alignItems:'flex-start', justifyContent:'flex-start'}} >
        <TouchableOpacity style={{borderBottomColor:'#cccccc90', borderBottomWidth:1, paddingVertical:5, width:'100%'}} >
          <Text style={{fontSize:16, ...FONTS.medium, color:'#333'}} >Ödeme Detayları</Text>
          <Text style={{fontSize:10, ...FONTS.regular, color:'#888'}} >Kişi başına düşen ödeme tutarlarını görüntüleyin</Text>
        </TouchableOpacity>
          {  props.usersss!='' && props.shopSales? 
            <FlatList
              data={props.usersss}
              style={{flexDirection:'row', width:SIZES.width}}
              keyExtractor={item=>item.toString()}
              renderItem={({item }) => (
                <View style={{width:SIZES.width*0.85, flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10, paddingVertical:6, borderBottomWidth:0.5, borderBottomColor:'#cccccc90'}} >
                  <Text  style={{color:'#333', textAlign:'left', ...FONTS.bold,maxWidth:60, minWidth:60}}>{item}</Text>
                  <View style={{flexDirection:'row'}} >
                     <Icon name={'angle-double-right'} size={20} color={'#4e9b8f'} />
                  </View>
                  <View style={{paddingVertical:5, width:100, borderColor:'#4e9b8f', borderWidth:1, borderRadius:5, justifyContent:'center', alignItems:'center'}} >
                  <Text style={{ color:'#4e9b8f',fontSize:15, textAlign:'center', ...FONTS.bold,maxWidth:80, minWidth:80}} >{(props.shopSales/props.usersss.length).toFixed(2)} ₺</Text>
                  </View>
                  <View style={{flexDirection:'row'}} >
                     <Icon name={'angle-double-right'} size={20} color={'#4e9b8f'} />
                  </View>
                  <Text style={{color:'#333', textAlign:'left', ...FONTS.bold,maxWidth:70, minWidth:70}}> {} {(props.shoppingUser.slice(0, props.shoppingUser.lastIndexOf(" "))) }</Text>
              </View>
              )}
              
            /> 
            :
            !props.shopSales ?
            <View style={{width:SIZES.width*0.85, flexDirection:'row', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}} >
              <Text style={{color:'#555', textAlign:'center', ...FONTS.regular}} >Hesaplama yapılamabilmesi için alışveriş tutarını girmeniz gerekmektedir.</Text>
            </View>
            :
            <View style={{width:SIZES.width*0.85, flexDirection:'row', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}} >
              <Text style={{color:'#555', textAlign:'center', ...FONTS.regular}} >Faturaya dahil olan kullanıcıları seçtiğinizde kişi başına düşen tutar burada görüntülenecektir.</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  }
})


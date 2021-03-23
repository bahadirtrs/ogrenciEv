import React, {useState, useEffect} from"react";
import {View, StatusBar,Text, SafeAreaView,ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import Header from '../components/Header';
import Shopping from '../components/ShoppingList/Shopping';
import ShoppingTitle from '../components/ShoppingTitle';
import MoreShopping from '../components/MoreShopping';
import NullData from '../components/NullData'
import {COLORS, FONTS, SIZES } from "../constants";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeCodeItem from '../components/Entry/HomeCodeItem'
import AccountItem from '../components/Entry/AccountItem'

function Entry({ route, navigation }) {
  const [tetik, setTetik]=useState(true)
  const [mail, setMail]=useState("denme");
  const [userInfo, setUserInfo] =useState([]);

    useEffect(() => {
      getData()
     }, [tetik])

     const getData = async () => {
       try {
         const value = await AsyncStorage.getItem('username')
         if(value !== null) {
           setMail(value)
           UserInfo(value)
         }else{
          setTetik(false)
         }
       } catch(e) {
         // error reading value
       }
     }

     const UserInfo =(value)=>{
      const subscriber = firestore()
        .collection('Users').doc(value)
        .onSnapshot(querySnapshot => {
          setUserInfo(querySnapshot.data())
        });
          return () => subscriber();
    }

    return (
      <View style={{backgroundColor:COLORS.lightGreen}} >
      <StatusBar backgroundColor={COLORS.lightGreen} barStyle="dark-content" />
      <SafeAreaView backgroundColor={COLORS.lightGreen}/>
      <ScrollView>
        <View style={{ justifyContent:'center', alignItems:'center', paddingVertical:40, paddingHorizontal:20, backgroundColor:COLORS.lightGreen,}} >
            <Icon name={'beer-outline'} size={80} color={'#fff'} />
            <Text style={{...FONTS.medium, fontSize:28, color:'#fff', paddingTop:5}}>Merhaba {(userInfo.name && userInfo.name.slice(0, userInfo.name.lastIndexOf(" ")))}</Text>
            <Text style={{...FONTS.regular, color:'#fff',fontSize:14, textAlign:'center', paddingTop:10}}> Öğrenci evi senin ve ev arkadaşlarının harcamaları düzenli şekilde yönetmek için oluştuturulmuş bir mobil uygulamadır. </Text>
        </View>
        <View style={styles.container}>
          <Text style={{...FONTS.bold,fontSize:18, paddingVertical:10, color:'#555'}} >Ne Yapmak İstersin?</Text>
          <HomeCodeItem data={userInfo} />
          <AccountItem butonPress={()=>navigation.replace('HomeAccountCreate', {data:userInfo})} text={'Eğer evinde hiç kimse uygulamayı yüklememişse Ev hesabı oluşturabilir ve arkadaşlarını davet edebilirsin.'} butonText={'Ev Hesabı Oluştur'} />
          <AccountItem butonPress={()=>navigation.replace('Home')} text={'İstersen  ev hesabına katılmadan uygulamayı kişisel olarak kullanabilirsin.'} butonText={'Kişisel Hesap olarak kullan'} />
          <View  style={{paddingVertical:20, justifyContent:'center', alignItems:'center'}} >
            <Text style={{...FONTS.regular, color:'#666'}} >Nasıl kullanacağını bilmiyor musun?</Text>
            <Text style={{...FONTS.bold,color:'#222'}} >Hemen Öğren</Text>
          </View>
        </View>

      </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10,
    paddingTop:5,
    backgroundColor:'#f1f1f1',
    paddingBottom:20,
  },

})


export default Entry;

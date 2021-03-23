import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Platform, Alert } from 'react-native';
import {COLORS, FONTS, SIZES } from "../../constants";
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native'

export default function HomeCodeItem(props) {
  const navigation=useNavigation();
    const [homeCode, setHomeCode] = useState("")
    const [lock, setLock] = useState(true)

    const HomeJoin = ()=>{
        firestore()
        .collection('accounts').doc(homeCode)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);
          if (documentSnapshot.exists && lock) {
            firestore()
            .collection('accounts').doc(homeCode)
            .collection('users').doc()
            .set({
                name:props.data.name,
                email:'p'+props.data.email,
                selected:false,
                date:firestore.FieldValue.serverTimestamp(),
                manager:false
            })
                .then(() => {
                  firestore()
                   .collection('Users').doc(props.data.email)
                   .update({
                    hesapID:homeCode,
                });
                    setLock(false)
                    navigation.navigate('Home')
                });
          }else{
              Alert.alert('Hay Aksi!!', "Bir şeyhler ters gitti. Lütfen girdiğin bilgileri kontrol et.")
          }
        });
    }
    return (
        <View style={styles.itemContainer} >
          <Text style={styles.itemDescription}>Arkadaşlarından birisi uygulamayı yüklemiş ve Ev Hesabı oluşturmuşsa o hesaba katılabilirsin.</Text>
            <TextInput
              style={[styles.textInputStyle, {borderColor:homeCode.length==0 ? '#888' : homeCode.length>5 ? COLORS.lightGreen: COLORS.primary}]}
              placeholder={'6 haneli ev hesabı kodunu giriniz'}
              value={homeCode}
              placeholderTextColor={'#888'}
              onChangeText={setHomeCode}
              alignItems={'center'}
              keyboardType="name-phone-pad"
          />
            {homeCode.length>5 ?
            <View>
            <TouchableOpacity style={styles.itemButton} onPress={()=>HomeJoin()} >
                <Text style={styles.itemButtonText} >Hesaba katıl</Text>
              </TouchableOpacity>
            </View>
            :null
            }
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
     
    },
    itemContainer:{
        width:'100%', 
        paddingHorizontal:10, 
        paddingVertical:10, 
        backgroundColor:'#fff', 
        borderRadius:7, 
        marginVertical:5,
        shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.15,
          shadowRadius: 3,
          elevation: 3
    },
    itemDescription:{
        ...FONTS.regular, 
        fontSize:14, 
        textAlign:'left', 
        paddingTop:10,
        marginHorizontal:5,
        color:'#555'
      },
    textInputStyle:{ 
      fontSize:16, 
      paddingHorizontal: 10,
      paddingVertical:Platform.OS==='ios'? 10:5,  
      marginVertical:10,
      marginHorizontal:5, 
      color:'#222', 
      ...FONTS.regular, 
      borderWidth:0.5, 
      borderColor:'#888', 
      borderRadius:5,
      backgroundColor:'#fff'
    },
    itemButton:{
        backgroundColor:COLORS.lightGreen, 
        paddingVertical:10,
        paddingHorizontal:30, 
        borderRadius:5, 
        marginVertical:10,
        marginHorizontal:5,
    },
    itemButtonText:{
      ...FONTS.regular, 
      color:'#fff', 
      textAlign:'center',
      fontSize:15
    }
  })
  

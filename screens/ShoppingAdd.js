import React, {useEffect, useState} from "react";
import {View, StyleSheet, Alert,SafeAreaView, FlatList, Modal, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES } from '../constants';
import DataSelect from '../components/DataSelect';
import UsersList from '../components//UsersList';
import SubmitButton from '../components/Button/SubmitButton'
import firestore from '@react-native-firebase/firestore';
import { LogBox } from 'react-native';
import Menu from '../components/Menu';
import PlugUpload from '../components/PlugUpload'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ShoppingHeader from '../components/Shopping/ShoppingHeader'
import ShoppingItemTitle from '../components/Shopping/ShoppingItemTitle';
import ShoppingUserImage from '../components/Shopping/ShoppingUserImage'

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const ShoppingAdd = ({ route, navigation }) => {
  const [shoppingUser, setshoppingUser] = useState("")
  const [shopName,setShopName]=useState("");
  const [shopSales,setShopSales]=useState("");
  const [shopDescription,setShopDescription]=useState("");
  const [shopDate, setShopDate]=useState(new Date());
  const [userss, setUserss]=useState([])
  const [usersss,setUsersss]=useState([])
  const [error,setError]=useState("deneme");
  const [plugUrl, setPlugUrl]=useState(Math.floor(Math.random() * 1000000000) + 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageOk, setImageOk] = useState(false);
  const [userListModal, setuserListModal] = useState(false)
  const [trigger, setTrigger]=useState(true)
  const [userInfo, setUserInfo] =useState([]);

  useEffect(() => {
    getData()
   }, [trigger])
   
   const getData = async () => {
    console.log("1.adım", userInfo.hesapID)
     try{ const value = await AsyncStorage.getItem('username')
        if(value !== null){
          firestore().collection('Users').doc(value)
          .onSnapshot(querySnapshot => {
            setUserInfo(querySnapshot.data())
            setshoppingUser(querySnapshot.data().name)
            UserList(querySnapshot.data().hesapID)
          });
        }
        else{
          setTrigger(false)}
     }catch(e){}
   }

    const UserList= (userInfom)=> {
      console.log("2.adım", userInfo.hesapID)
      // usersss.push("Bahadır") 
      //Başlangıçta hesap sahibinin alışverişte seçili olması için
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      //Firestore da hesapa bağlı olan kullanıcıları Listeleme fonksiyonu
        const subscriber = firestore()
          .collection('accounts').doc(userInfom)
          .collection('users')
          .onSnapshot(querySnapshot => {
            const dey = [];
            querySnapshot.forEach(documentSnapshot => {
              dey.push({
                key:documentSnapshot.id,
                name:documentSnapshot.data().name,
                //selected:documentSnapshot.data().name=='Bahadır Tıraş' ? true : false,
                //Başlangıçta hesap sahibinin alışverişte seçili olması için
                selected:documentSnapshot.data().selected,
                email:documentSnapshot.data().email,
              })
            });
            setUserss(dey)
          });
        return () => subscriber();
      }

  const ShoppingAdd = () =>{
    //Firestore a veri ekleme fonksiyonu
    if(shopName && shopSales && usersss.length>0){
      firestore()
      .collection('accounts').doc(userInfo.hesapID)
      .collection('shopping').doc()
        .set({
          shoppingName:shopName,
          shopDescription:shopDescription,
          name:shoppingUser,
          sales:shopSales/1,
          salesExp:shopSales/usersss.length/1,
          date:shopDate,
          image: imageOk ? plugUrl :'noData',
          type:"1",
          users:userss,
          dateOfRegistration:firestore.FieldValue.serverTimestamp(),
          hesapID:userInfo.hesapID
        })
        .then(() => {
          navigation.push('Home')
        });
    }else{
      var error= []
      if(shopName=="") error.push(' alışveriş adı')
      if(shopSales==0) error.push(' alışveriş tutarı')
      if(usersss.length==0) error.push(' alışverişe dahil olan kişiler')
      setError(error);
      Alert.alert(
        "Alışveriş kaydedilemedi",
        `Lütfen${error} ${error.length==1 ?'alanını':'alanlarını'} kontrol ediniz.`,
          [{ text: "Tamam",onPress: null,}],
      );
    }
    
  }

const Ekle = (value, key)=>{
  // Özünde ortak hesap kullnıcılarını belirginleşirmeye yarasa da, sonraları kullanıcı sayısını saymaya yaradı. 
  // Bu fonksiyon dünya için küçük, uygulama için çok büyük bir adımdır..
    let sayac=0;
    let bosluk=(value.lastIndexOf(" "));
    value=value.slice(0, bosluk);
    const listItems = usersss.map((number) =>(
      number==value ? sayac++ : null
    ));
    if(sayac>0){
      const index = usersss.indexOf(value);
      if (index > -1) {usersss.splice(index, 1)}
    }else{
      usersss.push(value)}
      LocalExp(key)
      console.log(usersss)
  }

  useEffect(() => {
    // tutar hesaplamada ,(virgül) kullanılınca sorun çıkıyor
    // shopSales'teki virgüller notaya çevrildi.
    let sales=shopSales.replace(",", ".")
    setShopSales(sales)
  }, [shopSales])

  const LocalExp =(key)=>{
    //Hesaptaki kullanıcıları yeni bir Array e atarak, ortak kullanım sağlandı.
    const elementsIndex = userss.findIndex(element => element.key == key )
    let newArray = [...userss]
    newArray[elementsIndex] = {...newArray[elementsIndex], selected: !newArray[elementsIndex].selected}
    setUserss(newArray)
  }

  const ImageOk =()=>{
    //Fotoğrafın yüklü olup olmadığını kontrol ediyor eğer yüklüyse 
    //veritabanına img valuesunu yazmaya izin veriyor.
    setImageOk(true)
    setModalVisible(!modalVisible)
  }

  const ImageNot =()=>{
    //Fotoğrafın yüklü olup olmadığını kontrol ediyor eğer yüklü değilse
    //veritabanına image alanına 'noData' yazmaya izin veriyor.
    setImageOk(false)
    setModalVisible(!modalVisible)
  }

  const ShoppingUserName = (name)=>{
    setshoppingUser(name)
    setuserListModal(!userListModal)
  }

  return (
    <>
    <SafeAreaView backgroundColor='#4e9b8f' /> 
    <StatusBar backgroundColor={modalVisible ? '#366a62': '#4e9b8f'} barStyle="dark-content" />
    <View style={styles.container} >
      <Menu pageName={'Alışveriş Ekle'} butonLeftPress={() => navigation.goBack()} butonRightPress={null} />
      <ScrollView>
          <View style={styles.headerContainer} >
            <PlugUpload 
              profilePhotoName={plugUrl} 
              mail={"bhdrtrs"}
              visible={modalVisible} 
              modalPress={()=>setModalVisible(!modalVisible)}
              imageOk={()=>ImageOk()}
              imageNot={()=>ImageNot()}
            />
            <ShoppingHeader 
              shoppingUser={shoppingUser} pressModal={()=>setuserListModal(!userListModal)}
              shopSales={shopSales} setShopSales={(text)=>setShopSales(text)}
              shopName={shopName} setShopName={(text)=>setShopName(text)}
              shopDescription={shopDescription} setShopDescription={(text)=>setShopDescription(text)}
            />
          </View>
          <View style={{backgroundColor:'#f1f1f1', paddingBottom:100}} >
          <View style={[{width:SIZES.width, paddingVertical:5, paddingHorizontal:10},styles.iosShadow]} >
            <View style={{ backgroundColor:'#fff', elevation:1, paddingVertical:10, borderRadius:10}} > 
              <ShoppingItemTitle title={'Alışverişe dahil olanlar '}
                titleDescription={'Ev arkadaşlarınızdan alışverişe dahil olanlara dokunun.'}/>     
              <View style={{flexDirection:'row', paddingVertical:0, paddingHorizontal:10, height:100}}>
                <FlatList
                    data={userss}
                    horizontal={true}
                    style={{flexDirection:'row', paddingHorizontal:10}}
                    keyExtractor={(item)=>item.key}
                    renderItem={({ item }) => (
                      item.selected
                    ? <TouchableOpacity activeOpacity={0.9}  onPress={()=>Ekle(item.name,item.key)} style={{ width:60, margin:6, alignItems:'center', justifyContent:'center'}} >
                        <ShoppingUserImage status={true} email={item.email} name={item.name}/>
                      </TouchableOpacity>
                    : <TouchableOpacity activeOpacity={0.9} onPress={()=>Ekle(item.name,item.key)} style={{ width:60, margin:6, alignItems:'center', justifyContent:'center'}} >
                        <ShoppingUserImage status={false} email={item.email} name={item.name}/>
                      </TouchableOpacity>
                    )}
                /> 
              </View>
            </View>
          </View>  
          <UsersList usersss={usersss} shoppingUser={shoppingUser} shopSales={shopSales}/>
          <DataSelect shopDate={shopDate} setShopDate={setShopDate}/>
          <SubmitButton title={"Alışveriş Ekle"}butonPress={()=>ShoppingAdd()} />
        </View>
      </ScrollView>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={userListModal}
        onRequestClose={() => setuserListModal(!userListModal)}
      >
      <TouchableOpacity onPress={()=>setuserListModal(!userListModal)} >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity activeOpacity={1} style={{}}  >
          <ShoppingItemTitle title={'Alışverişi kim yaptı?'} 
            titleDescription={'Hesaplamalar seçtiğiniz kullanıcı üzerinden yapılacaktır'} status={true}/>  
          <FlatList
            data={userss}
            horizontal={true}
            style={{flexDirection:'row', paddingHorizontal:10}}
            keyExtractor={(item)=>item.key}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} onPress={()=>ShoppingUserName(item.name)} style={{margin:3, alignItems:'center', justifyContent:'center'}} >
                <ShoppingUserImage status={false} email={item.email} name={item.name}/>
              </TouchableOpacity>
            )}/>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </Modal>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container:{ 
        width:SIZES.width,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor:COLORS.lightGreen
    },

    headerContainer:{ 
      flexDirection:'row', 
      width:SIZES.width, 
      justifyContent:'space-between', 
      paddingBottom:30, 
      paddingTop:25, 
      paddingHorizontal:20, 
      backgroundColor:'#4e9b8f', 
      marginBottom:5
    },

    textInput:{ 
      width:SIZES.width*0.6,
      paddingVertical:1, 
      fontSize:16,
      borderBottomWidth:0.3,
      borderBottomColor:'#bbbbbb90',
      ...FONTS.regular,
      color:'#fff',
    },

    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      backgroundColor:'#00000050',
      width:SIZES.width,
      height:SIZES.height,
    },
    modalView: {
      paddingVertical:10,
      height:160,
      width:SIZES.width*0.8,
      backgroundColor: "white",
      borderRadius: 10,
      justifyContent:'center',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    iosShadow:{
      shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
    }
})
export default ShoppingAdd;
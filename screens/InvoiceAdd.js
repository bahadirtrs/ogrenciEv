import React, {useEffect, useState} from "react";
import {View, StyleSheet, Alert, Text,SafeAreaView, FlatList, Image, TextInput, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES } from '../constants';
import DataSelect from '../components/DataSelect';
import UsersList from '../components//UsersList';
import SubmitButton from '../components/Button/SubmitButton'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import Menu from '../components/Menu';
import PlugUpload from '../components/PlugUpload'
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const InvoiceAdd = ({ route, navigation }) => {
  const [shopName,setShopName]=useState("");
  const [shopSales,setShopSales]=useState("");
  const [shopDescription,setShopDescription]=useState("");
  const [shopDate, setShopDate]=useState(new Date());
  const [shopImage,setShopImage]=useState(null);
  const [userss, setUserss]=useState([])
  const [usersss,setUsersss]=useState([])
  const [shopping, setShopping] = useState([]); 
  const [error,setError]=useState("deneme");
  const [plugUrl, setPlugUrl]=useState(Math.floor(Math.random() * 1000000000) + 1);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageOk, setImageOk] = useState(false);

    useEffect(() => {
      // usersss.push("Bahadır") 
      //Başlangıçta hesap sahibinin alışverişte seçili olması için
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      //Firestore da hesapa bağlı olan kullanıcıları Listeleme fonksiyonu
        const subscriber = firestore()
          .collection('accounts').doc('hesapID')
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
      }, []);

  const ShoppingAdd = () =>{
    //Firestore a veri ekleme fonksiyonu
    if(shopName && shopSales && usersss.length>0){
      firestore()
      .collection('accounts').doc('hesapID')
      .collection('shopping').doc()
        .set({
          shoppingName:shopName,
          shopDescription:shopDescription,
          name:'Cem Karaca',
          sales:shopSales/1,
          salesExp:shopSales/usersss.length/1,
          date:shopDate,
          image: imageOk ? plugUrl :'noData',
          type:"1",
          users:userss,
          dateOfRegistration:firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          navigation.push('Home')
        });
    }else{
      var error= []
      if(shopName=="") error.push(' fatura adı')
      if(shopSales==0) error.push(' fatura tutarı')
      if(usersss.length==0) error.push(' faturaya dahil olan kişiler')
      setError(error);
      Alert.alert(
        "Fatura kaydedilemedi",
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
    )
  );
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

    return (
      <>
      <SafeAreaView backgroundColor='#4e9b8f' /> 
      <StatusBar backgroundColor={modalVisible ? '#366a62': '#4e9b8f'} barStyle="dark-content" />

      <View style={styles.container} >
      <Menu pageName={'Fatura Ekle'} butonLeftPress={() => navigation.goBack()} butonRightPress={/*()=>ShoppingAdd()*/null} />
        <ScrollView>
            <View style={{ flexDirection:'row', width:SIZES.width, justifyContent:'space-between', paddingBottom:30, paddingTop:25, paddingHorizontal:20, backgroundColor:'#4e9b8f', marginBottom:5}} >
            <PlugUpload 
              profilePhotoName={plugUrl} 
              mail={"bhdrtrs"}
              visible={modalVisible} 
              modalPress={()=>setModalVisible(!modalVisible)}
              imageOk={()=>ImageOk()}
              imageNot={()=>ImageNot()}
             />
              <View style={{ flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start', paddingVertical:0, paddingHorizontal:15, width:'70%'}} >
               <View style={{flexDirection:'row', alignItems:'center'}} >
                  <Icon name={'edit'} size={12} color={'#fff'}/>
                  <Text style={{color:'#fff', ...FONTS.regular, fontSize:13}}> Bahadır Tıraş ödeyecek</Text>
               </View>
                <View style={{flexDirection:'row', paddingVertical:0, alignItems:'center'}} >
                <Text style={{fontSize:38, color:'#fff', ...FONTS.bold}}>₺</Text>
                 <TextInput
                    style={{width:'100%', fontSize:40, paddingHorizontal:0, paddingVertical:0, margin:0, color:'#fff', ...FONTS.bold}}
                    placeholder={'0.00  '}
                    value={String(shopSales)}
                    placeholderTextColor={'#fff'}
                    onChangeText={(text)=>setShopSales(text)}
                    alignItems={'center'}
                    keyboardType="decimal-pad"
                    
                    
                   />
                   
                </View>
                <View>
                <TextInput
                  style={[styles.textInput, {fontSize:16}]}
                  placeholder={'Fatura Adı'}
                  placeholderTextColor={'#ffffff99'}
                  value={shopName}
                  multiline={true}
                  onChangeText={(text)=>setShopName(text)}
                />
                </View> 
                <View>
                <TextInput
                  style={[styles.textInput, {fontSize:14}]}
                  placeholder={'Açıklama'}
                  multiline={true}
                  placeholderTextColor={'#ffffff99'}
                  value={shopDescription}
                  onChangeText={(text)=>setShopDescription(text)}
                />
                </View>             
              </View>
            </View>
            <View style={{backgroundColor:'#f1f1f1'}} >
            <View style={[{width:SIZES.width, paddingVertical:5, paddingHorizontal:10},styles.iosShadow]} >
              <View style={{ backgroundColor:'#fff', elevation:1, paddingVertical:10, borderRadius:10}} >            
              <View style={{borderBottomColor:'#cccccc90', borderBottomWidth:1, paddingVertical:5, marginHorizontal:20}} >
                <Text style={{fontSize:16, ...FONTS.medium, color:'#333'}} >Faturaya dahil olanlar </Text>
                <Text style={{fontSize:10, ...FONTS.regular, color:'#888'}} >Ev arkadaşlarınızdan faturaya dahil olanlara dokunun.</Text>
              </View>           
                <View style={{flexDirection:'row', paddingVertical:0, paddingHorizontal:10, height:100}}>
                <FlatList
                    data={userss}
                    horizontal={true}
                    style={{flexDirection:'row', paddingHorizontal:10}}
                    keyExtractor={(item)=>item.key}
                    renderItem={({ item }) => (
                      item.selected
                      ?
                    <TouchableOpacity activeOpacity={0.9}  onPress={()=>Ekle(item.name,item.key)} style={{ width:60, margin:6, alignItems:'center', justifyContent:'center'}} >
                      <Image 
                      source={{
                      headers: {Pragma: 'no-cache'},
                      uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+item.email+'.jpg'}}
                      style={{ width:70, height:70, margin:3, borderRadius:5, borderWidth:2, borderRadius:35, borderColor:'#4e9b8f'}}  />
                    <Text style={{fontSize:12, textAlign:'center', ...FONTS.regular,color:'#000'}}>{(item.name.slice(0, item.name.lastIndexOf(" ")))}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>Ekle(item.name,item.key)} style={{ width:60, margin:6, alignItems:'center', justifyContent:'center'}} >
                    <Image 
                       source={{
                       headers: {Pragma: 'no-cache'},
                       uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+item.email+'.jpg'}}
                       style={{ width:60, height:60, margin:3, borderRadius:5, borderWidth:1, borderRadius:30, borderColor:'#ce4257'}}  />
                    <Text style={{fontSize:12, textAlign:'center', ...FONTS.regular, color:'#555'}}>{(item.name.slice(0, item.name.lastIndexOf(" ")))}</Text>
                  </TouchableOpacity>
                    )}
                  /> 
                </View>
              </View>
            </View>  
            
            <UsersList usersss={usersss} shopSales={shopSales}/>
            <DataSelect shopDate={shopDate} setShopDate={setShopDate}/>
            <SubmitButton butonTitle={"Faturayı Ekle"}butonPress={()=>ShoppingAdd()} />
          </View>
        </ScrollView>
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

    textInput:{ 
      width:SIZES.width*0.6,
      paddingVertical:1, 
      fontSize:16,
      borderBottomWidth:0.3,
      borderBottomColor:'#bbbbbb90',
      ...FONTS.regular,
      color:'#fff',
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
export default InvoiceAdd;
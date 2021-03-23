import React, {useState, useEffect} from"react";
import {View, StatusBar,Text, SafeAreaView,ActivityIndicator, FlatList} from 'react-native';
import Header from '../components/Header';
import Shopping from '../components/ShoppingList/Shopping';
import ShoppingTitle from '../components/ShoppingTitle';
import MoreShopping from '../components/MoreShopping';
import NullData from '../components/NullData'
import {SIZES } from "../constants";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [shopping, setShopping] = useState([]); 
  const [userInfo, setUserInfo] =useState([]);
  const [mail, setMail]=useState("denme");
  const [tetik, setTetik]=useState(true);
  const [trigger, setTrigger] = useState(false)

    useEffect(() => {
      getData()
     }, [tetik])
     
     const getData = async () => {
       try {
         const value = await AsyncStorage.getItem('username')
         if(value !== null) {
          console.log("getData ID: ",value)
           setMail(value)
           UserInfo(value)
         }else{
          setTetik(false)
         }
       } catch(e) {
         // error reading value
       }
     }

     const  removeItem = async () => { 
      try {
        await AsyncStorage.removeItem("username");
        navigation.replace('LogIn')
      }catch (exception) {
        return false;
      }
    };

    const UserInfo =(value)=>{
      console.log("Value ID: ",value)
      const subscriber = firestore()
        .collection('Users').doc(value)
        .onSnapshot(querySnapshot => {
          setUserInfo(querySnapshot.data())
          if( tetik && querySnapshot.data() && querySnapshot.data().name=='User'){
          navigation.replace('ProfilePhoto', {mail:querySnapshot.data().email, buton:'Kaydet' })
        }else if(tetik && querySnapshot.data() && querySnapshot.data().hesapID=='null'){
          navigation.replace('Entry', {mail:querySnapshot.data().email, buton:'Kaydet' })

        }
        setTrigger(true)
      });
          return () => subscriber();
    }

    useEffect(() => {
      console.log("Adım 1: ",userInfo.hesapID)
        const subscriber = firestore()
          .collection('accounts').doc(userInfo.hesapID)
          .collection('shopping')
          .orderBy('dateOfRegistration', 'desc')
          .onSnapshot(querySnapshot => {
            const shops = [];
            querySnapshot.forEach(documentSnapshot => {
                shops.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setShopping(shops);
            setLoading(false);
          });
        return () => subscriber();
      }, [trigger]);
  
      if (loading) {
        return  (
          <View style={{height:SIZES.height, justifyContent:'center', alignItems:'center'}} >
            <ActivityIndicator size="large" color="#4e9b8f" />
          </View>
        );
      }
     
    return (
    <>
    <StatusBar backgroundColor={'#4e9b8f'} barStyle="light-content" />
    <SafeAreaView backgroundColor='#4e9b8f'/>
        <View style={{ flexDirection: 'row',  alignItems:'flex-start'}}>
          <View style={{ flex: 1, maxWidth:SIZES.width }}>
            <View style={{ width:'100%',  backgroundColor:'#4e9b8f'}} >
              <Header closeButton={()=>removeItem()} userName={userInfo && userInfo.name} userInfo={userInfo} data={shopping}/>
            </View>
            <View style={{paddingVertical:0, width:'100%', backgroundColor:'#f1f1f1'}} >       
                { shopping=='' 
                ? <NullData/>
                :<FlatList
                    data={shopping}
                    ListFooterComponent={<MoreShopping/>}
                    ListHeaderComponent={<ShoppingTitle count={shopping.length}/>}
                    renderItem={({ item }) => (
                      <Shopping userName={userInfo && userInfo.name} data={item} />                    
                    )}
                  /> 
                }  
            </View>             
          </View>
        </View>
    </>
    )
}

export default Home;
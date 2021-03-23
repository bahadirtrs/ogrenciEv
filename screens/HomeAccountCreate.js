import React, {useState, useEffect} from 'react'
import { View,StatusBar,Alert, Text,StyleSheet,Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Input from '../components/LogIn/Input'
import SubmitButton from '../components/Button/SubmitButton'
import SingLoginButton from '../components/Button/SingLoginButton'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfilePhoto = ({ route, navigation }) => {
    const {data}=route.params;
    const [next, setNext]=useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [homeCode, setHomeCode] = useState("")
    const [homeName, setHomeName] = useState("")
    const [city, setCity] = useState("")
    const [homeCounts, setHomeCounts] = useState("")
    const [lock, setLock] = useState(true)
    
    useEffect(() => {
        //Ev hesabı için benzersiz harf ve sayılardan oluşan anahtar key oluşturma
        if(lock){
        var maske = '';
        var semboller= 'A0'
        var uzunluk=6;
        var sonuc = '';
            if (semboller.indexOf('A') > -1) maske += 'ABCDEFGHJKMNOPQRSTUVWXYZ';
            if (semboller.indexOf('0') > -1) maske += '0123456789';
            for (var i = uzunluk; i > 0; --i){
                sonuc += maske[Math.floor(Math.random() * maske.length)];
            }
        setHomeCode(sonuc)
        }
    }, [])
  
    const HomeAccountSave = ()=>{
        //Ev hesabını firebase'e kaydetme işlemi
        if(homeCounts && homeName && city && homeCounts){
            firestore().collection('accounts').doc(homeCode)
            .set({
              homeName:homeName,
              city:city,
              homeCounts:homeCounts,
              date:firestore.FieldValue.serverTimestamp(),
              homeCode:homeCode
            })
            .then(() => {
                firestore()
                .collection('Users').doc(data.email)
                .update({
                    hesapID:homeCode,
                });
                setNext(true)
                firestore().collection('accounts').doc(homeCode)
                .collection('users').doc()
                .set({
                email:'p'+data.email,
                name:data.name,
                selected:false,
                date:firestore.FieldValue.serverTimestamp(),
                manager:true,
                })
            });
            setLock(false)
        }else{
            Alert.alert("Uyarı!","Tüm alanları doldurunuz.")
        }
    }

        return(
            <ScrollView>    
                <SafeAreaView backgroundColor={COLORS.lightGreen}/>    
                <StatusBar backgroundColor={COLORS.lightGreen} barStyle="dark-content"/>
                <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <View style={{ paddingVertical:10, width:SIZES.width, backgroundColor:COLORS.lightGreen}} >
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                            <TouchableOpacity  onPress={null} style={{backgroundColor:COLORS.lightGreen, paddingLeft:20, width:50}} >
                                <Icon name={'arrow-back'} size={25} color={'#fff'}/>
                            </TouchableOpacity>
                            <Text style={{color:'#f1f1f1', fontSize:17, ...FONTS.medium}}>Ev Hesabı Ekle</Text>
                            <TouchableOpacity style={{alignItems:'flex-end', backgroundColor:COLORS.lightGreen, paddingRight:20, width:50}} >
                                <Icon name={'information-circle-outline'} size={25} color='#fff'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                    !next ?
                    <View>
                        <View style={{width:SIZES.width, justifyContent:'center', alignItems:'center', backgroundColor:COLORS.lightGreen, height:180}} >
                            <Image style={{width:130, height:130}} source={require('../assets/images/home.png')} />
                            <Text style={{...FONTS.medium, color:'#fff', fontSize:12, paddingTop:10}}> Ortak kullanım için evinizi oluşturun</Text>
                        </View>
                        <View style={{paddingTop:20}}>
                            <Input type={'2'}  icon={'home'} placeholder={'Ev Takma Adı'}
                            setUsername={(text)=>setHomeName(text)} username={homeName}/>
                            <Input type={'2'}  icon={'earth'} placeholder={'Şehir'}
                            setUsername={(text)=>setCity(text)} username={city}/>
                            <Input type={'2'}  icon={'person'} placeholder={'Evde Yaşayan Sayısı'}
                            setUsername={(text)=>setHomeCounts(text)} username={homeCounts}/>
                        </View>
                        <View style={{paddingTop:0}} >
                            <SubmitButton  title={"Ev hesabı Oluştur"} butonPress={()=>HomeAccountSave()}/>
                        </View>
                        <View style={{width:SIZES.width, justifyContent:'center',alignItems:'center'}} >
                        <SingLoginButton
                            butonPress={()=>navigation.navigate('Entry')}
                            textOne={'Ev Kodunuz var mı'}
                            textTwo={'Bir Eve katılın'}
                        />
                        </View>
                    </View> 
                    :
                    <View style={{ width:SIZES.width, justifyContent:'center', alignItems:'center', paddingHorizontal:50}} >
                        <View style={{width:SIZES.width, justifyContent:'center', alignItems:'center', backgroundColor:COLORS.lightGreen, height:180}} >
                            <Icon name={'checkmark-circle-outline'} size={90} color='#fff'/>
                            <Text style={{...FONTS.medium, color:'#fff', fontSize:30, paddingTop:0}}>Tebrikler!</Text>
                            <Text style={{...FONTS.regular, color:'#fff', fontSize:16, paddingTop:0}}>Ev hesabı başarıyla oluşturuldu</Text>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', paddingTop:30}} >
                            <Text style={{...FONTS.medium, color:COLORS.lightGreen, fontSize:40, paddingTop:10}}>{homeCode}</Text>
                            <Text style={{...FONTS.regular, color:'#333', fontSize:13, paddingTop:5, textAlign:'center'}}>bu kod ile diğer kullanıcıların eve katılmasını sağlayabilirsiniz.</Text>
                            <View style={{paddingTop:0, justifyContent:'center', alignItems:'center'}} >
                                <SubmitButton  title={"Ev Kodunu paylaş"} butonPress={()=>alert("Ev Kodunu Paylş")}/>
                                <SubmitButton  title={"Arkadaşını eve davet et"} butonPress={()=>alert("Arkadaşını eve davet et")}/>
                                <SubmitButton  title={"Kullanmaya başla"} butonPress={()=>navigation.navigate('Home')}/>

                                
                            </View>
                        </View>
                    </View>
                    }               
                </View>
            </ScrollView>
        )
    }
    

const styles = StyleSheet.create({
    container:{
        height:SIZES.height-80,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
    },
    title:{
        ...FONTS.bold,
        fontSize:22,
        color:'#333', 
        marginBottom:0,
        textAlign:'center',
        paddingHorizontal:0
    },
})

export default ProfilePhoto;
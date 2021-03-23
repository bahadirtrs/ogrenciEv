import React, {useState, useEffect} from 'react'
import { View,StatusBar,Alert, Text,StyleSheet,Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Input from '../components/LogIn/Input'
import SubmitButton from '../components/LogIn/SubmitButton'
import SocialLogin from '../components/LogIn/SocialLogin'
import SingLoginButton from '../components/Button/SingLoginButton'
import { errorResolve } from '../components/LogIn/error';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '../components/CheckBox';
import ImageUpload from '../components/ImageUpload';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilePhoto = ({ route, navigation }) => {
    const {mail}=route.params;
    const {buton}=route.params;
    const [name, setName]=useState("")
    const [profilePhotoName, setProfilePhotoName]=useState("")
    const [next, setNext]=useState(false)
    const [info, setInfo]=useState(false)
    const [infoText, setInfoText]=useState("")
    const [sozlesme, setSozlesme]=useState(false)
    const [aydinlanma, setAydinlatma]=useState(false)
    const [infoSucces, setInfoSucces]=useState(true)
   
    const signUser = async () => {
        //Firabase Authentication'a kayıt ekleme fonksiyonu
        if(name){
            if(mail){
                if(sozlesme){
                    if(aydinlanma){
                        DBUserUpdate(); 
                        setInfoText("Kaydınız tamamlandı. Anasayfaya yönlendiriliyorsunuz."); 
                        setInfoSucces(true); 
                        setTimeout(() => { 
                            setInfo(false),
                            setInfoText(""),
                            setInfoSucces(false) 
                            navigation.replace('Entry')
                        }, 4000);
                    }else {setInfoText("Lüften aydınlatma metnini okuduğunuzu kabul edin."); setTimeout(() => {setInfo(false),setInfoText("")}, 4000);} 
                }else {setInfoText("Lüften kullanıcı sözleşmesini kabul edin."); setTimeout(() => {setInfo(false),setInfoText("")}, 4000);} 
    } else {setInfoText("Geçerli bir mail adresi girin. Hesabınız ile ilgili tüm işlemlerin bu mail adresi üzerinden yapılacağını unutmayın!"); setTimeout(() => {setInfo(false),setInfoText("")}, 6000);}
        } else {setInfoText("Lütfen adınızı girin. Hesabınızda bu isim kullanılıcaktır ve diğer kullanıcılara bu isim görünecektir."); setTimeout(() => {setInfo(false),setInfoText("")}, 6000);}
    }
  
    const DBUserUpdate = ()=>{
        //kullanıcı ad soyad fotoğraf urlsinin Firebase' e kaydedilmesi
        if(mail){
            firestore()
            .collection('Users').doc(mail)
            .update({
               image:'p'+mail,
               name:name,
               dateUpdate:firestore.FieldValue.serverTimestamp(), // Anlık zaman(Kayıt Zamanı)
            });
            AsyncStorage.getItem('name').then(deger =>{
                if(deger!==null){
                    AsyncStorage.removeItem("name");
                    AsyncStorage.setItem('name', name);
                }else{
                    AsyncStorage.setItem('name', name);
                }  
            })
        }
    }

    useEffect(() => {
        //Headarda gösterilen uyarı barının kontrolü
        if(infoText)//Eğer Uyarı State'i içerisinde bir uyarı metni varsa;
          setInfo(true)//Uyarı Barı etkin
        else
          setInfo(false)//Uyarı Barı devredışı
    }, [infoText])

    useEffect(() => {
        setProfilePhotoName("p"+mail)
        setInfoText("Tebrikler! Son bir adım kaldı. Lütfen Adınızı ve Soyadınızı giriniz."); 
        setInfoSucces(true); 
        setTimeout(() => { 
            setInfo(false),
            setInfoText(""),
            setInfoSucces(false) 
        }, 5000);
    }, [])

        return(
            <ScrollView>    
                <SafeAreaView backgroundColor={COLORS.lightGreen}/>    
                <StatusBar backgroundColor={COLORS.lightGreen} barStyle="dark-content"/>
                {info ?
                    <View style={{zIndex:1, width:SIZES.width, justifyContent:'flex-end', alignItems:'flex-end',backgroundColor: infoSucces?'#118ab2':'#ca5c54', position:'absolute'}} >
                        <StatusBar backgroundColor={infoSucces?'#118ab2':'#ca5c54'} barStyle="light-content"/>
                        <SafeAreaView backgroundColor={infoSucces?'#118ab2':'#ca5c54'}  /> 
                        <View style={{flexDirection:'row', alignItems:'center', width:SIZES.width ,paddingHorizontal:20, paddingVertical:5}} >
                            <Icon name={infoSucces?'checkmark-circle-outline' :'information-circle-outline'} size={30} color={'#fff'}/>
                            <Text style={{ width:SIZES.width-60, color:'#f1f1f1', fontSize:14, ...FONTS.regular, paddingLeft:10}} >{infoText}</Text>
                        </View>
                    </View>
                    :<View style={{width:SIZES.width,  justifyContent:'center', alignItems:'center'}} />
                }  
                <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <View style={{ paddingVertical:10, width:SIZES.width, backgroundColor:COLORS.lightGreen}} >
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                            <TouchableOpacity  onPress={()=>setNext(!next)} style={{backgroundColor:COLORS.lightGreen, paddingLeft:20, width:50}} >
                                <Icon name={'arrow-back'} size={25} color={'#fff'}/>
                            </TouchableOpacity>
                            <Text style={{color:'#f1f1f1', fontSize:17, ...FONTS.medium}}>Kayıt Ol</Text>
                            <TouchableOpacity style={{alignItems:'flex-end', backgroundColor:COLORS.lightGreen, paddingRight:20, width:50}} >
                                <Icon name={'information-circle-outline'} size={25} color='#fff'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                   <View style={{width:SIZES.width, alignItems:'center', backgroundColor:COLORS.lightGreen}} >
                     <ImageUpload profilePhotoName={profilePhotoName} mail={mail} />
                   </View>
                    <View style={{paddingTop:20}}>
                        <Input type={'3'}  icon={'person'} placeholder={'Adınız ve Soyadınız'}
                        setUsername={(text)=>setName(text)}username={name}/>
                    </View>
                    <View style={{paddingLeft:40, paddingVertical:10}} >
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:1}} >
                        <CheckBox data={sozlesme} dataPress={()=>setSozlesme(!sozlesme)} /> 
                        <Text style={{...FONTS.regular}} > 
                            <Text style={{...FONTS.medium}}> Kullanıcı Sözleşmesi</Text>
                            'ni kabul ediyorum.
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:1}} >
                        <CheckBox data={aydinlanma} dataPress={()=>setAydinlatma(!aydinlanma)} /> 
                        <Text style={{...FONTS.regular}} > 
                            <Text style={{...FONTS.medium}}> Aydınlatma metnini </Text>
                            okudum ve anladım 
                        </Text>
                    </View>
                    </View>
                    <View style={{paddingTop:0}} >
                    <SubmitButton  title={buton} butonPress={()=>signUser()}/>
                    </View>
                    <View style={{width:SIZES.width, justifyContent:'center',alignItems:'center'}} >
                    <SocialLogin/>
                    <SingLoginButton
                    butonPress={()=>navigation.navigate('LogIn')}
                    textOne={'Hesabınız var mı?'}
                    textTwo={'Giriş Yapın'}
                />
                    </View>
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
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SingIn = ({ route, navigation }) => {
    const [mail, setMail]=useState("")
    const [password, setPassword]=useState("")
    const [passwordRepeat, setPasswordRepeat]=useState("")
    const [info, setInfo]=useState(true)
    const [infoText, setInfoText]=useState("")
    const [infoSucces, setInfoSucces]=useState(false)


    useEffect(() => {
        //Headarda gösterilen uyarı barının kontrolü
        if(infoText)//Eğer Uyarı State'i içerisinde bir uyarı metni varsa;
          setInfo(true)//Uyarı Barı etkin
        else
          setInfo(false)//Uyarı Barı devredışı
    }, [infoText])

 
    const Next = async ()  =>{
        try {
            if(mail && password){
                await auth().createUserWithEmailAndPassword(mail, password)
                DBUser(); 
            }else{
                setInfoText("Lütfen gerekli alanları doldurunuz");
                setTimeout(() => { 
                    setInfo(false),
                    setInfoText("")
                }, 5000);
            }
        }
        catch (error) {console.log(error);
            setInfoText(errorResolve(error.code));
            setTimeout(() => { 
                setInfo(false),
                setInfoText("")
            }, 5000);
        }
      }

    const DBUser = async ()=>{
        //Kullanıcı verilerinin Firebase' e kaydedilmesi
        if(mail){
            firestore()
            .collection('Users').doc(mail)
            .set({
                username:mail,
                email:mail,
                date:firestore.FieldValue.serverTimestamp(), // Anlık zaman(Kayıt Zamanı)
                refNumber:'LK34HN',
                name:'User',
                hesapID:'null',
            })
            AsyncStorage.getItem('username').then(deger =>{
                if(deger!==null){
                    AsyncStorage.removeItem("username");
                    AsyncStorage.setItem('username', mail);
                }else{
                    AsyncStorage.setItem('username', mail);
                }  
            }),
            navigation.replace('ProfilePhoto', {mail:mail, buton:'Kayıt ol'})  
        }
    }
    return (
        <ScrollView style={{height:SIZES.height}} >
            <SafeAreaView/>  
            { info ?
            <View style={{zIndex:1, width:SIZES.width,  justifyContent:'flex-end', alignItems:'flex-end', position:'absolute',backgroundColor:infoSucces?'#118ab2':'#ca5c54' }} >
                <SafeAreaView/>  
                <StatusBar backgroundColor={'#ca5c54'} barStyle="light-content"/>
                <View style={{flexDirection:'row', alignItems:'center', width:SIZES.width ,paddingHorizontal:20, paddingVertical:5}} >
                    <Icon name={infoSucces?'checkmark-circle-outline' :'information-circle-outline'}  size={30} color={'#fff'}/>
                    <Text style={{ width:SIZES.width-60, color:'#f1f1f1', fontSize:14, ...FONTS.regular, paddingLeft:10}} >{infoText}</Text>
                </View>
            </View>
            : <View style={{width:SIZES.width, height: Platform.OS === 'ios' ? 100 : null,  justifyContent:'center', alignItems:'center', position:'absolute'}} />
            }
            <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Image style={{width:180, height:180, marginBottom:0}} source={require('../assets/images/logom.png')} />
                    <Text  onPress={()=>navigation.push('ProfilePhoto', {mail:mail})}  style={styles.title}>Harcamalarını kaydetmek </Text>
                    <Text style={styles.title}>için hemen kayıt ol!</Text>
                    <Text></Text>
                </View>

            
                <Input type={'2'}  icon={'mail'} placeholder={'E-posta adresiniz'}
                    setUsername={(text)=>setMail(text)}username={mail}
                />
                <Input type={'1'} icon={'lock-closed'} placeholder={'Parolanız'}
                    setUsername={(text)=>setPassword(text)}  username={password}
                />
                <Input type={'1'}  icon={'lock-open'} placeholder={'Parola Tekrarı'}
                    setUsername={(text)=>setPasswordRepeat(text)}  username={passwordRepeat}
                />
                <SubmitButton  title={'Devam Et'} butonPress={()=>Next()}/>
                <SocialLogin/>
                <SingLoginButton
                    butonPress={()=>navigation.navigate('LogIn')}
                    textOne={'Hesabınız var mı?'}
                    textTwo={'Giriş Yapın'}
                />
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

export default SingIn;
import React, {useState, useEffect} from 'react'
import { View,StatusBar,Alert,Button, Text,StyleSheet,Image, ScrollView,SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth';
import { FONTS, SIZES } from "../constants/theme";
import Input from '../components/LogIn/Input';
import SubmitButton from '../components/LogIn/SubmitButton';
import SocialLogin from '../components/LogIn/SocialLogin';
import SingLoginButton from '../components/Button/SingLoginButton';
import { errorResolve } from '../components/LogIn/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

function LogIn({ route, navigation }) {
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    
    const loginUser = async () => {
        if(username && password){
            try{
                await auth().signInWithEmailAndPassword(username, password)
                AsyncStorage.getItem('username').then(deger =>{
                    if(deger!==null){
                         AsyncStorage.removeItem("username");
                         AsyncStorage.setItem('username', username);
                    }else{
                         AsyncStorage.setItem('username', username);
                    }  
                  });
                  navigation.push('Home', {username:username})
            }
            catch(error){
                console.log(error)
                showMessage({
                    message: "Uygunsuz Tanımlama",
                    description: errorResolve(error.code),
                    autoHide:true,
                    type: "danger",
                    position:"top",
                    duration:5000,
                  });
            }
        }else{
            showMessage({
                message: "Tamamlanmamış Giriş",
                description: "Lütfen kullanıcı adı ve şifrenizi giriniz.",
                autoHide:true,
                type: "danger",
                position:"top",
                duration:5000,
              });
        }
    }
    
    return (
        <ScrollView style={{height:SIZES.height}} >
        <SafeAreaView/>
        <FlashMessage  position="bottom" animated={true} autoHide={false} />
        <View style={styles.container} >
            <StatusBar backgroundColor={'#f1f1f1'} barStyle="dark-content"/>
            <View style={{alignItems:'center'}}>
                <Image style={{width:200, height:200, marginBottom:0}} source={require('../assets/images/logom.png')} />
                <Text style={styles.title}>Harcamaların her</Text>
                <Text style={styles.title}>zaman kontrol altında!</Text>
                <Text></Text>
            </View>
            <Input type={'2'} icon={'person'} placeholder={'E-posta adresi'}
                setUsername={(text)=>setUsername(text)}username={username}
            />
             <Input type={'1'} icon={'lock-open'} placeholder={'Parola'}
                setUsername={(text)=>setPassword(text)}  username={password}
             />
            <SubmitButton title={'Giriş Yap'} butonPress={()=>loginUser()}/>
            <SocialLogin/>
            <SingLoginButton
                butonPress={()=>navigation.navigate('SingIn')}
                textOne={'Hesabınız yok mu?'}
                textTwo={'Kayıt Olun'}
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        height:SIZES.height-20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
    },
    title:{
        ...FONTS.bold,
        fontSize:26,
        color:'#333', 
        marginBottom:0,
        textAlign:'center',
        paddingHorizontal:0
    },
  
})

export default LogIn;
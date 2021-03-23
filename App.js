import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Home,BookDetail, ShoppingAdd,InvoiceAdd ,DebtAdd,LogIn, SingIn, ProfilePhoto, Entry, HomeAccountCreate} from "./screens/";
import Tabs from "./navigation/tabs";
import codePush from "react-native-code-push";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}
const App = () => {
    const [isFirstLauncher, setIsFirstLauncher]= useState(null);
    useEffect(() => {
        AsyncStorage.getItem('username').then(value =>{
          if(value==null){
            setIsFirstLauncher(false);
          } else {
            setIsFirstLauncher(true)
          }
        });
      }, []);

    if(isFirstLauncher=== null){
        return null;
      } else if( isFirstLauncher=== true ){
        return (
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName={'Home'}>
                    <Stack.Screen name="HomeAccountCreate" component={HomeAccountCreate}
                        options={{ title:'Ev Hesabı Oluştur', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="Entry" component={Entry}
                        options={{ title:'Giriş', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="ShoppingAdd" component={ShoppingAdd}
                        options={{ title:'Alışveriş Ekle', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="DeptAdd" component={DebtAdd}
                        options={{ title:'Tahsilat Ekle', headerShown: true, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}} />
                    <Stack.Screen name="InvoiceAdd" component={InvoiceAdd}
                        options={{title:'Fatura Ekle', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="LogIn" component={LogIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="SingIn" component={SingIn}
                        options={{ title:'Kayıt Ol', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto}
                        options={{ title:'Kaydı Tamamla', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Detay" component={BookDetail}
                        options={{ title: 'Harcama Detayı', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Home" component={Tabs}
                        options={{ title:' ', headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
      }else {
        return (
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName={'LogIn'}>
                    <Stack.Screen name="HomeAccountCreate" component={HomeAccountCreate}
                        options={{ title:'Ev Hesabı Oluştur', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="Entry" component={Entry}
                        options={{ title:'Giriş', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="ShoppingAdd" component={ShoppingAdd}
                        options={{ title:'Alışveriş Ekle', headerShown: false,  headerStyle:{ backgroundColor: '#4e9b8f'}, headerTintColor: '#fff' }} />
                    <Stack.Screen name="DeptAdd" component={DebtAdd}
                        options={{ title:'Tahsilat Ekle', headerShown: true, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}} />
                    <Stack.Screen name="InvoiceAdd" component={InvoiceAdd}
                        options={{title:'Fatura Ekle', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="LogIn" component={LogIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="SingIn" component={SingIn}
                        options={{ title:'Giriş Yap', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Detay" component={BookDetail}
                        options={{ title: 'Harcama Detayı', headerShown: false, headerStyle:{ backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                    <Stack.Screen name="Home" component={Tabs}
                        options={{ title:' ', headerShown: false }} />
                    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto}
                        options={{ title:'Kaydı Tamamla', headerShown: false, headerStyle:{backgroundColor: '#4e9b8f'},headerTintColor: '#fff'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
      }
    }



export default codePush(App);

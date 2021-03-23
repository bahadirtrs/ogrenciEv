import React from "react";
import { SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, BookDetail } from "../screens/";
import { icons, COLORS } from "../constants";
import MainItem from '../components/TabItems/MainItem'
import ButtonItem from '../components/TabItems/ButtonItem'

const Tab = createBottomTabNavigator();
const tabOptions = {
    showLabel: false,
    style: {
        backgroundColor: COLORS.white,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
        height:60
    }
}

const Tabs = () => {
    
    return (
        <>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.lightGreen : COLORS.black;

                    switch (route.name) {
                        case "Anasayfa":
                            return (
                                <ButtonItem tintColor={tintColor} icon={icons.dashboard_icon}/>
                            )
                        case "Arama":
                            return (
                                <ButtonItem tintColor={tintColor} icon={icons.search_icon}/> 
                            )
                        case "Harcama Ekle":
                            return (
                                <MainItem/>
                            )
                        case "Menu":
                            return (
                                <ButtonItem tintColor={tintColor} icon={icons.menu_icon}/> 
                            )
                        case "Bildirimler":
                            return (
                                <ButtonItem tintColor={tintColor} icon={icons.notification_icon}/> 
                        )
                    }
                }
            })}
            tabBarOptions={tabOptions}
        >
            <Tab.Screen name="Anasayfa" component={Home}/>
            <Tab.Screen name="Arama" component={Home}/>
            <Tab.Screen name="Harcama Ekle" component={Home}/>
            <Tab.Screen name="Bildirimler" component={Home}/>
            <Tab.Screen name="Menu"component={Home}/>
        </Tab.Navigator>
        <SafeAreaView backgroundColor='#fff' />
        </>
    )
}

export default Tabs;
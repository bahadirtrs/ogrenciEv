import React, {useEffect} from "react";
import {View, StatusBar, StyleSheet,Image,SafeAreaView, ScrollView} from 'react-native';
import {SIZES } from '../constants';
import DealType from '../components/ShoppingDetails/ShoppingType/DealType'
import DebtType from '../components/ShoppingDetails/ShoppingType/DebtType'
import InvoiceType from '../components/ShoppingDetails/ShoppingType/InvoiceType';
import DeleteShopping from '../components/DeleteShopping';
import MenuShopDetails from '../components/MenuShopDetails'
const Home = ({ route, navigation }) => {
    const {data}=route.params;
    return (
      <>
        <StatusBar backgroundColor={'#4e9b8f'} barStyle="light-content" />
        <SafeAreaView backgroundColor={'#4e9b8f'} />
        <ScrollView>
         <MenuShopDetails data={data} pageName={'Harcama Detayı'} butonPress={() => navigation.goBack()} />
            { 
            data && data.type=='1'
            ?  <DealType data={data} />
            : data && data.type=='2'
              ?  <InvoiceType data={data} />
              :  <DebtType data={data} />
            }
        </ScrollView> 
        <SafeAreaView/>
      </>
    )
}
const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        width:SIZES.width,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent:'flex-start',
    },
})
export default Home;
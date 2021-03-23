import React, {useEffect} from "react";
import {View, StatusBar, StyleSheet,Text,SafeAreaView} from 'react-native';
import {SIZES } from '../constants';

const DebtAdd = ({ route, navigation }) => {
    return (
      <View style={styles.container} >
      <StatusBar backgroundColor={'#4e9b8f'} barStyle="light-content" />
          <Text>Tahsilt Ekle</Text>
      <SafeAreaView/>
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:SIZES.width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    },
})
export default DebtAdd;

import React from 'react'
import { View, StyleSheet, Image} from 'react-native'
import {SIZES } from '../../../constants';
import ItemOne from '../ItemOne'
import PlugButton from '../PlugButton'
import ItemOneAmount from '../ItemOneAmount'

export default function DealType({data}) {
    return (
    <View style={styles.container}>
        <View style={{height:10}}></View>
        <ItemOne icon={"clipboard"} title={"Borç Adı"} answer={data.shoppingName} />
        <ItemOne icon={"user-check"}  title={"Alacaklı Kişi"} answer={data.name} />
        <ItemOneAmount icon={"comment-dollar"}  title={"Borç Tutarı"} answer={data.sales} />
    </View>
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


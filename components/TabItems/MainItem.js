import React, {useState} from 'react'
import { View, Text, StyleSheet,Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { icons, COLORS } from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableHighlight } from 'react-native-gesture-handler';
import InfoModal from '../TabItems/Modal'
import { set } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'

export default function MainItem(props) {
    const navigation=useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    butonSize=new Animated.Value(1);
    mode= new Animated.Value(0);

    const HandlePress =()=>{
        Animated.sequence([
            Animated.timing(butonSize, {
                useNativeDriver: true,
                toValue:1,
            }),

            Animated.timing(mode, {
                useNativeDriver: false,
                toValue:mode._value == 0 ? 1 : 0
            }),
        ]).start();
        setModalVisible(true)
    }

    const sizeStyle={
        transform: [{scale:butonSize}]
    }

    const rotation=mode.interpolate({
        inputRange:[0,1],
        outputRange: ["0deg", "225deg"]
    })

    const RedirectOne = ()=>{
        setModalVisible(!modalVisible)
        navigation.push('ShoppingAdd')
      }
    const RedirectTwo = ()=>{
    setModalVisible(!modalVisible)
    navigation.push('InvoiceAdd')
    }
    const RedirectThree = ()=>{
    setModalVisible(!modalVisible)
    navigation.push('DeptAdd')
    }

    return (
        <View style={{position:'absolute', alignItems:'center', zIndex:1}} >
          <InfoModal 
            RedirectOne={() => RedirectOne()}
            RedirectTwo={() => RedirectTwo()}
            RedirectThree={() => RedirectThree()}
            butonPress={modalVisible}
            closePress={()=>setModalVisible(!modalVisible)}
          />

            <TouchableWithoutFeedback activeOpacity={1} onPress={HandlePress} >
                <Animated.View style={[styles.button, sizeStyle]}>
                    <Animated.View style={{transform:[{rotate:rotation}]}} >
                        <Icon name={'plus'} size={23} color={'#fff'}/>
                    </Animated.View>
                </Animated.View>
             </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#4e9b8f',
        paddingHorizontal:15,
        paddingVertical:13,
        bottom:10,
        borderRadius:35,
        elevation:2,
        borderWidth:2,
        borderColor:'#fff',
        shadowOffset: { x: 2, y: 2 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        shadowOpacity: 0.5,
        shadowColor: 'grey',
        borderWidth:1,
        zIndex:1




    },
    secondButton:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        width:50,
        height:50,
        borderRadius:50,
        borderWidth:2,
        borderColor:'#fff',
        backgroundColor:'#4e9b8f'
    }
})

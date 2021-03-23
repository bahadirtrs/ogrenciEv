import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View,StatusBar } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';

const PlugShowModal = (props) => {
  return (
    <View style={[styles.centeredView ,{backgroundColor:props.modalPress==true ?'green': null,}]}>
      <StatusBar backgroundColor={props.visible ? '#366a62': '#4e9b8f'} barStyle="dark-content" />
      <Modal 
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {props.modalPress}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           { props.profilePhotoName=='noData' 
            ? <View style={{width:SIZES.width-50, height:(SIZES.width-50)*1.25, justifyContent:'center', alignItems:'center'}} >
                <Icon name={'images-outline'} size={60} color={'#555'} />
                <Text style={{...FONTS.regular, fontSize:12, color:'#555', paddingVertical:10}} >Bu harcama için fotoğraf yüklenmedi.</Text>
            </View>
            : <Image 
                source={{
                headers: {Pragma: 'no-cache'},
                uri: 'https://www.bahadirtiras.com.tr/ogrenciEvi/Mart/'+props.profilePhotoName+'.jpg'}}
                style={{ width:SIZES.width-50, height:(SIZES.width-50)*1.25, borderTopLeftRadius:10, borderTopRightRadius:10}} />
        }
            <TouchableOpacity style={styles.button} onPress={props.modalPress}>
              <Icon name={'close-circle-outline'} size={18} color='#222' />
              <Text style={styles.textStyle}>Pencereyi Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor:'#00000050',
    position:'absolute',
    height:SIZES.height,
    width:SIZES.width
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent:'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
      paddingVertical:10,
      width:SIZES.width-50,
    borderRadius: 5,
    borderTopColor:'#e1e1e1',
    borderTopWidth:1
  },
  buttonOpen: {
  },
  buttonClose: {
  },
  textStyle: {
    color: "#222",
    ...FONTS.medium,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center"
  }
});

export default PlugShowModal;
import React, { useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';

const PlugModal = (props) => {
  
  return (
    <View style={[styles.centeredView ,{backgroundColor:props.modalPress==true ?'#00000099': null,}]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {props.modalPress}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
           {
               props.filePath ? 
              
              <View>
               <View style={styles.container} >
                {props.uploadPros==100
                 ?<Icon name={'checkmark-circle-outline'} size={20} color={'#f1f1f1'}/>
                 :<Icon name={'time-outline'} size={20} color={'#fff'} />
                 }
                 <Text style={{ color:'#fff', ...FONTS.regular, fontSize:12}} > %{props.uploadPros} {props.setPhotoMessage} </Text>
              </View> 
              <View style={{ zIndex:2, position:'absolute', top:10, right:10, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'#00000080' , padding:6, borderRadius:7}} >
                  <Icon name={'close-circle-outline'} size={15} color={'#fff'} />
                  <Text onPress={props.deleteFile} style={{color:'#fff', fontSize:12, ...FONTS.regular}}> Fotoğrafı Sil</Text>
               </View>
               <Image source={{uri: props.filePath}}  style={{zIndex:1, width:SIZES.width-50, height:(SIZES.width-50)*1.25, borderTopLeftRadius:10, borderTopRightRadius:10}} />
               </View>
            :
              <View style={{zIndex:1, borderTopLeftRadius:10, borderTopRightRadius:10,justifyContent:'center',alignItems:'center',width:SIZES.width-50, height:(SIZES.width-50)*1.25, padding:25, backgroundColor:'#e8e8e8'}} >
                <Icon name={'image-outline'} size={80} color={COLORS.lightGreen} />
                <Text style={{...FONTS.medium, textAlign:'center', fontSize:22, paddingBottom:10}}>Harcamanıza ait görseli yükleyiniz.</Text>
               
                <Text style={{...FONTS.regular, textAlign:'center',padding:5, fontSize:14}}> 
                  <Text style={{...FONTS.medium}} >Fotoğraf Çek </Text>butonuna tıklayarak telefonunuzun kamerasını açabilirsiniz.
                </Text>
                
                <Text style={{...FONTS.regular, textAlign:'center', padding:5, fontSize:14}}>Ya da
                  <Text style={{...FONTS.medium}} > Galeriden seç </Text> 
                    butonuna tıklayarak harcama görselinizi galerinizden yükleyebilirsiniz.
                  </Text>
              </View>

           }
           
            <TouchableOpacity
              style={styles.button}
              onPress={props.chooseFile}
            >
              <Icon name={'camera-outline'} size={16} color='#222' />

              <Text style={styles.textStyle}> Fotoğraf Çek</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={props.openGallery}
            >
              <Icon name={'image-outline'} size={16} color='#222' />

              <Text style={styles.textStyle}> Galeriden Seç</Text>
            </TouchableOpacity>

            {props.filePath ?
              <TouchableOpacity
              style={styles.button}
              onPress={props.imageOk}
            >
              <Icon name={'checkmark-circle-outline'} size={15} color='#222' />
              <Text style={styles.textStyle}>Kaydet ve Çık </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.button}
              onPress={props.imageNot}
            >
              <Icon name={'close-circle-outline'} size={16} color='#222' />
              <Text style={styles.textStyle}> Kapat </Text>
            </TouchableOpacity>
            }
            
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
    backgroundColor: "#f1f1f1",
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

  container:{ 
    zIndex:3, 
    bottom:0, 
    width:SIZES.width-50, 
    position:'absolute',
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#00000060', 
    padding:5, 
    borderRadius:0
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

export default PlugModal;
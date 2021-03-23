import React from "react";
import {Modal,StyleSheet,View,TouchableOpacity, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FONTS, SIZES } from "../../constants/theme";
import ModalItem from './ModalItem'

const InfoModal = (props) => {
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.butonPress}  >
         <TouchableOpacity activeOpacity={0.9} onPress={props.closePress} style={styles.centeredView}>
         <View style={styles.modalView}> 
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%', /*borderBottomWidth:1, borderBottomColor:'#ddd',*/  paddingHorizontal:0,marginVertical:0, paddingVertical:0}} >
             {/*<View style={{}} >
               <Text style={{...FONTS.medium, fontSize:20}}>Harcama Ekle</Text>
               <Text style={{...FONTS.regular, fontSize:12, color:'#555'}}>Gelir ve giderlerinizi ekleyin</Text>
             </View>
             <TouchableOpacity onPress={props.closePress} >
               <Icon name={'times'} size={25} color={'#555'}/>
            </TouchableOpacity> */}
            </View>
            <ModalItem url={props.RedirectOne} icon={'shopping-cart'} color={'#ea5050'} title={"Alışveriş Ekle"} description={'Yaptığınız market, ev eşyası, züccaciye, hırdavat vs. harcamalarınızı bu alandan ekleyebilirsiniz.'}/>
            <ModalItem url={props.RedirectTwo} icon={'clipboard'} color={'#4e9b8f'} title={"Fatura Ekle"} description={'Evinize ait olan elektrik, doğalgaz, su, internet vs. faturalarını bu alandan ekleyebilirsiniz.'} />
            <ModalItem url={props.RedirectThree} icon={'lira-sign'} color={'#fea621'} title={"Tahsilat Ekle"} description={'Ev bireyleri arasında yapılan borç ödemeleri bu alandan sisteme eklenmektedir.'} />  
         </View>
       </TouchableOpacity>      
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    height:'100%',
    justifyContent:'flex-end',
    alignItems: 'center',
    opacity:1,
    backgroundColor:'#00000050'
  },

  modalView: {
    width:'100%',
    paddingVertical:15,
    paddingBottom:25,
    backgroundColor: "#f1f1f1",
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    shadowColor: "#000",
    borderRadius:5,
    padding:0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
});

export default InfoModal;
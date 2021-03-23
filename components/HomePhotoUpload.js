import React, {useState,useEffect} from 'react';
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image,Platform,PermissionsAndroid, Alert} from 'react-native';
import { COLORS, FONTS, SIZES,LINK } from "../constants/theme";
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import PlugModal from '../components/PlugModal'
const HomePhotoUpload = (props) => {
  const [filePath, setFilePath] = useState({});
  const [photoMessage, setPhotoMessage]=useState("Profil Fotoğrafı Yükle")
  const [uploadPros, setUploadPros]=useState(0)
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const HandlePros = event =>{
    setUploadPros(Math.round((event.loaded *100)/event.total))
  }
  const chooseFile = () => {
    ImagePicker.openCamera({
      width: 900,
      height: 1200,
      cropping: true,
      compressImageQuality:0.8,
      cropperCancelText:'Vazgeç',
      cropperChooseText:'Fişi Kırp',
      loadingLabelText:'Fotoğraf ayarlanıyor',
      cropperCircleOverlay:false,
      cropperToolbarTitle:'Fiş Yükle',
      showCropFrame:true
    }).then(image => {
      setFilePath(image);
      uploadPhoto(image)
    }).catch(e => {
      if (e.code !== 'E_PICKER_CANCELLED') {
        console.log(e);
      }
    })
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 900,
      height: 1200,
      cropping: true,
      compressImageQuality:0.8,
      cropperCancelText:'Vazgeç',
      cropperChooseText:'Fişi Kırp',
      loadingLabelText:'Fotoğraf ayarlanıyor',
      cropperCircleOverlay:false,
      cropperToolbarTitle:'Fiş Yükle',
      showCropFrame:true
    }).then(image => {
      setFilePath(image);
      uploadPhoto(image);
    }).catch(e => {
      if (e.code !== 'E_PICKER_CANCELLED') {
        console.log(e);
      }
    })
  };

  const uploadPhoto = async image => {
		const data = new FormData();
    const bar= new XMLHttpRequest();
    data.append('submit', 'ok');
    data.append('username', props.profilePhotoName);
		data.append('file', {
			uri: image.path,
			type: image.mime,
			name: 'image.jpg'
		});
		const config = {
			headers: {
				'Accept': 'application/json',
				'Content-type': 'multipart/form-data'
			}
		};
		axios
			.post(LINK.imageUploadURL, data, config)
      bar.upload.addEventListener('progress',HandlePros);
      bar.addEventListener('load', ()=>{
      if(image.path){
        setUploadPros(100)
        setPhotoMessage("harcama fişi yüklendi")
      }
      });
      bar.open('POST','https://api.imgur.com/3/upload');
      bar.setRequestHeader('Authorization');
      bar.send(data)
	};

  useEffect(() => {
    if(filePath.path){
      props.imageOk
      if(uploadPros==0)
      setPhotoMessage("Alışveriş Fişi Yükle")
      if(uploadPros<98 && uploadPros>1 )
      setPhotoMessage("Yükleniyor...")
      if(uploadPros>99)
      setPhotoMessage("lüften bekleyin...")
      if(uploadPros==100)
      setPhotoMessage("harcama fişi yüklendi")
    }
  },[uploadPros])

  const DelefeFile = ()=>{
    Alert.alert(
        "Fotoğrafı silmek üzeresiniz",
        "Bu faturayı silmek istediğinize emin misiniz?",
        [
          {text: "Hayır", style: "cancel"},
          {text: "Evet", onPress: () => Onay(), }
        ]
      );
}

  const Onay = async ()=>{
    setFilePath("")
    await fetch(LINK.deleteFileURL+props.profilePhotoName,);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>  
      <PlugModal  
        profilePhotoName={props.profilePhotoName} 
        visible={props.visible} 
        modalPress={props.modalPress}
        filePath={filePath.path}
        chooseFile={()=>chooseFile()}
        openGallery={()=>openGallery()}
        imageOk={props.imageOk}
        imageNot={props.imageNot}
        uploadPros={uploadPros}
        setPhotoMessage={photoMessage}
        deleteFile={()=>DelefeFile()}
        />
      {filePath.path ?
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.buttonStyle}
          onPress={props.modalPress}>
            <View>
              <View style={styles.imageStatus} >
                {uploadPros==100
                ?<Icon name={'checkmark-circle-outline'} size={25} color={'#e1e1e1'} />
                :<Icon name={'time-outline'} size={25} color={'#fff'} />
                }
              </View> 
              <View style={{justifyContent:'center',alignItems:'center'}} >
                <Image source={{uri: filePath.path}} style={styles.imageStyle}/>
              </View>
            </View>
        </TouchableOpacity>
      :
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle} onPress={props.modalPress}>
          <View style={styles.imageUploadButton} >
            <Icon name={'images'} size={40} color={'#4e9b8f'} />
            <Text style={styles.imageUploadText}>Fotoğraf Yükle</Text>
          </View>
        </TouchableOpacity>
      }
      </View>
    </SafeAreaView>
  );
};

export default HomePhotoUpload;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    height:180,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent:'center'
  },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius:80,
    borderWidth:1,
    borderColor:'#fff'
  },
  imageStatus:{ 
    zIndex:1, 
    position:'absolute', 
    bottom:0, 
    justifyContent:'flex-end', 
    alignItems:'center',
    padding:1, 
    width:'100%', 
    height:'100%', 
    borderRadius:10
  },
  imageUploadButton:{
    width:130, 
    height:130, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#ffffff99', 
    borderRadius:80
  },
  imageUploadText:{ 
    fontSize:10, 
    color:'#4e9b8f', 
    ...FONTS.medium, 
    paddingTop:10
  }
});
import React, {useState,useEffect} from 'react';
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image,Platform,PermissionsAndroid,} from 'react-native';
import { COLORS, FONTS, SIZES, LINK } from "../constants/theme";
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
const App = (props) => {
  const [filePath, setFilePath] = useState({});
  const [photoMessage, setPhotoMessage]=useState("Profil Fotoğrafı Yükle")
  const [uploadPros, setUploadPros]=useState(0)

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
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
      compressImageQuality:0.8,
      cropperCancelText:'Vazgeç',
      cropperChooseText:'Fotoğrafı Kırp',
      loadingLabelText:'Fotoğraf ayarlanıyor',
      cropperCircleOverlay:true,
      cropperToolbarTitle:'Fotoğraf Seç',
      showCropFrame:false
    }).then(image => {
      setFilePath(image);
      uploadPhoto(image)
    });
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
        setPhotoMessage("Profil fotoğrafı yüklendi")
      }
      });
      bar.open('POST','https://api.imgur.com/3/upload');
      bar.setRequestHeader('Authorization');
      bar.send(data)
	};

  useEffect(() => {
    if(filePath.path){
      if(uploadPros==0)
      setPhotoMessage("Profil Fotoğrafı Yükle")
      if(uploadPros<98 && uploadPros>1 )
      setPhotoMessage("Yükleniyor...")
      if(uploadPros>99)
      setPhotoMessage("Tamamlanıyor...")
    }
  },[uploadPros])

  return (
    <SafeAreaView>
      <View style={styles.container}>   
      {filePath.path ?
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile('photo')}>
              <View style={{justifyContent:'center',alignItems:'center'}} >
                <View activeOpacity={0.5} style={{ backgroundColor:'#33333370', width:120, borderRadius:60, height:'100%', zIndex:1, position:'absolute', justifyContent:'center', alignItems:'center'}}onPress={() => chooseFile('photo')}>
                  <Icon style={{elevation:2}}  name={'camera-outline'} size={40} color={'#e1e1e1'}/>
                </View>
               <Image source={{uri: filePath.path}} style={styles.imageStyle}/>
              </View>
          <Text style={[styles.title, {fontSize:16, paddingTop:10, ...FONTS.regular, color:'#fff'}]}>{uploadPros<98 && uploadPros>2  && '%'+uploadPros } {photoMessage}</Text>
          <View style={{width:SIZES.width,backgroundColor:'#ffffff90', height:5, borderBottomRightRadius:10, borderTopRightRadius:10, marginTop:10}} >
            <View style={{width:(SIZES.width)*(uploadPros/100),height:5,backgroundColor:'#fff',elevation:2, borderBottomRightRadius:10, borderTopRightRadius:10, justifyContent:'center', alignItems:'center'}} >
            </View>
          </View>
        </TouchableOpacity>
      :
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Image style={{width:120, height:120, borderWidth:1, borderColor:'#fff', borderRadius:60}}  source={require('../assets/images/user.png')} />
          <Text style={[styles.title, {fontSize:16, paddingVertical:15, ...FONTS.regular, color:'#fff'}]} >{photoMessage}</Text>
        </TouchableOpacity>
      }
      </View>
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop:15,
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
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius:60,
    borderWidth:1,
    borderColor:'#fff'
  },
});
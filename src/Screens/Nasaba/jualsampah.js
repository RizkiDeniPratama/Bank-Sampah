import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export class jualsampah extends Component {
  constructor() {
    super();
    this.state = {
      lokasi: '',
      token: '',
      loading: false,
      image: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
      data: [],
    };
  }
  req = () => {
    const {lokasi, image} = this.state;
    this.setState({loading: true});
    const url = 'https://trash-all.herokuapp.com/api/nasabah/request';
    const formData = new FormData();

    formData.append('lokasi', lokasi);
    formData.append('image', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });
    console.log('ini form data', formData);
    fetch(url, {
      method: 'POST',
      headers: {
        // Accept: 'aplication/json',
        // 'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: formData,
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.status === 'succes') {
          this.props.navigation.navigate('Riwayat');
          this.setState({loading: false});
          ToastAndroid.show(
            'berhasil mengirim request penjemputan ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({loading: false});
          this.props.navigation.navigate('Home');
          ToastAndroid.show(
            'Maaf ada kesalahan server',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('errror ini ' + error);
      });
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    launchImageLibrary(option, (response) => {
      console.log(response);
      if (response.uri) {
        this.setState({image: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('token ada');
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={styles.iconheader}
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Text style={styles.textheader}>Pilih sampah</Text>
        </View>
        {/* NGIRIM FOTO */}
        <View style={styles.foto}>
          <TouchableOpacity
            style={styles.addFoto}
            activeOpacity={0.7}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.image.uri !== '' ? (
              <Image
                style={styles.profile}
                source={{uri: this.state.image.uri}}
              />
            ) : (
              <View>
                <MaterialIcons name="add-a-photo" size={150} />
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* lokasi */}
        <View style={styles.inputView}>
          <View style={styles.headerName}>
            <Text style={{fontWeight: 'bold'}}>Lokasi Anda</Text>
            <Text style={{color: 'red'}}>*</Text>
          </View>
          <TextInput
            placeholder={'Masukkan alamat anda dengan benar'}
            style={styles.input}
            onChangeText={(teks) => this.setState({lokasi: teks})}
          />
        </View>
        <TouchableOpacity onPress={() => this.req()} style={styles.tombol}>
          {this.state.loading === true ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text style={styles.texttombol}>MASUK</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default jualsampah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    backgroundColor: '#FFF',
    height: 90,
    marginTop: 10,
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop:50,
  },
  headerName: {
    backgroundColor: '#FFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 20,
  },
  inputKategori: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrice: {
    backgroundColor: '#FFF',
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  inputstok: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 1,
  },
  nampil: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  profile: {
    height: 150,
    width: 150,
  },
  foto: {
    backgroundColor: '#FFF',
    height: 200,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addFoto: {
    borderWidth: 2,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  tombol: {
    backgroundColor: '#239a35',
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    borderRadius: 7,
  },
  texttombol: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Carter',
    color: 'white',
  },
});

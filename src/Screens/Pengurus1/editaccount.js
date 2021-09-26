import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class editakun extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: '',
      name: '',
      phone: '',
      foto: {uri: '', type: 'image/jpeg', fileName: 'profilLama'},
      photo: '',
      alamat: '',
    };
  }
  edit = () => {
    const {name, phone, alamat, foto} = this.state;
    const {id: data} = this.props.route.params.data;
    const url = `https://trash-all.herokuapp.com/api/profile/${data}`;
    console.log('ini url', url);
    const body = {
      _method: 'patch',
      name: name,
      phone: phone,
      alamat: alamat,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: this.createFormData(foto, body),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson) {
          this.props.navigation.replace('Pengurus1', {screen: 'Akun'});
          ToastAndroid.show(
            ' Berhasil Diganti',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('err');
        }
      })
      .catch((error) => {
        console.log('ini error dari feact' + error);
      });
  };
  back = () => {
    this.props.navigation.navigate('Akun');
  };
  createFormData = (photo, body) => {
    const data = new FormData();
    if (photo.uri !== '') {
      data.append('foto', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });
    }
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log('ini form', data);
    console.log('ini foto', data._parts);
    return data;
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    launchImageLibrary(option, (response) => {
      console.log(response);
      if (response.uri) {
        this.setState({foto: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {});
      } else {
        console.log('token tidak ada');
      }
    });
    this.setState({
      name: this.props.route.params.data.name,
      alamat: this.props.route.params.data.alamat,
      phone: this.props.route.params.data.phone,
      // foto: {...this.state.foto, uri: this.props.route.params.data.foto},
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 20,
            }}
            onPress={() =>
              this.props.navigation.navigate('Nasabah', {screen: 'Akun'})
            }
          />
          <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
            Edit Profile
          </Text>
        </View>
        <ScrollView>
          {/* tambah photo */}
          <View style={styles.foto}>
            <TouchableOpacity
              style={styles.addFoto}
              activeOpacity={0.7}
              onPress={() => this.handleChoosePhoto()}>
              {this.state.foto.uri !== '' ? (
                <Image
                  style={styles.profile}
                  source={{uri: this.state.foto.uri}}
                />
              ) : (
                <View>
                  <MaterialIcons name="add-a-photo" size={150} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* nama user */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>Nama</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Nama Anda'}
              style={styles.input}
              value={this.state.name}
              onChangeText={(teks) => this.setState({name: teks})}
            />
          </View>

          {/* Email */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>NO PHONE</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Pastikan No hp yang bisa di hubungi'}
              style={styles.input}
              value={this.state.phone}
              onChangeText={(teks) => this.setState({phone: teks})}
            />
          </View>

          {/* no hp */}
          <View style={styles.inputView}>
            <View style={styles.headerName}>
              <Text style={{fontWeight: 'bold'}}>ALAMAT</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TextInput
              placeholder={'Mohon masukkan alamat dengan benar'}
              style={styles.input}
              value={this.state.alamat}
              onChangeText={(teks) => this.setState({alamat: teks})}
            />
          </View>

          <TouchableOpacity style={styles.nampil} onPress={() => this.edit()}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Tampilkan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default editakun;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
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
  inputView: {
    backgroundColor: '#FFF',
    height: 90,
    marginTop: 10,
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
});

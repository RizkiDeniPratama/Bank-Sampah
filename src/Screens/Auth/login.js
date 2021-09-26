import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
const byimage = require('../../Assets/Logo/daftar.png');
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      email: '',
      password: '',
      loading: false,
    };
  }

  login() {
    if (this.state.email !== '' && this.state.password !== '') {
      const {email, password} = this.state;
      const data = {email: email, password: password};
      this.setState({loading: true});
      console.log('ini bodynya blm stringify === ', data);
      fetch('https://trash-all.herokuapp.com/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log('ini resjson login === ', resJson);
          if (resJson.token) {
            AsyncStorage.setItem('token', resJson.token);
            this.setState({loading: false});
            this.props.navigation.navigate('Splash');
          } else {
            this.setState({loading: false});
            this.e();
          }
        })
        .catch((err) => {
          this.setState({loading: false});
          alert('Terjadi kesalahan. ' + err);
        });
    } else {
      ToastAndroid.show('Harap isi semua form', ToastAndroid.SHORT);
    }
  }

  e() {
    Alert.alert(
      'Warning',
      'ada data yang salah',
      [
        {
          text: 'OK',
          onPress: () => console.log('Cancel '),
        },
      ],
      {cancelable: false},
    );
  }

  ubahMata = () => {
    const eye = !this.state.visible;
    this.setState({visible: eye});
  };
  render() {
    return (
      <ImageBackground
        source={byimage}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={styles.logo}
            source={require('../../Assets/Logo/trashol.png')}
          />
          <View style={styles.signin}>
            <Text
              style={{fontWeight: 'bold', bottom: -15, marginHorizontal: 10}}>
              Email
            </Text>
            <View style={styles.action}>
              <Fontisto name="email" color="black" size={20} />

              <TextInput
                placeholder="Email"
                style={{right: -10, width: '90%'}}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={'green'}
                underlineColorAndroid="green"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>

            <Text
              style={{fontWeight: 'bold', bottom: -15, marginHorizontal: 10}}>
              Password
            </Text>
            <View style={styles.action}>
              <Octicons name="lock" color="black" size={20} />

              <TextInput
                placeholder="Password"
                style={{right: -10, width: '90%'}}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                secureTextEntry={this.state.visible}
                placeholderTextColor={'green'}
                underlineColorAndroid="green"
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
              />
              <TouchableOpacity onPress={() => this.ubahMata()}>
                <Image
                  source={
                    this.state.visible
                      ? require('../../Assets/Logo/close.png')
                      : require('../../Assets/Logo/open.png')
                  }
                  style={{height: 25, width: 28, marginTop: -10, right: 20}}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.pass}>
              <Text>{'                            '}Lupa Password?</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.login()} style={styles.tombol}>
            {this.state.loading === true ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <Text style={styles.texttombol}>MASUK</Text>
            )}
          </TouchableOpacity>
          <View style={styles.pindah}>
            <Text style={{color: '#605d5c'}}>
              Sudah Punya Akun?
              <Text
                onPress={() => this.props.navigation.navigate('Register')}
                style={styles.daftar}>
                {'         '} Daftar Sekarang
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  signin: {
    backgroundColor: '#FFF',
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 7,
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
  pindah: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  daftar: {
    color: '#f05219',
    fontFamily: 'Carter',
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: -3,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  lihat: {
    fontSize: 15,
  },
  pass: {
    marginTop: 20,
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

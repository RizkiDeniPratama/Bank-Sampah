import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
// import Textjalan from 'react-native-typewriter';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const gambar = require('../../Assets/Images/park.jpg');
export class nasabah extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: {},
    };
  }

  user() {
    const url = 'https://trash-all.herokuapp.com/api/profile';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log('darirofil', resJson);
        if (resJson) {
          this.setState({data: resJson.data});
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {
          this.user();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  alert() {
    Alert.alert(
      'Warning !!!',
      'karna anda sudah pencet anda jomblo',
      [
        {
          text: 'Iya',
        },
      ],
      {cancelable: false},
    );
  }
  render() {
    return (
      <ImageBackground
        source={gambar}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}>
        <StatusBar translucent backgroundColor="#96eee700" />
        <View style={styles.container}>
          <View style={styles.Foto}>
            <Image
              source={require('../../Assets/Logo/trashol.png')}
              style={styles.trashol}
            />
            <Text>TRASHOL</Text>
          </View>
          {/* TAMPILAN IKLAN */}
          <View style={styles.viewswiper}>
            <Swiper
              autoplay
              horizontal={true}
              height={200}
              activeDotColor="blue">
              <View style={styles.alasswiper}>
                <Image
                  source={require('../../Assets/Images/pohon.jpg')}
                  style={styles.gambarswiper}
                />
              </View>
              <View style={styles.alasswiper}>
                <Image
                  source={require('../../Assets/Images/hiu.jpeg')}
                  style={styles.gambarswiper}
                />
              </View>
              <View style={styles.alasswiper}>
                <Image
                  source={require('../../Assets/Images/bahayaplastik.jpeg')}
                  style={styles.gambarswiper}
                />
              </View>
            </Swiper>
          </View>
          {/* kotaksaldo */}

          <View style={styles.kotak}>
            <View style={styles.saldo}>
              <Text style={styles.textsaldo}>Saldo :</Text>
              <Text style={styles.nilai}>Rp. 100.000</Text>
            </View>

            {/* <TouchableOpacity
              onPress={() => this.alert()}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'red',
              }}
            /> */}
          </View>
          <View style={styles.tombolbawah}>
            {/* Jual Sampah */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('JualSampah')}
              style={styles.jualsampah}>
              {/* <Image
                source={require('../../Assets/Logo/truck.png')}
                style={{height: 50, width: 50}}
              /> */}
              <Text style={styles.title}>Jual Sampah</Text>
            </TouchableOpacity>
            {/* Riwayat Penjualan */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Riwayat')}
              style={styles.riwayat}
              activeOpacity={0.7}>
              <Image />
              <Text style={styles.title}>Riwayat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default nasabah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Kotak: {
    height: 250,
    backgroundColor: '#92f3818f',
    borderRadius: 10,
    alignSelf: 'center',
    top: 50,
  },
  text: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Langar',
  },
  kotak: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 80,
    width: 300,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  list: {
    backgroundColor: 'red',
    height: 90,
    width: 90,
    borderRadius: 15,
    margin: 5,
  },
  saldo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textsaldo: {
    // fontSize: 20,
  },
  nilai: {
    // fontSize: 25,
    // fontWeight: 'bold',
  },
  viewswiper: {
    height: 200,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    // top: 130,
  },
  alasswiper: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  gambarswiper: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  Foto: {
    flexDirection: 'row',
    paddingTop: 35,
    marginBottom: 30,
    padding: 10,
    // justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  trashol: {
    height: 50,
    width: 50,
  },
  logoprofile: {
    marginTop: 20,
  },
  jualsampah: {
    backgroundColor: '#a5d1e9ad',
    height: 50,
    width: 150,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
  },
  riwayat: {
    backgroundColor: '#c0e9a5ad',
    height: 50,
    width: 150,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
  },
  tombolbawah: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});

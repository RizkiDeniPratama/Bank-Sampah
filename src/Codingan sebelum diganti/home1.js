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
} from 'react-native';
// import Textjalan from 'react-native-typewriter';
// import AsyncStorage from '@react-native-community/async-storage';
const gambar = require('../../Assets/Images/park.jpg');
export class nasabah extends Component {
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
        <View style={styles.container}>
          {/* Header */}
          <View style={{width: '100%', height: 250}}>
            <View style={styles.header}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 5,
                  alignItems: 'center',
                }}>
                <Image
                  style={{resizeMode: 'contain', height: 40, width: 40}}
                  source={require('../../Assets/Logo/trashol.png')}
                />
                <Text style={{fontSize: 20}}>TRASHOL</Text>
              </View> */}
              <Text style={styles.text}>Selamat datang Nasabah </Text>

              {/* SALDO */}
              <Text style={{top: 20, marginHorizontal: 20, fontSize: 20}}>
                Total Saldo
              </Text>
              <View style={styles.saldo}>
                <Text style={{fontSize: 20}}>Rp</Text>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                  20.700.00
                </Text>
              </View>
            </View>

            {/* kotaksaldo */}
            <View style={styles.kotak}>
              <TouchableOpacity
                onPress={() => this.alert()}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'red',
                }}
              />
            </View>
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
  header: {
    height: 200,
    backgroundColor: '#92f3818f',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  text: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Langar',
  },
  kotak: {
    flexDirection: 'row',
    backgroundColor: '#e5e7e4',
    height: 80,
    width: 300,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    top: -100,
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
    marginTop: 30,
    marginHorizontal: 20,
  },
});

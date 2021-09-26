import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export class akunNasabah extends Component {
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

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('Login');
    console.log('User sudah Keluar');
  };
  konfirmasilogout = () => {
    Alert.alert(
      'keluar',
      'Yakin ingin keluar ?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'logout', onPress: () => this.logout()},
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 20,
            }}
            onPress={() => this.props.navigation.replace('Toko')}
          />
          <Text style={{marginLeft: 70, fontSize: 20, fontWeight: 'bold'}}>
            AKUN NASABAH
          </Text>
        </View>
        {/* FOTO */}
        <View style={styles.Foto}>
          {this.state.data.foto !== null ? (
            <Image
              style={styles.profile}
              source={{uri: this.state.data.foto}}
            />
          ) : (
            <View style={{marginTop: 20}}>
              <FontAwesome name="user-circle-o" size={140} />
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Editakun', {
                data: this.state.data,
              })
            }>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
                {this.state.data.name}
              </Text>
              <FontAwesome name="edit" size={20} style={{top: 27, left: 10}} />
            </View>
          </TouchableOpacity>
        </View>
        {/* YANG DIBAWAH */}
        <View style={{marginTop: 50}}>
          {/* EDITAKUN */}

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Editakun', {
                data: this.state.data,
              })
            }
            style={styles.kotaklist}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="user-edit" size={20} />
              <Text style={{marginLeft: 20}}>editakun</Text>
            </View>
            <IonIcons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>

          {/* RIWAYAT */}

          <TouchableOpacity style={styles.kotaklist}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="history" size={20} />
              <Text style={{marginLeft: 20}}>Riwayat Pembelian</Text>
            </View>
            <IonIcons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>

          {/* PENGATURAN */}

          <TouchableOpacity style={styles.kotaklist}>
            <View style={{flexDirection: 'row'}}>
              <IonIcons name="settings-sharp" size={20} />
              <Text style={{marginLeft: 20}}>Pengaturan</Text>
            </View>
            <IonIcons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>

          {/* COSTUMER SERVICE */}

          <TouchableOpacity style={styles.kotaklist}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="headset" size={20} />
              <Text style={{marginLeft: 20}}>Costumer Service </Text>
            </View>
            <IonIcons name="chevron-forward-sharp" size={20} />
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}

        <TouchableOpacity
          onPress={() => this.konfirmasilogout()}
          style={styles.Out}>
          <View style={{flexDirection: 'row'}}>
            <Material name="logout" size={20} />
            <Text style={{marginLeft: 20}}>LogOut </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default akunNasabah;
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
  Foto: {
    height: 200,
    // backgroundColor:'#d7d7d5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kotaklist: {
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#79ea71',
    height: 50,
    width: 340,
    left: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  Out: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#79ea71',
    height: 50,
    width: 200,
    left: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
    alignSelf: 'center',
  },
  profile: {
    borderRadius: 70,
    width: 130,
    height: 130,
    // marginTop: 25,
  },
});

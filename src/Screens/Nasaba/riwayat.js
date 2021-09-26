import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';
var {width} = Dimensions.get('window');
class Riwayat extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
    };
  }

  req = () => {
    console.log('sedang mengambil req penjemputan');
    const url = 'https://trash-all.herokuapp.com/api/nasabah/show-request';
    fetch(url, {
      method: 'GET',
      headers: {
        // Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({data: resJson.data.Menunggu});
        console.log('ini data request', JSON.stringify(resJson));
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };

  Delete = (id) => {
    console.log('menghapus');
    const url = `https://trash-all.herokuapp.com/api/nasabah/request/cancel/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('resjson hapus', resJson);
        if (resJson.status === 'succes') {
          ToastAndroid.show('barang sudah modar', ToastAndroid.SHORT);
          this.req();
        } else {
          console.log('gagal menghapus');
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          this.req();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <>
          <View style={{height: 20}} />
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#33c37d'}}>
            Riwayat penjemputan
          </Text>
          <View style={{height: 10}} />
        </>
        <ScrollView>
          {this.state.data.map((val, key) => {
            return (
              <View
                key={key}
                style={{
                  width: width - 20,
                  margin: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderColor: '#cccccc',
                  paddingBottom: 10,
                }}>
                <Image
                  source={{uri: val.image}}
                  style={{width: width / 3, height: width / 3}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'trangraysparent',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {val.nasabah.name}
                    </Text>
                    <Text>kategori</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.Delete(val.id)}
                    style={{alignSelf: 'flex-end'}}>
                    <IonIcons name="trash" size={30} color="red" />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#33c37d',
                        fontSize: 20,
                      }}>
                      {val.lokasi}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Riwayat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

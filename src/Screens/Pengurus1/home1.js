import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export class home1 extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
    };
  }

  nerima = (id) => {
    console.log('menerima');
    const url = `https://trash-all.herokuapp.com/api/pengurus-satu/accept-request/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('resjson menerima', resJson);
        if (resJson.status === 'Success') {
          ToastAndroid.show('req sudah di terima', ToastAndroid.SHORT);
          this.props.navigation.navigate('ReqDiterima');
          this.setState({data: resJson.data});
        } else {
          console.log('gagal menerima');
          ToastAndroid.show('gagl menerima', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };

  nolak = (id) => {
    console.log('menghapus');
    const url = `https://trash-all.herokuapp.com/api/pengurus-satu/decline-request/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('resjson hapus', resJson);
        if (resJson.status === 'Success') {
          ToastAndroid.show('req tidak di terima', ToastAndroid.SHORT);
          this.setState({data: resJson.data});
        } else {
          console.log('gagal menghapus');
          ToastAndroid.show('gagl menerima', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  // pen = () => {
  //   console.log('sedang mengambil req penjemputan');
  //   const url =
  //     'https://trash-all.herokuapp.com/api/pengurus-satu/show-request';
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       // Accept: 'aplication/json',
  //       'Content-Type': 'aplication/json',
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   })
  //     .then((respon) => respon.json())
  //     .then((resJson) => {
  //       this.setState({data: resJson.data.Menunggu});
  //       console.log('ini data request nasabah', JSON.stringify(resJson));
  //     })
  //     .catch((error) => {
  //       console.log('error is' + error);
  //     });
  // };

  async getPermintaan() {
    this.setState({loading: true});
    try {
      let myOptions = {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      };
      const url =
        'https://trash-all.herokuapp.com/api/pengurus-satu/show-request';
      let response = await fetch(url, myOptions);

      let resJson = await response.json();

      console.log('ini resjson get permintaan pengurus 1 == ', resJson);

      if (resJson.status === 'Success') {
        this.setState({data: resJson.data, loading: false});
      }
    } catch (err) {
      this.setState({loading: false});
      console.log('catch get permintaan == ', err);
      ToastAndroid.show('Maaf gagal mengambil data permintaan!!', 2000);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          // this.req();
          this.getPermintaan();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <IonIcons name="menu" style={styles.icondrawer} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}
              style={styles.screnSearch}>
              <Text style={styles.searchtext}>Search</Text>
              <Image
                source={require('../../Assets/Logo/3.png')}
                style={{height: 20, width: 20, left: 100}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scrollViewCont}>
          <ScrollView>
            {this.state.data === '' ? (
              <View>
                <Text>belum ada request dari nasabah</Text>
              </View>
            ) : (
              <View style={styles.addressScroll}>
                {this.state.data.map((v, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.95}
                      style={styles.addressList}
                      key={i}>
                      <View style={styles.addressListHead}>
                        <Text style={styles.addressListNumber}>
                          Permintaan {(i + 1).toString()}
                        </Text>
                        <AntDesign
                          name={
                            v.status === 1 ? 'exclamationcircle' : 'checkcircle'
                          }
                          color={v.status === 1 ? '#ff6c0a' : 'green'}
                          size={25}
                          onPress={() => {}}
                        />
                      </View>
                      <Text>{v.tanggal}</Text>
                      <Text>{v.lokasi}</Text>
                      {/* <Text>{v.no_telpon}</Text>
                  <Text>{v.lokasi}</Text>
                  <Text>{v.keterangan}</Text> */}
                      <View style={{flexDirection: 'row-reverse'}}>
                        <View style={styles.iconsCont}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.nerima(v.id)}
                            style={styles.dataButton}>
                            <Text style={styles.dataText}> nerima </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.iconsCont}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.nolak(v.id)}
                            style={styles.dataButton1}>
                            <Text style={styles.dataText}> nolak </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default home1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    paddingTop: 35,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: -30,
  },
  screnSearch: {
    backgroundColor: '#FFF',
    // paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 230,
  },
  searchtext: {
    fontWeight: 'bold',
    fontSize: 18,
    // width: 260,
  },
  icondrawer: {
    fontSize: 50,
  },
  scrollViewCont: {
    flex: 1,
    width: '100%',
  },
  addressScroll: {
    flexGrow: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  addressList: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ededed',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 4,
  },
  addressListNumber: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressListHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataButton: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  pencilIcon: {},
  iconsCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    // width: '100%',
  },
  dataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e8e8e8',
  },
  dataButton1: {
    flexDirection: 'row',
    // padding: 5,
    borderRadius: 5,
    // alignSelf:'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: 'red',
    left: 20,
  },
});

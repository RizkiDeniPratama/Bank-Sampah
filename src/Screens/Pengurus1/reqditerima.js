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
import AntDesign from 'react-native-vector-icons/AntDesign';

export class reqditerima extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token}, () => {
          this.diterima();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  diterima = () => {
    console.log('menerima');
    const url =
      'https://trash-all.herokuapp.com/api/pengurus-satu/show-accepted-request';
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
        console.log('resjson menerima request', resJson);
        if (resJson.data) {
          ToastAndroid.show('req sudah di terima', ToastAndroid.SHORT);

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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrollViewCont}>
          <ScrollView>
            {this.state.data === '' ? (
              <View>
                <Text>belum ada request yang di terima dari nasabah</Text>
              </View>
            ) : (
              <View style={styles.addressScroll}>
                {this.state.data.map((v, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.95}
                      style={styles.addressList}
                      key={i}
                      onPress={() =>
                        this.props.navigation.navigate('Penyelesaian', {
                          item: v,
                        })
                      }>
                      <View style={styles.addressListHead}>
                        <Text style={styles.addressListNumber}>
                          Permintaan {(i + 1).toString()}
                        </Text>
                        <AntDesign
                          name={'checkcircle'}
                          color={'green'}
                          size={25}
                          onPress={() => {}}
                        />
                      </View>
                      <Text>{v.tanggal}</Text>
                      <Text>{v.lokasi}</Text>
                      <Text>{v.status}</Text>
                      {/*
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
                      </View> */}
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

export default reqditerima;
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

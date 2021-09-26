import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
// import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

export default class InputSampah extends Component {
  state = {
    nasabah_id: '',
    lokasi: this.props.route.params.item.lokasi,
    token: '',
    data: [],
    berat: '',
    inputData: '',
    loading: true,
    keterangan_penyetoran: 'dijemput',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        this.setState({token: token}, () => this.getSampah());
      } else {
        console.log('tidak ada token');
      }
    });
    // this.setState({
    //   // data: this.props.route.params.item,
    //   //   nasabah_id: this.props.route.params.item.id,
    //   //   lokasi: this.props.route.params.item.penjemputan[0],
    // });
  }

  getSampah = () => {
    this.setState({loading: true});
    const url = 'https://trash-all.herokuapp.com/api/sampah  ';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        let dataPilihan = resJson.data['1'];
        console.log('ini sattus = ', resJson.status);
        console.log('ini data pilihanku 1 === ', dataPilihan);
        if (resJson.status === 'succes') {
          this.setState({
            data: dataPilihan,
            inputData: dataPilihan[0].id,
            loading: false,
          });
        } else {
          alert('belum ada data sampah');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // harga() {
  //   const total = this.state.berat * this.state.inputData.harga_perkilogram;

  //   return <Text>{this.toPrice(total)}</Text>;
  // }

  // toPrice(price) {
  //   return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  // }
  render() {
    // console.log('ini lokasi si peminta', this.props.route.params.item);
    return (
      <>
        {this.state.loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={50} color={'green'} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: 'green',
                padding: 10,
                elevation: 1,
              }}>
              <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>
                InputSampah
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
              <View>
                <Text style={styles.DataTextLeft}>Lokasi</Text>
                <Text>{this.state.lokasi}</Text>
              </View>
              <Text>pilih sampah mu</Text>
              <Picker
                mode="dropdown"
                selectedValue={this.state.inputData}
                style={{height: 50, width: 300}}
                onValueChange={(itemValue, index) =>
                  this.setState(() => {
                    console.log('ini yg terpilih = ', itemValue);
                    console.log('ini index terpilih = ', index);
                    return {inputData: itemValue};
                  })
                }>
                {this.state.data.map((v, i) => {
                  return (
                    <Picker.Item
                      key={v.id}
                      value={v.id}
                      label={v.jenis_sampah}
                    />
                  );
                })}
              </Picker>
              {/* <View style={styles.dataWeight}>
                <Text style={styles.DataTextLeft}>harga per kg :</Text>
                <View style={{borderWidth: 0.5, padding: 10, width: 110}}>
                  <Text>Rp. {this.state.inputData.harga_perkilogram}</Text>
                </View>
              </View> */}

              <View style={styles.dataWeight}>
                <Text style={styles.DataTextLeft}>Berat :</Text>
                <TextInput
                  value={this.state.berat}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => this.setState({berat: text})}
                  placeholder={'0'}
                  style={styles.pickerWeight}
                />
                <Text>kg</Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  dataScrollViewCont: {
    flex: 1,
    paddingTop: 25,
    width: '100%',
    backgroundColor: '#029739',
  },
  addressListTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 25,
    color: 'white',
    textAlign: 'center',
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  totalPrice: {
    fontSize: 24,
    textAlign: 'center',
    color: '#eee',
  },
  dataListCont: {
    flex: 1,
  },
  dataScroll: {
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
  iconsCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
  },
  pencilIcon: {},
  dataInputs: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  dataInputDetailsCont: {
    flex: 1,
  },
  dataWeight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DataTextLeft: {
    fontSize: 16,
  },
  pickerWeight: {
    width: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgreen',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  addDataButton: {
    flexDirection: 'row',
    padding: 3,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    elevation: 5,
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  addDataButtonText: {
    fontWeight: 'bold',
    color: 'green',
  },
});

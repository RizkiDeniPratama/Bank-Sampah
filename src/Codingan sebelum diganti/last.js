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
  Picker,
  KeyboardAvoidingView,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
// import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

export default class InputSampah extends Component {
  state = {
    nasabah_id: '',
    lokasi: '',
    token: '',
    sampah: [],
    sampah2: '',
    berat: '',
    inputData
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
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
    const url = 'https://trash-all.herokuapp.com/api/sampah';

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
        if (resJson.status === 'Success') {
          this.setState({sampah: resJson.data});
          console.log('ini ', this.state.sampah);
        } else {
          alert('belum ada data sampah');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  harga() {
    const total = this.state.berat * this.state.sampah2.harga_perkilogram;

    return <Text>{this.toPrice(total)}</Text>;
  }

  Input = () => {
    const {nasabah_id, lokasi} = this.state;

    var sampah = [
      {
        sampah_id: this.state.sampah2.id,
        berat: this.state.berat,
      },
    ];

    let form = new FormData();

    sampah.forEach((v, i) => {
      form.append(`sampah[${i}][sampah_id]`, v.sampah_id);
      form.append(`sampah[${i}][berat]`, v.berat);
    });

    form.append('lokasi', lokasi);
    form.append('nasabah_id', nasabah_id);
    form.append('auto_confirm', true);

    console.log('ini', form);

    const url =
      'https://trash-all.herokuapp.com/api/pengurus_satu/penyetoran/store';

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      body: form,
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.status == 'Success') {
          ToastAndroid.show(
            'Data Berhasil TerInput',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('SearchNasabah');
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log('error is ' + error);
      });
  };

  totalPrice = () => {
    let init = 0;

    if (this.state.inputData.length > 0) {
      this.state.inputData.forEach((v) => {
        let hasil = v.berat * v.harga_nasabah;
        init += hasil;
      });
      console.log('check reduce == ', init);
    }

    return init;
  };

  render() {
    console.log(this.state.sampah2.id);
    return (
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

        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.dataScrollViewCont}>
          <Text style={styles.addressListTitle}>Pendataan</Text>
          <View style={styles.dataHeader}>
            <Button
              title={'Batal'}
              color={'red'}
              onPress={() =>
                this.setState({
                  modalDataInput: false,
                  inputData: [],
                  jenisSampah: this.getChoices(),
                })
              }
            />
            <Button
              title={'Kirim'}
              color={'blue'}
              onPress={this.handleSendData}
            />
          </View>
          <Text style={styles.totalPrice}>Total : Rp.{this.totalPrice()}</Text>
          <View style={styles.dataListCont}>
            <ScrollView contentContainerStyle={styles.dataScroll}>
              {this.state.inputData.map((v, i) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addressList}
                    key={i}>
                    <View style={styles.addressListHead}>
                      <Text style={styles.addressListNumber}>
                        Data {(i + 1).toString()}
                      </Text>
                    </View>
                    <Text>Jenis : {v.nama}</Text>
                    <Text>Berat : {v.berat} kg</Text>
                    <View style={styles.iconsCont}>
                      <IonIcon
                        style={styles.pencilIcon}
                        name={'trash'}
                        color={'red'}
                        size={24}
                        onPress={() => this.handleDeleteData(i, v)}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.dataInputs}>
            <View style={styles.dataInputDetailsCont}>
              <View style={styles.dataWeight}>
                <Text style={styles.DataTextLeft}>Jenis :</Text>
                <Picker
                  selectedValue={this.state.input}
                  style={styles.pickerTrash}
                  onValueChange={(itemValue) =>
                    this.setState({input: itemValue})
                  }>
                  {this.state.jenisSampah.map((v, i) => (
                    <Picker.Item key={i} label={v.nama} value={v.id} />
                  ))}
                </Picker>
              </View>
              <View style={styles.dataWeight}>
                <Text style={styles.DataTextLeft}>Berat :</Text>
                <TextInput
                  value={this.state.weightInput}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => this.setState({weightInput: text})}
                  placeholder={'0'}
                  style={styles.pickerWeight}
                />
                <Text>kg</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.addData}
              style={styles.addDataButton}>
              <Text style={styles.addDataButtonText}> Tambah </Text>
              <IonIcon name={'add-circle'} size={25} color={'green'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
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

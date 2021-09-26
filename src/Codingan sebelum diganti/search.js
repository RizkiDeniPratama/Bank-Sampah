import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  // ToastAndroid,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
var {width} = Dimensions.get('window');
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      token: '',
    };
  }

  searc = () => {
    console.log('sedang mengambil search penjemputan');
    const url =
      'https://trash-all.herokuapp.com/api/pengurus-satu/search-nasabah';
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
        this.setState({data: resJson.data});
        console.log('ini data Search', JSON.stringify(resJson));
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  search = () => {
    console.log('sedang mengambil search penjemputan');
    const url = `https://trash-all.herokuapp.com/api/pengurus-satu/search-nasabah/${this.state.text}`;
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
        this.setState({data: resJson.data});
        console.log('ini data Search', JSON.stringify(resJson));
      })
      .catch((error) => {
        console.log('error is' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value != null) {
        this.setState({token: value}, () => {
          this.searc();
        });
      } else {
        console.log('token tidak ada');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <TextInput
            value={this.state.text}
            style={styles.textInputSearch}
            placeholder="Search"
            autoFocus
            placeholderTextColor="grey"
            onEndEditing={() => this.search()}
            onChangeText={(data) => this.setState({text: data})}
          />
          <View style={styles.justify}>
            <TouchableOpacity onPress={() => this.search()}>
              <Image
                source={require('../../Assets/Logo/magnifier.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.data.map((val, key) => {
            return (
              <TouchableOpacity
                key={key}
                style={{
                  width: width - 20,
                  margin: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                  borderColor: '#cccccc',
                  paddingBottom: 10,
                }}
                onPress={() =>
                  this.props.navigation.navigate('Penyelesaian', {item: val})
                }>
                {val.foto !== null ? (
                  <Image
                    style={{width: width / 3, height: width / 3}}
                    resizeMode="cover"
                    source={{uri: val.foto}}
                  />
                ) : (
                  <View style={{marginTop: 20}}>
                    <FontAwesome name="user-circle-o" size={100} />
                  </View>
                )}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'trangraysparent',
                    padding: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {val.name}
                    </Text>
                    {val.phone !== null ? (
                      <Text>{val.phone}</Text>
                    ) : (
                      <Text>Kosong</Text>
                    )}
                    <Text>kategori</Text>
                  </View>
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'grey',
  },
  containerSearch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputSearch: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  justify: {
    justifyContent: 'center',
  },
  icon: {
    height: 23,
    width: 23,
    tintColor: 'white',
  },
});

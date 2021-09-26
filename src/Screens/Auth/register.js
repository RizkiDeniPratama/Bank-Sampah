import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import IonIcons from 'react-native-vector-icons/Ionicons';
class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    loading: false,
  };
  signup = () => {
    const {name, email, password, password_confirmation} = this.state;
    this.setState({loading: true});
    const url = 'https://trash-all.herokuapp.com/api/register';
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    console.log('ini form data', formData);
    fetch(url, {
      method: 'POST',
      // headers: {
      //   Accept: 'aplication/json',
      //   'Content-Type': 'aplication/json',
      // },
      body: formData,
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.token) {
          this.props.navigation.replace('Login');
          this.setState({loading: false});
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({loading: false});
          ToastAndroid.show(
            'mungkin ada email yand sudah di gunakan dan password minimal 8',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('errror ini ' + error);
      });
  };

  login = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.atas}>
          <Image
            style={styles.gambaratas}
            source={require('../../Assets/Images/register.jpg')}
          />
        </View>
        <View style={styles.bawah}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headertext}>Create an account</Text>

            {/* <Text style={{ fontWeight: 'bold', bottom: -15 }}>name</Text> */}
            <View style={styles.action}>
              <FontAwesome name="user-o" color="black" size={20} />

              <TextInput
                placeholder="your username"
                style={styles.textinput}
                autoCapitalize="words"
                value={this.state.name}
                onChangeText={(teks) => this.setState({name: teks})}
              />
            </View>

            {/* <Text style={{ fontWeight: 'bold', bottom: -15 }}>E-mail</Text> */}
            <View style={styles.action}>
              <Feather name="mail" color="black" size={20} />

              <TextInput
                placeholder="your email"
                style={styles.textinput}
                keyboardType="email-address"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            {/* <Text style={{ fontWeight: 'bold', bottom: -15 }}>password</Text> */}
            <View style={styles.action}>
              <Feather name="lock" color="black" size={20} />

              <TextInput
                placeholder="your password"
                style={styles.textinput}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
              />
            </View>

            <View style={styles.action}>
              <Feather name="lock" color="black" size={20} />

              <TextInput
                placeholder="password again"
                style={styles.textinput}
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password_confirmation}
                onChangeText={(teks) =>
                  this.setState({password_confirmation: teks})
                }
              />
            </View>

            <TouchableOpacity
              onPress={() => this.signup()}
              style={styles.tombol}>
              {this.state.loading === true ? (
                <ActivityIndicator size={20} color="white" />
              ) : (
                <Text style={styles.texttombol}>DAFTAR</Text>
              )}
            </TouchableOpacity>
            <Text
              style={{color: 'blue', fontWeight: 'bold', right: -10}}
              onPress={() => this.login()}>
              Sing in
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  atas: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gambaratas: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bawah: {
    flex: 3,
    backgroundColor: '#05a814',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headertext: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Carter',
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: -3,
    alignItems: 'center',
    backgroundColor: '#a5a3a1e0',
    borderRadius: 50,
    paddingHorizontal: 10,
  },

  textinput: {
    right: -10,
    width: '90%',
  },
  tombol: {
    backgroundColor: '#1072ea',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 30,
  },
  texttombol: {color: 'white', fontWeight: 'bold'},
});

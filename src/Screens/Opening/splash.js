import React from 'react';
import {View, StyleSheet, Image, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
  }
  user(tokek) {
    const url = 'https://trash-all.herokuapp.com/api/profile';

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokek}`,
      },
    })
      .then((response) => response.json())
      .then((resJson) => {
        console.log('darirofil', resJson);
        if (resJson.status === 'Success') {
          this.setState({data: resJson.data}, () => {
            if (resJson.data.role_id === 1) {
              this.props.navigation.replace('Nasabah');
            }
            if (resJson.data.role_id === 2) {
              this.props.navigation.replace('Pengurus1');
            }
            if (resJson.data.role_id === 3) {
              this.props.navigation.replace('Pengurus2');
            }
          });
        } else if (resJson.status === 'Token is Expired') {
          AsyncStorage.removeItem('token', () => {
            this.props.navigation.replace('Login');
          });
        }
      })
      .catch((error) => {
        // AsyncStorage.removeItem('token', () => {
        //   this.props.navigation.replace('Login');
        // });
      
        console.log('error is' + error);
      });
  }

  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token').then((token) => {
        console.log(token);
        if (token) {
          this.user(token);
        } else {
          this.props.navigation.replace('Login');
        }
      });
    }, 4000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../Assets/Logo/trashol.png')}
        />
      </View>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: '65%',
    height: 150,
    resizeMode: 'contain',
  },
});

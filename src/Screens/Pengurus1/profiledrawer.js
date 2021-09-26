import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class profiledrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Akun1')}
          style={styles.drawernavigasi}
          activeOpacity={0.7}>
          <View style={styles.navigation}>
            <FontAwesome5 name="th-large" size={25} />

            <Text style={styles.buttonsText}>Dasbord Saya</Text>
          </View>
          <IonIcons name={'chevron-forward'} size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ReqDiterima')}
          style={styles.drawernavigasi}
          activeOpacity={0.7}>
          <View style={styles.navigation}>
            <FontAwesome5 name="user-edit" size={25} />
            <Text style={styles.buttonsText}>diterima</Text>
          </View>
          <IonIcons name={'chevron-forward'} size={26} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default profiledrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  drawernavigasi: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});

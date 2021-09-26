import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
export class jualsampah extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <IonIcons
            name="arrow-back-outline"
            size={30}
            style={styles.iconheader}
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Text style={styles.textheader}>Pilih sampah</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrol}>
          <TouchableOpacity style={styles.kotak}>
            <Image />
            <Text>Plastik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kotak}>
            <Image />
            <Text>Plastik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kotak}>
            <Image />
            <Text>Plastik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kotak}>
            <Image />
            <Text>Plastik</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default jualsampah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrol: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kotak: {
    height: 200,
    width: 150,
    backgroundColor: 'red',
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
  header: {
    backgroundColor: '#FFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textheader: {
    marginLeft: 70,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconheader: {
    marginLeft: 20,
  },
});

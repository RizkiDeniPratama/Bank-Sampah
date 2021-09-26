import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home1 from '../../Screens/Pengurus2/akun2';
import Akun1 from '../../Screens/Pengurus2/home2';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Tabnavigations() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            sizeIcon = size;
          } else if (route.name === 'Keranjang') {
            iconName = focused ? 'cart' : 'cart';
            sizeIcon = size;
          }

          return <IonIcons name={iconName} size={sizeIcon} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#003ac2',
        inactiveTintColor: '#97959585',
        showLabel: true,
        // tabStyle:{backgroundColor:'grey'}
      }}>
      <Tab.Screen name="Home1" component={Home1} />
      <Tab.Screen name="Akun1" component={Akun1} />
    </Tab.Navigator>
  );
}
export default Tabnavigations;

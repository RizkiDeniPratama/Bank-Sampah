import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../../Screens/Nasaba/home';
import Akun from '../../Screens/Nasaba/akun'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

function Tabnavigations() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting = {false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            sizeIcon = size;
          } else if (route.name === 'Akun') {
            iconName = focused ? 'person-circle-sharp' : 'person-circle-sharp';
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
}
export default Tabnavigations

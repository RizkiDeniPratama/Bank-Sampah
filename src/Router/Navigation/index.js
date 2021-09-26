import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../Screens/Auth/login';
import Register from '../../Screens/Auth/register';
import Forgot from '../../Screens/Auth/forgot';
import Nasabah from '../TabNavigation/nasabah';
import Pengurus1 from '../TabNavigation/pengurus1';
import Pengurus2 from '../TabNavigation/pengurus2';
import Splash from '../../Screens/Opening/splash';
import Intro from '../../Screens/Opening/intro';
import Editakun from '../../Screens/Nasaba/editakun';
import JualSampah from '../../Screens/Nasaba/jualsampah';
import Riwayat from '../../Screens/Nasaba/riwayat';
import ProfileDrawer from '../../Screens/Pengurus1/profiledrawer';
import Search from '../../Screens/Pengurus1/search';
import Editakon from '../../Screens/Pengurus1/editaccount';
import Penyelesaian from '../../Screens/Pengurus1/penyelesaian';
import ReqDiterima from '../../Screens/Pengurus1/reqditerima'
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Nasabah" component={Nasabah} />
        <Stack.Screen name="Pengurus1" component={Pengurus1} />
        <Stack.Screen name="Pengurus2" component={Pengurus2} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Editakun" component={Editakun} />
        <Stack.Screen name="JualSampah" component={JualSampah} />
        <Stack.Screen name="Riwayat" component={Riwayat} />
        <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Editakon" component={Editakon} />
        <Stack.Screen name="Penyelesaian" component={Penyelesaian} />
        <Stack.Screen name="ReqDiterima" component={ReqDiterima} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;

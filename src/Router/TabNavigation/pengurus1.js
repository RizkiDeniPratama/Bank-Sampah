import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home1 from '../../Screens/Pengurus1/home1';
import Akun1 from '../../Screens/Pengurus1/akun1';
import ProfileDrawer from '../../Screens/Pengurus1/profiledrawer';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ProfileDrawer {...props} />}>
      <Drawer.Screen name="Home1" component={Home1} />
      <Drawer.Screen name="Akun1" component={Akun1} />
    </Drawer.Navigator>
  );
}



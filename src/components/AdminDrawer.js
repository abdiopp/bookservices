import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerItemList, createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Profile from '../screens/Frontend/Profile';
import Notification from '../screens/Frontend/Notification';
import { useAuthContaxt } from '../contaxts/AuthContaxt';
import styles from '../screens/Styles/Style';
import Dashboard from '../screens/Dashboard/Dashboard';
import AddCategory from '../screens/Dashboard/AddCategory';
import AddWorker from '../screens/Dashboard/AddWorker';
import auth from '@react-native-firebase/auth';
import notify from '../config/global';
import { Surface } from 'react-native-paper';
import Order from '../screens/Dashboard/Order';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { dispatch, user } = useAuthContaxt()
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: "Logout" })
        notify("User Logout!", "", "success");
      });
  }
  return (
    <DrawerContentScrollView {...props}>

      <View style={{ marginVertical: 10 }}>
        <View style={[styles.flexaround,]}>
          <Surface style={ { backgroundColor: "#fff", borderRadius:100, overflow:"hidden" }} elevation={4}>
            <View  >
              <Image source={require("../assets/logo/Avater.png")} style={{ width: 50, height: 50 }} />
            </View>
          </Surface>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.h}>{user.username}</Text>
            <Text style={styles.p}>{user.email}</Text>
          </View>
        </View>
      </View>


      <DrawerItemList {...props} />

      <View style={{ paddingHorizontal: 15 }}>
        <Button
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>

  );
}
export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        overlayColor: 'transparent',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="AddCategory" component={AddCategory} />
      <Drawer.Screen name="AddWorker" component={AddWorker} />
      <Drawer.Screen name="Orders" component={Order} />
      <Drawer.Screen name="Profile" component={Profile} />

    </Drawer.Navigator>
  )
}
import * as React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Frontend/Home';
import Categories from '../screens/Frontend/Categories';
import Notification from '../screens/Frontend/Notification';
import Profile from '../screens/Frontend/Profile';
import ServiceDetail from '../screens/Frontend/ServiceDetail';
import SubCategorie from '../screens/Frontend/SubCategorie';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Signin from '../screens/Auth/Signin';
import {useAuthContaxt} from '../contaxts/AuthContaxt';
import Signup from '../screens/Auth/Signup';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from '../screens/Styles/Style';
import AdminDrawer from '../components/AdminDrawer';
import auth from '@react-native-firebase/auth';
import notify from '../config/global';
import Order from '../screens/Frontend/Order';
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-circle"
              color={color}
              size={20}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={20}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="bell" color={color} size={20} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}
// ---------------------- CustomDrawer

function CustomDrawerContent(props) {
  const {dispatch, user} = useAuthContaxt();
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: 'Logout'});
        notify('User Logout!', '', 'success');
      });
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginVertical: 10}}>
        <View style={[styles.flexaround]}>
          <Image
            source={require('../assets/logo/Avater.png')}
            style={[styles.circle, {width: 60, height: 60}]}
          />
          {/* <Surface style={ { backgroundColor: "#fff", borderRadius:100, overflow:"hidden" }} elevation={4}>
            <View  >
              <Image source={require("../assets/logo/Avater.png")} style={{ width: 50, height: 50 }} />
            </View>
          </Surface> */}
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.h}>{user.username}</Text>
            <Text style={styles.p}>{user.email}</Text>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />
      <View style={{paddingHorizontal: 15}}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        overlayColor: 'transparent',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="TabRoot"
        component={MyTabs}
        options={{drawerLabel: 'Home', headerTitle: 'Home'}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Orders" component={Order} />
    </Drawer.Navigator>
  );
}
function App() {
  const {isAuth, user} = useAuthContaxt();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Sigin"
        screenOptions={{
          headerShown: false,
        }}>
        {isAuth ? (
          user.role == 'admin' ? (
            <Stack.Group>
              <Stack.Screen name="AdminRoot" component={AdminDrawer} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="root" component={MyDrawer} />
              <Stack.Screen name="Categories" component={MyTabs} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name=":id" component={ServiceDetail} />
              <Stack.Screen name=":category" component={SubCategorie} />
            </Stack.Group>
          )
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

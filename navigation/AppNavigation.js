import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions, Animated, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../screens/CustomDrawerContent';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/admin/HomeScreen';
import CalendarScreen from '../screens/admin/CalendarScreen';
import AddScreen from '../screens/admin/AddProject';
import NotificationScreen from '..//screens/admin/Notification';
import ProfileScreen from '../screens/admin/ProfileScreen';
import AddNew from '../screens/admin/AddNewUser';
import RespList from '../screens/admin/RespList';
import ProjList from '../screens/admin/ProjectsList';
import MemList from '../screens/admin/MembersList';
import HomeResp from '../screens/Gestionnaire/Home.jsx';
import Notification from '../screens/Gestionnaire/Notification';
import Project from'../screens/Gestionnaire/ProjectDetails';
import Details from'../screens/Gestionnaire/Details';
import homeM from '../screens/member/HomeScr';

import { FontAwesome5 } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function AppNavigation() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;



  function MyStack() {
    return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="AddNew" component={AddNew} />
        <Stack.Screen name="Home" component={MyTab} />
        {/* <Stack.Screen name="Homee" component={MyDrawer} /> */}

        <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="HomeResp" component={RespTab} />
        <Stack.Screen name="Project" component={Project} />  
        <Stack.Screen name="Details" component={Details} />  


        <Stack.Screen name="homeM" component={MemTab} />


      </Stack.Navigator>
    );
  }
  function MemTab() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}
      >
        <Tab.Screen name="homeM" component={homeM}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })} />
        <Tab.Screen name="calen" component={CalendarScreen}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1,
              useNativeDriver: true
            }).start();
          }
        })} />
        
        <Tab.Screen name="Notification" component={Notification} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start();
          }
        })}/>
         
        <Tab.Screen name="ProfileTabs" component={ProfileScreen} 
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}/>
        
      </Tab.Navigator>
      
    );
  }
  function RespTab() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}
      >
        <Tab.Screen name="HomeResp" component={HomeResp}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })} />
        <Tab.Screen name="calen" component={CalendarScreen}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1,
              useNativeDriver: true
            }).start();
          }
        })} />
        
        <Tab.Screen name="Notification" component={Notification} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start();
          }
        })}/>
         
        <Tab.Screen name="ProfileTabs" component={ProfileScreen} 
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}/>
        
      </Tab.Navigator>
      
    );
  }
  function MyTab() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}
      >
        <Tab.Screen name="HomeTabs" component={HomeScreen}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })} />
        <Tab.Screen name="Cal" component={CalendarScreen}
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1,
              useNativeDriver: true
            }).start();
          }
        })} />
        <Tab.Screen name="Add" component={AddScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="plus"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start();
          }
        })}/>
        <Tab.Screen name="Notif" component={NotificationScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start();
          }
        })}/>
         
        <Tab.Screen name="ProfileTabs" component={ProfileScreen} 
         options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? "#31572c" : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}/>
        
      </Tab.Navigator>
      
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false  }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MyStack} />
        <Drawer.Screen name="Responsable" component={RespList} />
        <Drawer.Screen name="Members" component={MemList} />
        <Drawer.Screen name="Projects" component={ProjList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
function getWidth() {
  let width = Dimensions.get("window").width

  width = width - 80

  return width / 5
}
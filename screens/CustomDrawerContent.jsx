import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons'; 
import COLORS from "../config/COLORS";

const CustomDrawerContent = (props) => {
  const CustomDrawerItem = ({ label, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
      <FontAwesome5 name={icon} size={20} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
  const CustomLogoutItem = ({ label, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
      <FontAwesome5 name={icon} size={20} style={styles.iconLogout} />
      <Text style={styles.logoutLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/Avatar.png')} style={styles.avatar} />
      </View>
      <CustomDrawerItem label="Home" icon="home" onPress={() => props.navigation.navigate('Home')} />
      <CustomDrawerItem label="Responsable" icon="user-alt" onPress={() => props.navigation.navigate('Responsable')} />
      <CustomDrawerItem label="Members" icon="users" onPress={() => props.navigation.navigate('Members')} />
      <CustomDrawerItem label="Projects" icon="project-diagram" onPress={() => props.navigation.navigate('Projects')} />
      <CustomLogoutItem
        label="Logout"
        icon="sign-out-alt"
        onPress={() => {
          // Handle logout logic here
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: COLORS.hey,
    borderWidth: 3,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginTop:20,
    marginRight: 20,
    color: "#e09132", 
  },
  label: {
    marginTop:20,
    fontSize: 16,
    color: "#132a13", 
  },
  logoutLabel: {
    fontSize: 16,
    color: "#132a13", 
    marginTop:330
  },
  iconLogout: {
    marginRight: 20,
    color: "#e09132", 
    marginTop:330
  },
});

export default CustomDrawerContent;

import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Avatar, Title, Caption, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacing from '../../constants/Spacing';
import COLORS from '../../config/COLORS';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';
import AppTextInput from "../../components/AppTextInput";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userInformation, setUserInformation] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedUserEmail, setEditedUserEmail] = useState('');
  const [editedUserSpecialty, setEditedUserSpecialty] = useState('');
  const [editedUserSocId, setEditedUserSocId] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          const response = await fetch(`http://20.20.17.96:3003/getUser/${storedUserId}`);
          const userData = await response.json();
          setUserInformation(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [refreshPage]);

  const handleEdit = () => { 
    if (userInformation) {
      setEditedUserName(userInformation.name);
      setEditedUserEmail(userInformation.email);
      setEditedUserSpecialty(userInformation.Cin);
      setEditedUserSocId(userInformation.societyId);
      setEditModalVisible(true);
    }
  };
const handleCancelEdit=()=>{
  setEditModalVisible(false);
  console.log("back")
}
  const handleSaveEdit = async () => {
    try {
      const storedUserId = userInformation?._id;

      const response = await fetch(`http://20.20.17.96:3003/update/${storedUserId}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editedUserName,
          email: editedUserEmail, 
          speciality: editedUserSpecialty, 
        }),
      });
      if (response.ok) {
        console.log(editedUserName, 'logi');
        Alert.alert('Success', 'user updated successfully', [{ text: 'OK', onPress: () => setRefreshPage(!refreshPage) }]);
        setEditModalVisible(false); 
      } else {
        Alert.alert('Error', 'Failed to update User here');
        console.log(editedUserName, 'log');
        console.log(storedUserId, 'id');
      }
    } catch (error) {
      console.error('Error updating User:', error);
      Alert.alert('Error', 'Failed to update User');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ borderBottomStartRadius:0 ,borderBottomEndRadius:49, backgroundColor: COLORS.hey, width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={require('../../assets/images/Avatar.png')}
              size={170}
              style={styles.avatar}
            />
            <Title style={[styles.title, { marginTop: 10, marginBottom: 5 }]}>{userInformation?.Name}</Title>
            <Caption style={styles.caption}>{userInformation?.email}</Caption>
          </View>
        </View>
        {/* Back button */}
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>
       
        {/* Edit icon */}
        <View style={{ position: 'absolute', top: 20, right: 20 }}>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome5 name="edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* User Info Section */}
      <View style={styles.infoSection}>
        <View style={{ marginVertical: Spacing * 2,marginTop:40 }}>
          <TouchableOpacity style={styles.notification}>
            <View style={styles.row}>
              <Icon name="id-card" color="#777777" size={20} />
              <Text style={styles.infoText}>{userInformation?.speciality}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={styles.infoText}>{userInformation?.email}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={styles.infoText}>Kolkata, India</Text>
            </View>
          </TouchableOpacity>
        </View>    
      </View>

      {/* Edit modal */}
      <Modal visible={editModalVisible} onDismiss={() => setEditModalVisible(false)} contentContainerStyle={styles.modalContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={{ fontSize: 20, color: COLORS.hey, marginTop: 150 ,marginLeft: 130}}>
            Edit Profile
          </Text>
        </View>
        <AppTextInput
          style={styles.input}
          value={editedUserName}
          onChangeText={setEditedUserName}
          placeholder="Enter new name"
          icon="user"
        />
        <AppTextInput
          style={styles.input}
          value={editedUserEmail}
          onChangeText={setEditedUserEmail}
          placeholder="Enter new email"
          icon="envelope"
        />
        <AppTextInput
          style={styles.input}
          value={editedUserSpecialty}
          onChangeText={setEditedUserSpecialty}
          placeholder="Enter new Cin"
          icon="id-card"
        />
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between' ,marginLeft:50,marginRight:50}}>
          <Button mode="contained" onPress={handleSaveEdit} style={{ backgroundColor: COLORS.hey, width:140  }}>Save</Button>
          <Button mode="contained" onPress={handleCancelEdit} style={{ backgroundColor: COLORS.dark ,width:140 }}>cancel</Button>
        </View>
        

      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userInfoSection: {
    paddingTop: 40,
    alignItems: 'center',
    marginTop: 160,
  },
  infoSection: {
    marginBottom: 180,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15
  },
  avatar: {
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  infoText: {
    marginLeft: 20,
    fontSize: 16,
  },
  notification: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    width: '75%',
    height: 150,
    marginLeft: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    width: "80%",
    minHeight: "50%", 
    marginTop: "25%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  
});

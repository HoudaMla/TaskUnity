// Import useEffect and useState
import React, { useState, useEffect } from 'react';
import { Card, Modal, TextInput, Button } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Alert } from "react-native";
import Spacing from '../../constants/Spacing';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../config/COLORS";
import AppTextInput from "../../components/AppTextInput";

export default function RespList() {
  const [responsables, setResponsables] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingResponsible, setEditingResponsible] = useState(null);
  const [editedResponsibleName, setEditedResponsibleName] = useState('');
  const [editedResponsibleEmail, setEditedResponsibleEmail] = useState('');
  const [editedResponsibleSpecialty, setEditedResponsibleSpecialty] = useState('');
  const [editedResponsibleId, setEditedResponsibleId] = useState(''); 

  const navigation = useNavigation();

  useEffect(() => {
    fetchResponsables();
  }, [refreshPage]);

  const fetchResponsables = async () => {
    try {
      const type = "responsible";
      const response = await fetch(`http://192.168.1.11:3000/user/${type}`);
      const data = await response.json();
      setResponsables(data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleEdit = (id) => { 
    const responsible = responsables.find(res => res._id === id); 
    setEditingResponsible(responsible);
    setEditedResponsibleId(id);
    setEditedResponsibleName(responsible.Name);
    setEditedResponsibleEmail(responsible.email);
    setEditedResponsibleSpecialty(responsible.speciality);
   
    setEditModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.11:3000/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Responsible deleted successfully', [{ text: 'OK', onPress: () => setRefreshPage(!refreshPage) }]);
      } else {
        Alert.alert('Error', 'Failed to delete responsible');
      }
    } catch (error) {
      console.error('Error deleting responsible:', error);
      Alert.alert('Error', 'Failed to delete responsible');
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://192.168.1.11:3000/update/${editedResponsibleId}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editedResponsibleName,
          email: editedResponsibleEmail, 
          speciality: editedResponsibleSpecialty, 
        }),
      });
      if (response.ok) {
        console.log(editedResponsibleName,"logi")
        Alert.alert('Success', 'Responsible updated successfully', [{ text: 'OK', onPress: () => setRefreshPage(!refreshPage) }]);
        setEditModalVisible(false); 
      } else {
        Alert.alert('Error', 'Failed to update responsible here');
        console.log(editedResponsibleName,"log");
        console.log(editedResponsibleId,"id")
      }
    } catch (error) {
      console.error('Error updating responsible:', error);
      Alert.alert('Error', 'Failed to update responsible');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.hey }}>
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: "#FFEFCD", marginTop: 5 }}>
            Responsible List
          </Text>
          <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopStartRadius: 49, backgroundColor: "#fff", borderColor: "#132a13", borderWidth: 3, width: '110%', height: '100%', marginTop: 30 }}>
          <TouchableOpacity
            style={[{
              padding: Spacing * 2,
              marginLeft: 285,
              borderRadius: Spacing,
              shadowColor: COLORS.hey,
              flexDirection: 'row', justifyContent: 'space-between',
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.1,
              shadowRadius: Spacing,
            }]}
            onPress={() => navigation.navigate('AddNew')} >
            <FontAwesome5 name="plus" color="#31572c" size={10} marginRight="30"></FontAwesome5>
            <Text style={{ color: "#31572c", marginRight: 20 }}>Add new </Text>
          </TouchableOpacity>
          {responsables.map((responsible, index) => (
            <Card key={index} style={styles.item}>
              <View style={styles.rowView}>
                <View>
                  <Text style={styles.title}>{responsible.Name}</Text>
                  <Text style={{ color: "#132a13" }}>Speciality: {responsible.speciality}</Text>
                </View>
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={{ marginHorizontal: 16 }}
                    onPress={() => handleEdit(responsible._id)} // Open edit modal
                  >
                    <FontAwesome5 name="edit" size={20} color="#e09132" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(responsible._id)}
                  >
                    <FontAwesome5 name="trash" size={20} color="#e09132" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
      {/* Edit modal */}
      <Modal visible={editModalVisible} onDismiss={() => setEditModalVisible(false)} contentContainerStyle={styles.modalContainer}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: COLORS.hey, marginTop: 5 }}>
            Edit Responsible
          </Text>
        </View>
        <AppTextInput
          style={styles.input}
          value={editedResponsibleName}
          onChangeText={setEditedResponsibleName}
          placeholder="Enter new name"
        />
        <AppTextInput
          style={styles.input}
          value={editedResponsibleEmail}
          onChangeText={setEditedResponsibleEmail}
          placeholder="Enter new email"
        />
        <AppTextInput
          style={styles.input}
          value={editedResponsibleSpecialty}
          onChangeText={setEditedResponsibleSpecialty}
          placeholder="Enter new specialty"
        />
        
        <Button mode="contained" onPress={handleSaveEdit} style={{ backgroundColor: COLORS.hey }}>Save</Button>
      </Modal>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 20,
    elevation: 4,
    borderRadius: 8,
    marginTop: 10,
    paddingTop: 20,
    shadowColor: "#FFEFCD",
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    width: "84%"
  },
  title: {
    fontSize: 18,
    color: "#31572c"
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

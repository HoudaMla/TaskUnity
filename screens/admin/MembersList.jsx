import React, { useState, useEffect } from 'react';
import { Card, Modal, TextInput, Button } from 'react-native-paper';
import { SafeAreaView, Text, TouchableOpacity, View ,StyleSheet, Alert ,ImageBackground , Platform } from "react-native";
import Spacing from '../../constants/Spacing';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../config/COLORS";
import AppTextInput from "../../components/AppTextInput";

export default function MembersList() {
  const [responsables, setResponsables] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editedMemberName, setEditedMemberName] = useState('');
  const [editedMemberEmail, setEditedMemberEmail] = useState('');
  const [editedMemberSpecialty, setEditedMemberSpecialty] = useState('');
  const [editedMemberId, setEditedMemberId] = useState(''); 
  const navigation = useNavigation();

  useEffect(() => {
    fetchMembers();
  }, [refreshPage]);

  const fetchMembers = async () => {
    try {
      const type="member"
      const response = await fetch(`http://192.168.1.3:3000/user/${type}`);
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
    setEditingMember(responsible);
    setEditedMemberId(id);
    setEditedMemberName(responsible.Name);
    setEditedMemberEmail(responsible.email);
    setEditedMemberSpecialty(responsible.speciality);
   
    setEditModalVisible(true);
  };

 
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.3:3000/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Member deleted successfully', [{ text: 'OK', onPress: () => setRefreshPage(!refreshPage) }]);
      } else {
        Alert.alert('Error', 'Failed to delete Member');
      }
    } catch (error) {
      console.error('Error deleting Member:', error);
      Alert.alert('Error', 'Failed to delete Member');
    }
  };
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://192.168.1.3:3000/update/${editedMemberId}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: editedMemberName,
          email: editedMemberEmail, 
          speciality: editedMemberSpecialty, 
        }),
      });
      if (response.ok) {
        console.log(editedMemberName,"logi")
        Alert.alert('Success', 'Member updated successfully', [{ text: 'OK', onPress: () => setRefreshPage(!refreshPage) }]);
        setEditModalVisible(false); 
      } else {
        Alert.alert('Error', 'Failed to update member here');
        console.log(editedMemberName,"log");
        console.log(editedMemberId,"id")
      }
    } catch (error) {
      console.error('Error updating member:', error);
      Alert.alert('Error', 'Failed to update member');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor:COLORS.hey}}>
      <View > 
        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginLeft:10, marginRight:10,marginTop:15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{marginTop:5}} />
            </TouchableOpacity>
          <Text style={{fontSize: 20, fontFamily: 'Roboto-Medium',color: "#FFEFCD",marginTop:5}}>
          Members List
          </Text>
          <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
      
        <View style={{ borderTopStartRadius:49, backgroundColor:"#fff", borderColor:"#132a13",borderWidth:3,width: '110%', height: '100%', marginTop: 30}}>
        <TouchableOpacity
          style={[{padding: Spacing * 2,
            marginLeft: 285,
            borderRadius: Spacing,
            shadowColor:  COLORS.hey,
            flexDirection: 'row',justifyContent: 'space-between',
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.1,
            shadowRadius: Spacing,}]}
            onPress={() => navigation.navigate('AddNew')}        >
          <FontAwesome5 name="plus" color="#31572c" size={10} marginRight="30"></FontAwesome5>
          <Text style={{color:"#31572c",marginRight:20}}>Add new </Text>
        </TouchableOpacity>
        {responsables.map((Member, index) => (
          <Card key={index} style={styles.item}>
            <View style={styles.rowView}>
              <View>
                <Text style={styles.title}>{Member.Name}</Text>
                <Text style={{    color:"#132a13"}}>Speciality: {Member.speciality}</Text>
              </View>
              <View style={styles.rowView}>
                    <TouchableOpacity
                      style={{ marginHorizontal: 16 }}
                      onPress={() => handleEdit(Member._id)}

                    >
                      <FontAwesome5 name="edit" size={17} color="#e09132" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(Member._id)}
                    >
                      <FontAwesome5 name="trash" size={17} color="#e09132" />
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
          value={editedMemberName}
          onChangeText={setEditedMemberName}
          placeholder="Enter new name"
        />
        <AppTextInput
          style={styles.input}
          value={editedMemberEmail}
          onChangeText={setEditedMemberEmail}
          placeholder="Enter new email"
        />
        <AppTextInput
          style={styles.input}
          value={editedMemberSpecialty}
          onChangeText={setEditedMemberSpecialty}
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
    shadowColor:  "#FFEFCD",
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    width:"84%"


  },
  title: {
    fontSize: 18,
    color:"#31572c"
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

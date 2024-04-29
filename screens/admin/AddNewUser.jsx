import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Alert, ImageBackground } from "react-native";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import AppTextInput from "../../components/AppTextInput";

export default function AddNewUser() {
  const navigation = useNavigation();

  const [Name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setspeciality] = useState("");
  const [selectedValue, setSelectedValue] = useState('');

  const items = [
    { label: 'Responsible', value: 'responsible' },
    { label: 'Member', value: 'member' },
  ];

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleAdd = async () => {
    try {
        const response = await fetch("http://192.168.1.11:3000/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: Name,
              email: email,
              password: password,
              speciality:speciality,
              Type: selectedValue,
    
            }),
          });
          const data = await response.json();
          console.log(data);      
          const successMessage = ` ${selectedValue} created successfully`;
          Alert.alert('Success!', successMessage, [{ text: 'OK', onPress: () => navigation.navigate('Responsable')}]);  
          } catch (error) {
      Alert.alert('Error', 'User not created');
      console.error("User not created:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.hey }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{ marginTop: 5 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: FontSize.xLarge, fontFamily: 'Roboto-Medium', color: "#FFEFCD", marginTop: 5 }}>
          Add New User
        </Text>
        <TouchableOpacity onPress={handleDrawerOpen} >
          <ImageBackground
            source={require('../../assets/images/Avatar.png')}
            style={{ width: 35, height: 35 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ borderTopStartRadius: 49, backgroundColor: "#fff", width: '100%', height: '90%', marginTop: 30 }}>
        <View style={{ marginVertical: Spacing * 2, padding: 30 }}>

          <AppTextInput
            placeholder="Name"
            value={Name}
            onChangeText={setname}

            icon={<FontAwesome5 name="plus" size={20} color="#132a13" />}
          />

          <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={setemail}
            icon={<FontAwesome5 name="edit" size={20} color="#132a13" />}
          />

          <AppTextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            icon={<FontAwesome5 name="edit" size={20} color="#132a13" />}
          />

          <AppTextInput
            placeholder="Speciality"
            value={speciality}
            onChangeText={setspeciality}
            icon={<FontAwesome5 name="edit" size={20} color="#132a13" />}
          />

          <RNPickerSelect
            onValueChange={(value) => setSelectedValue(value)}
            items={items}
            value={selectedValue}
            style={pickerSelectStyles}
            placeholder={{ label: 'Responsible', value: null }}

          />

        </View>

        <TouchableOpacity
          onPress={handleAdd}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.hey,
    marginLeft: 35,
    width: 330,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.white,
    textAlign: "center",
    fontSize: FontSize.large,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: Colors.lightPrimary,
    borderRadius: 5,
    padding: Spacing * 2,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    backgroundColor:"#FFEFCD",
    marginVertical: Spacing,
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AppTextInput from "../../components/AppTextInput";
import RNPickerSelect from 'react-native-picker-select';
import { Card, TextInput } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from "../../config/COLORS";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProjectDetails() {
  const [textInputs, setTextInputs] = useState(['']);
  const [selectedValues, setSelectedValues] = useState(['']);
  const [respName,setRespNam]=useState(['']);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [projectId, setprojectId] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("projectId");
        if (storedUserId) {
          setprojectId(storedUserId);
          const responseUser = await fetch(`http://192.168.1.11:3003/project/getP/${storedUserId}`);
          const userData = await responseUser.json();
          setUserInformation(userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();

    fetchResponsables();
  }, []);

  const fetchResponsables = async () => {
    try {
      const type = "member";
      const response = await fetch(`http://192.168.1.11:3003/user/${type}`);
      const data = await response.json();
      const formattedItems = data.map(item => ({
        label: item.Name,
        value: item.Name,
      }));
      setItems(formattedItems);
      setSelectedValues(Array(data.length).fill(''));
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };

  const handlePlusButtonClick = () => {
    setTextInputs([...textInputs, '']);
    setSelectedValues([...selectedValues, '']);
  };

  const handleTextInputChange = (text, index) => {
    const newInputs = [...textInputs];
    newInputs[index] = text;
    setTextInputs(newInputs);
  };

  const handlePickerChange = (value, index) => {
    setSelectedValues(prevState => {
      const newValues = [...prevState]; 
      newValues[index] = value; 
      return newValues; 
    });
    
  };
  
  const handleAddButtonClick = async () => {
    console.log(textInputs, "textInputs");
    console.log(selectedValues, "selectedValues");
    try {
      const response = await fetch(`http://192.168.1.11:3003/project/updateP/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasks: textInputs.map((task, index) => ({
            task: task,
            responsibleName: selectedValues[index],
          })),
        }),
      });
  
      if (response.ok) {
        console.log('Project updated successfully.');
        Alert.alert('Tasks added successfully');
        navigation.navigate("Home");
      } else {
        console.error('Error updating project:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating project with tasks:', error);
      // Handle any network or other errors here
    }
  };
  
  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.hey }}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: "#FFEFCD", marginTop: 5 }}>
          {userInformation?.projname}
          </Text>
          
          <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopStartRadius: 49, backgroundColor: "#fff", width: '110%', height: '100%', marginTop: 5 }}>
            <View style={[styles.estatisticas, styles.thisLayout]}>
                <Text style={[styles.tasks, styles.thisLayout]}>  About </Text>
            </View>
                    <View>
                      <Text style={{marginTop:60,fontSize:15,color:"#fffac", width: '80%',marginLeft:20}}>{userInformation?.projname}{userInformation?.projname}{userInformation?.projname}{userInformation?.projname}{userInformation?.projname}</Text>
                    </View>
                
         
          
        <View style={[styles.estatisticas, styles.thisLayout]}>
            <Text style={[styles.thisWeek, styles.thisLayout]}>Add Tasks </Text>
        </View>
          <View style={{ marginTop: 50, width: '85%', marginLeft: 10 }}>
            {textInputs.map((textInput, index) => (
              <Card key={index} style={styles.item}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <TextInput
                      style={{height:20,marginTop:15,width:270,backgroundColor:"#ffffa",}}
                        value={textInput}
                        onChangeText={(text) => handleTextInputChange(text, index)}
                        placeholder="Enter Task"
                      />
                    </View>
                    <View >
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      onValueChange={(value) => handlePickerChange(value, index)} // Pass index parameter here
                      items={items}
                      value={selectedValues[index]} // Use selected value for the current index
                      placeholder={{ label: 'Responsible', value: null }}
                      Icon={() => {
                        return <FontAwesome5 name="chevron-down" size={24} color="#e09132" style={styles.icon} />;
                      }}
                      placeholderTextColor="#ccc"
                    />
                  </View>
                </View>
              </Card>
            ))}
          <TouchableOpacity 
            onPress={handlePlusButtonClick} 
            style={styles.addButton} 
          >
            <FontAwesome5 name="plus" size={20} color="#fff" style={{ marginTop: 5 }} />
          </TouchableOpacity> 
          <TouchableOpacity 
          onPress={handleAddButtonClick}        
              style={styles.add} 
          >
            <Text>ADD</Text>
          </TouchableOpacity>          
          </View>
          
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    right: 10,
    top: 30,
    transform: [{ translateY: -12 }],
  },
  thisLayout: {
    width: 327,
    position: "absolute",
  },
  tasks: {
    color: COLORS.hey,
    fontWeight: "600",
    lineHeight: 26,
    fontSize: 20,
    width: 327,
    textAlign: "left",
    fontFamily: "Source Sans Pro",
    left: 0,
    top: 0,
  },
  thisWeek: {
    color: COLORS.hey,
    fontWeight: "600",
    lineHeight: 26,
    fontSize: 20,
    width: 327,
    textAlign: "left",
    fontFamily: "Source Sans Pro",
    left: 0,
    top:100,
  },
  estatisticas: {
    top: 30,
    height: 26,
    left: 35,
  },
  addButton: {
    backgroundColor: '#FFEFCD', 
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:160,
  },
  add: {
    backgroundColor: '#fff', 
    borderColor:'#FFEFCD',
    borderWidth:3,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:110,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  selectedValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    paddingTop: 20,
    shadowColor: "#FFEFCD",
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    width: "100%",
    margin: 5,
    backgroundColor: "#fffffa",
    height:100
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 0,
    borderColor: Colors.hey,
    borderRadius: 5,
    padding: Spacing * 2,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    marginVertical: Spacing,
    height:20,
    width:20

  },
});

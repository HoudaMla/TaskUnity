import React, { useState , useEffect} from "react";
import { SafeAreaView, Text, TouchableOpacity, View ,StyleSheet, Alert ,ImageBackground , Platform,TextInput } from "react-native";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../../config/COLORS";
import Textarea from '../../components/Textarea';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import AppTextInput from "../../components/AppTextInput";
import { FontAwesome5 } from '@expo/vector-icons';

export default function AddProject() {
  const navigation = useNavigation();

  const [projname, setprojname] = useState("");
  const [datedebut, setdatedebut] = useState(new Date());
  const [datefin, setdatefin] = useState(new Date());
  const [text, setText] = useState('');

  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); 

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://192.168.1.3/resp/getR");
      const data = await response.json();
      const formattedItems = data.map(item => ({
        label: item.Name,
        value: item.Name, 
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || datedebut;
    setShowStartDatePicker(Platform.OS === 'ios');
    setdatedebut(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || datefin;
    setShowEndDatePicker(Platform.OS === 'ios');
    setdatefin(currentDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://192.168.1.3:3000/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projname: projname,
          respname: selectedValue,
          datedebut: datedebut,
          datefin: datefin,
        }),
      });

      const data = await response.json();
      console.log(data);
      Alert.alert('Success!', 'Project created successfully');
    } catch (error) {
      Alert.alert('Error', 'Project not created');
      console.error("Project not created:", error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor:COLORS.hey}}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between', marginLeft:10, marginRight:10,marginTop:15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{marginTop:5}} />
            </TouchableOpacity>
          <Text style={{fontSize: 20, fontFamily: 'Roboto-Medium',color: "#FFEFCD",marginTop:5}}>
          Add New Project
          </Text>
          <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
      
      <View style={{ borderTopStartRadius:49, backgroundColor:"#fff", width: '100%', height: '90%', marginTop: 30}}>
        <View style={{marginVertical: Spacing * 2, padding:30}}>
          <AppTextInput placeholder="Project Name" value={projname} onChangeText={setprojname} >        
          <FontAwesome5 name="edit" size={20}  style={styles.icon} />
          </AppTextInput>

          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => setSelectedValue(value)} 
            items={items}
            value={selectedValue} 
          />
          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between',borderWidth: 1,
                        placeholderTextColor:"#132a13",
                        borderColor: "#fbfbf2",
                        borderRadius: 5,
                        padding: Spacing * 2,
                        fontFamily: Font['poppins-regular'],
                        fontSize: FontSize.small,
                        backgroundColor: "#fbfbf2",
                        marginVertical: Spacing,
                        }}>
            <TouchableOpacity onPress={showStartDatePickerModal}>
            <Text style={styles.label}>Start Date</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={datedebut}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
            <TouchableOpacity onPress={showEndDatePickerModal}>
              <Text style={styles.label}>End Date</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={datefin}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>
          
          <Textarea
            value={text}
            onChangeText={setText}
            placeholder="Project description..."
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
  label: {
    color: "#e09132",
    marginBottom: Spacing,
  },
  addButton: {
    padding: Spacing * 2,
    backgroundColor: COLORS.hey,
    marginLeft: 35,
    width: 330,
    borderRadius: Spacing,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-bold"],
    color: COLORS.white,
    textAlign: "center",
    fontSize: FontSize.large,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    placeholderTextColor:"#132a13",
    borderColor: "#fbfbf2",
    borderRadius: 5,
    padding: Spacing * 2,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    backgroundColor: "#fbfbf2",
    marginVertical: Spacing,
  },
});


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../../config/COLORS';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";

const Details = () => {
  const route = useRoute(); 
  const projectId = route.params?.projectId;
  const [projectDetails, setProjectDetails] = useState(null);
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const [tasks, setTasks] = useState([]); 

  const items = [
    { label: 'Done', value: 'Done' },
    { label: 'Pending', value: 'Pending' },
  ];

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.11:3003/project/getP/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProjectDetails(data);
          setTasks(data.Tasks); 
        } else {
          console.error('Failed to fetch project details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={{backgroundColor: "#fff"}}>
      <View style={{ flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#31572c" style={{ marginTop: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Medium', color: COLORS.hey, marginTop: 5 ,marginLeft:10}}>
          {projectDetails?.projname} 
        </Text>
        <TouchableOpacity onPress={handleDrawerOpen} >
          <ImageBackground
            source={require('../../assets/images/Avatar.png')}
            style={{ width: 35, height: 35,marginTop: 5 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>
        
      </View>
      <View>
        
      {projectDetails && (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:30,marginRight:60,marginTop:20}}>
            <View>
              <Text style={{fontSize:25, color:COLORS.hey}}>{projectDetails?.datedebut}</Text>
            </View>
            <View style={{marginTop:5}}>
              <FontAwesome5 name="chevron-right" size={20}  color="#e09132" />
            </View>
            <View>
              <Text style={{fontSize:25, color:COLORS.hey}}>{projectDetails?.datefin}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }}>
        
        <View style={styles.verticalLine}></View>
        {projectDetails?.Tasks.map((task, index) => (

        <Card style={styles.item}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text>{task.task}</Text>
              <Text>{task.responsibleName}</Text>
            </View>
            <View>
              <RNPickerSelect
                style={pickerSelectStyles}
                items={items}
                onValueChange={(value) => setSelectedValue(value)}
                value={selectedValue}
                placeholder={{ label: 'Responsible', value: null }}
                Icon={() => {
                  return <FontAwesome5 name="ellipsis-h" size={24} color={COLORS.hey} />;
                }}
                placeholderTextColor="#ccc"
              />
            </View>
          </View>
        </Card>
       ))}

      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  verticalLine: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.hey,
    height: 650,
    marginRight: 40,
  },
  item: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    paddingTop: 20,
    shadowColor: "#FFEFCD",
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    backgroundColor: "#fffffa",
    height: 100,
    width: "65%",
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
    height: 20,
    width: 20
  },
});

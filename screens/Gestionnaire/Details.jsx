import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../../config/COLORS';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import SPACING from "../../config/SPACING";

const Details = () => {
  const route = useRoute();
  const projectId = route.params?.projectId;
  const [projectDetails, setProjectDetails] = useState(null);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const WIDTH = Dimensions.get("screen").width;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://20.20.17.96:3003/project/getP/${projectId}`);
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

  const handleStatusChange = (value, taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: value };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };
  

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#31572c" style={{ marginTop: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Medium', color: COLORS.hey, marginTop: 5, marginLeft: 10 }}>
          {projectDetails?.projname.charAt(0).toUpperCase() + projectDetails?.projname.substring(1)}
        </Text>
        <TouchableOpacity onPress={handleDrawerOpen} >
          <ImageBackground
            source={require('../../assets/images/Avatar.png')}
            style={{ width: 35, height: 35, marginTop: 5 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>

      </View>
      <View>

        {projectDetails && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 60, marginTop: 40 }}>
            <View>
              <Text style={{ fontSize: 20, color: "#e09132" }}>{projectDetails?.datedebut.substring(0, 10)}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <FontAwesome5 name="chevron-right" size={20} color="#e09132" />
            </View>
            <View>
              <Text style={{ fontSize: 20, color: "#e09132" }}>{projectDetails?.datefin.substring(0, 10)}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
  {projectDetails?.Tasks.map((task, index) => (
    <TouchableOpacity
      style={{
        width: 360,
        height: WIDTH * 0.25,
        overflow: "hidden",
        borderRadius: SPACING * 2,
        padding: SPACING,
        margin: SPACING,
        backgroundColor: task.status === 'Done' ? "#d9f7e8" : "#ffff", // Change color based on status
        marginLeft: 15,
        marginRight: 10,
      }}
      key={index}
    >
      <View
        style={{
          position: "absolute",
          flexDirection: 'row',
          zIndex: 1,
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          padding: SPACING,
        }}
      >
        <TouchableOpacity  >
          <ImageBackground
            source={require('../../assets/images/tasks.png')}
            style={{ width: 50, height: 50, marginTop: 20, }}
          />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            marginTop: 5,
            zIndex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "space-between",
            padding: SPACING,
          }}
        >
          <Text
            style={{
              marginTop: 14,
              fontSize: SPACING * 2,
              color: task.status === 'Done' ? "green" : COLORS.hey, 
              fontWeight: "550",
              marginLeft: 80,
            }}
          >
            {task.task}
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: SPACING * 1.5,
              color: "#C6C6D6",
              fontWeight: "450",
              marginLeft: 80,
            }}
          >
            {task.responsibleName}
          </Text>
        </View>
        <RNPickerSelect
          style={pickerSelectStyles}
          items={[
            { label: 'Done', value: 'Done' },
            { label: 'Pending', value: 'Pending' },
          ]}
          onValueChange={(value) => handleStatusChange(value, task.id)}
          value={task.status}
          placeholder={{ label: 'Status', value: null }}
          Icon={() => {
            return <FontAwesome5 name="ellipsis-h" size={24} color={"#e09132"} />;
          }}
          placeholderTextColor="#ccc"
        />
      </View>
    </TouchableOpacity>
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

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../../config/COLORS';
import { useRoute } from '@react-navigation/native';
import { Card, TextInput } from 'react-native-paper';

const Details = () => {
  const route = useRoute(); 
  const projectId = route.params?.projectId;
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.11:3003/project/getP/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProjectDetails(data);
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
    <SafeAreaView style={{ backgroundColor: COLORS.hey }}>
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{ marginTop: 5 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: "#FFEFCD", marginTop: 5 }}>
            {projectDetails?.projname} 
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
          {projectDetails && (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:40,marginRight:60,marginTop:20}}>
              <View>
              <Text style={{fontSize:25}}>{projectDetails?.datedebut}</Text>
              </View>
              <View style={{marginTop:5}}>
              <FontAwesome5 name="chevron-right" size={20}  color="#e09132" />

              </View>
              <View>
              <Text style={{fontSize:25}}>{projectDetails?.datefin}</Text>
              </View>
            </View>
          )}
        </View>
        
        <View style={[styles.estatisticas, styles.thisLayout]}>
            <Text style={[styles.thisWeek, styles.thisLayout]}>Add Tasks </Text>
        </View>
        <View style={{ marginTop: 50, width: '85%', marginLeft: 10 }}>
              <Card  style={styles.item}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                      <TextInput
                      style={{height:20,marginTop:15,width:270,backgroundColor:"#ffffa",}}
                        // value={textInput}
                        onChangeText={(text) => handleTextInputChange(text, index)}
                        placeholder="Enter Task"
                      />
                    </View>
                    <View >
                    
                  </View>
                </View>
              </Card>

          <TouchableOpacity 
            style={styles.addButton} 
          >
            <FontAwesome5 name="plus" size={20} color="#fff" style={{ marginTop: 5 }} />
          </TouchableOpacity>   
          <Button title="Add"/>
          </View>
      </View>
    </SafeAreaView>
  );
};



export default Details;
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
  },});
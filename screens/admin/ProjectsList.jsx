import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { SafeAreaView, Text, TouchableOpacity, View ,StyleSheet, Alert ,ImageBackground , Platform } from "react-native";
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../config/COLORS";

export default function MembersList() {
  const [responsables, setResponsables] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchResponsables();
  }, [refreshPage]);

  const fetchResponsables = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/project/getP');
      const data = await response.json();
      setResponsables(data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };
  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.3:3000/project/deleteP/${id}`, {
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

  return (
    <SafeAreaView style={{backgroundColor:COLORS.hey}}>
      <View > 
        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginLeft:10, marginRight:10,marginTop:15}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{marginTop:5}} />
            </TouchableOpacity>
          <Text style={{fontSize: 20, fontFamily: 'Roboto-Medium',color: "#FFEFCD",marginTop:5}}>
          Projects List
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
        >
          <FontAwesome5 name="plus" color="#31572c" size={10} marginRight="30"></FontAwesome5>
          <Text style={{color:"#31572c",marginRight:20}}>Add new </Text>
        </TouchableOpacity>
        {responsables.map((responsible, index) => (
          <Card key={index} style={styles.item}>
            <View style={styles.rowView}>
              <View>
                <Text style={styles.title}>{responsible.projname}</Text>
               <Text style={{    color:"#132a13"}}> {responsible.respname}</Text>
              </View>
              <View style={styles.rowView}>
                    <TouchableOpacity
                      style={{ marginHorizontal: 16 }}
                    >
                      <FontAwesome5 name="edit" size={17} color="#e09132" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(responsible._id)}
                    >
                      <FontAwesome5 name="trash" size={17} color="#e09132" />
                    </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
        </View>
      </View>
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
});

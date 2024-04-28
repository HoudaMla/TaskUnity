import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../config/COLORS";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notification() {
  const [Notification, setNotification] = useState([]);
  const [userInformation, setUserInformation] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const navigation = useNavigation();
  const handlePress = () => {
    setIsClicked(!isClicked); 
    navigation.navigate("Project");

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          const responseUser = await fetch(`http://192.168.1.3:3000/getUser/${storedUserId}`);
          const userData = await responseUser.json();
          setUserInformation(userData);
          const respname = userData?.Name;
          const response = await fetch(`http://192.168.1.3:3000/project/${respname}`);
          const data = await response.json();
          setNotification(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifications</Text>
          <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={styles.avatar}
              imageStyle={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          {Notification.map((notif, index) => (
            <TouchableOpacity onPress={handlePress}>
                <Card key={index} style={[styles.card, isClicked ? styles.clickedCard : null]}>
              <View style={styles.rowView}>
                <View>
                  <Text style={styles.title}>{notif.projname}</Text>
                  <View style={{flexDirection: "row",justifyContent: 'space-between',}}>
                    <Text style={styles.speciality}> {notif.datedebut}</Text>
                    <Text>   ---   </Text>
                    <Text style={styles.speciality}> {notif.datefin}</Text>
                  </View>
                </View>
              </View>
            </Card>
            </TouchableOpacity>
            
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    clickedCard: {
      backgroundColor:"#fffffa"
    },
    container: {
    flex: 1,
    backgroundColor: COLORS.hey,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 15,
  },
  icon: {
    marginTop: 5,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: "#FFEFCD",
    marginTop: 5,
  },
  avatar: {
    width: 35,
    height: 35,
  },
  avatarImage: {
    borderRadius: 25,
  },
  cardContainer: {
    borderTopStartRadius: 49,
    backgroundColor: "#fff",
    borderColor: "#132a13",
    borderWidth: 3,
    width: '110%',
    height: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  card: {
    padding: 16,
    marginVertical: 10,
    elevation: 4,
    borderRadius: 8,
    width: "84%",
    marginTop:40,
    width:350,
    marginRight:35,
    backgroundColor:"#faf3dd"

  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: "#31572c",
  },
  speciality: {
    color: "#132a13",
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TextInput, Dimensions, TouchableOpacity, ScrollView, Modal, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from 'react-native-vector-icons';
import COLORS from "../../config/COLORS";
import SPACING from "../../config/SPACING";
import Carousel from 'react-native-snap-carousel';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // To store details of the selected project
  const [modalVisible, setModalVisible] = useState(false); // To control the visibility of the modal
 
  const WIDTH = Dimensions.get("screen").width;



  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
          const responseUser = await fetch(`http://192.168.1.11:3003/getUser/${storedUserId}`);
          const userData = await responseUser.json();
          setUserInformation(userData);
        }
        const responseProjects = await fetch('http://192.168.1.11:3003/project/getP');
        const projectData = await responseProjects.json();
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(`http://192.168.1.11:3003/project/getP/${projectId}`);
      const projectDetails = await response.json();
      setSelectedProject(projectDetails);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };


    const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      style={{width: '90%',height: 120,borderRadius: 10,overflow: 'hidden',marginVertical: SPACING,marginTop:120}}
      onPress={() => fetchProjectDetails(item._id)}
    >
      <View style={{position: "absolute",zIndex: 1, height: "100%",width: "100%", borderColor:COLORS.hey, borderWidth:1, borderRadius:1, backgroundColor: COLORS.hey,justifyContent: "center",  padding: SPACING,}}
      >
        <Text style={{fontSize: 18,color: COLORS.white,fontWeight: 'bold',}}>
          {item.projname.charAt(0).toUpperCase()+ item.projname.substring(1)}
        </Text>
        <Text style={{fontSize: 14,color: COLORS.white,}}>
          {item.datedebut}
        </Text>
        <Text style={{fontSize: 14,color: COLORS.white,}}>
          {item.datefin}
        </Text>
      </View>
    </TouchableOpacity>
  );
 
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginLeft:5,
            marginRight:5
          }}>
          <Text style={{fontSize: 30,
           fontFamily: 'Roboto-Medium',
           color: "#31572c",
}}>
            Hello,{userInformation?.name}
          </Text>
        <TouchableOpacity onPress={handleDrawerOpen} >
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
      </View>

      <View style={[styles.rectangleParent, styles.text8Layout]}>
        <View style={[styles.groupChild, styles.text8Layout]} />
        <Text style={[styles.search, styles.searchTypo]}>Search</Text>
        <ImageBackground
          style={[styles.searchIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../../assets/images/search.png")}
        />
      </View>
      <View style={[styles.rectangleView, styles.rectanglePosition]} />
      <ImageBackground
        style={[styles.filterIcon1, styles.iconLayout1]}
        contentFit="cover"
        source={require("../../assets/images/filter.png")}
      />

        <View style={[styles.estatisticas, styles.thisLayout]}>
            <Text style={[styles.thisWeek, styles.thisLayout]}>This Week</Text>
        </View>

      <Carousel
        data={projects}
        renderItem={renderProjectItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH * 0.5}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        contentContainerCustomStyle={{ paddingLeft: SPACING * 2 }}
        containerCustomStyle={{ overflow: 'visible' }}
      />


          <Text style={[styles.thisMonth, styles.thisLayout]}>This Month</Text>
          <Text style={[styles.seeAll, styles.searchTypo]}>see all</Text>
            <View style={{marginTop:30}}>
              {projects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={{
                    width: WIDTH * 0.97,
                    height: WIDTH * 0.25,
                    overflow: "hidden",
                    borderRadius: SPACING * 2,
                    padding: SPACING,
                    margin:SPACING,
                    backgroundColor:"#ffff",
                    marginLeft:5,
                    marginRight:5,
                
              
                  }}
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
                      <TouchableOpacity onPress={handleDrawerOpen} >
                          <ImageBackground
                    source={require('../../assets/images/try.png')}
                    style={{width: 60, height: 60 , marginTop:10,marginLeft:10}}
                          />
                        </TouchableOpacity>
                        <View
                        style={{
                        position: "absolute",
                        marginTop:5,
                        zIndex: 1,
                        height: "100%",
                        width: "100%",
                        justifyContent: "space-between",
                        padding: SPACING,
                        }}
                        >
                          <Text
                              style={{
                                marginTop:14,

                                  fontSize: SPACING * 2,
                                  color: COLORS.hey,
                                  fontWeight: "550",
                                  marginLeft: 80,
                                
                              }}
                              >
                        {project.projname.charAt(0).toUpperCase()+ project.projname.substring(1)}
                        </Text>
                            <Text
                            style={{
                              marginTop:8,
                                fontSize: SPACING * 1.5,
                                color:"#C6C6D6",
                                fontWeight: "450",
                                marginLeft: 80,
                            }}
                            >
                            {project.datefin}
                            </Text>
                    </View>
                        <TouchableOpacity onPress={handleDrawerOpen} >
                          <ImageBackground
                            source={require('../../assets/images/more.png')}
                            style={{width: 20, height: 25 , marginTop:25,marginRight:0}}
                          />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
              ))}
            </View>
              

      </ScrollView>
       
      <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{selectedProject?.projname}</Text>
        <Text style={styles.modalText}>{selectedProject?.projname}</Text>

        {/* Render other project details here */}
        <Button
          title="Close"
          onPress={() => setModalVisible(false)}
        />
      </View>
    </View>
  </Modal>
      
        </SafeAreaView>
      );
    }
    const styles = StyleSheet.create({
      
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        color:COLORS.hey
      },
      houdaTypo: {
        textAlign: "left",
        fontFamily: "Source Sans Pro",
        left: 82,
        position: "absolute",
      },
      childShadowBox: {
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 14,
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowColor: "rgba(19, 44, 74, 0.02)",
      },
      iconLayout1: {
        height: 20,
        width: 20,
        position: "absolute",
        overflow: "hidden",
      },
      fotoPerfilPosition: {
        top: 46,
        left: 20,
        height: 48,
        width: 48,
        borderRadius: 14,
        position: "absolute",
      },
      bgColorPosition: {
        right: 0,
        top: 0,
      },
      iconLayout: {
        width: 24,
        position: "absolute",
      },
      timeLayout1: {
        height: 21,
        width: 54,
      },
      timeLayout: {
        borderRadius: 8,
        position: "absolute",
      },
      thisLayout: {
        width: 327,
        position: "absolute",
      },
      text8Layout: {
        width: 267,
        position: "absolute",
      },
      searchTypo: {
        fontSize: 16,
        textAlign: "left",
        fontFamily: "Source Sans Pro",
        position: "absolute",
      },
      rectanglePosition: {
        top: 60,
        height: 48,
      },
      frameViewBg: {
        backgroundColor: "#f9fbff",
        height:"100%"
      },
      groupLayout: {
        height: 136,
        width: 1167,
        position: "absolute",
      },
      maskGroupLayout: {
        height: 101,
        width: 102,
        position: "absolute",
      },
      text1Typo: {
        color: "#fff" ,
        fontSize: 10,
        fontWeight: "600",
        textAlign: "left",
        fontFamily: "Source Sans Pro",
        position: "absolute",
      },
      cardLayout: {
        height: 78,
        width: 335,
        left: 0,
        position: "absolute",
      },
      mobilePosition: {
        letterSpacing: 1,
        top: "50%",
        left: "0%",
        textAlign: "left",
        fontFamily: "Source Sans Pro",
        position: "absolute",
      },
      leftSidePosition: {
        top: 12,
        position: "absolute",
      },
      houda: {
        fontSize: 24,
        fontWeight: "700",
        color: "#2c2c2c",
        top: 44,
      },
      administrateur: {
        top: 75,
        color: "#8c8c8c",
        fontSize: 12,
      },
      homeChild: {
        top: 42,
        width: 48,
        left: 307,
        position: "absolute",
      },
      bellIcon: {
        top: 56,
        left: 321,
        height: 20,
        width: 20,
      },
      homeItem: {
        top: 53,
        left: 331,
        width: 10,
        height: 10,
        position: "absolute",
      },
      homeInner: {
        top: 55,
        left: 333,
        width: 6,
        height: 6,
        position: "absolute",
      },
      filterIcon: {
        top: 132,
        left: 321,
        height: 20,
        width: 20,
      },
      roundedRectangle: {
        backgroundColor: "#8863e4",
        left: 20,
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowColor: "rgba(19, 44, 74, 0.02)",
      },
      bgColor: {
        bottom: 0,
        backgroundColor: "#387a70",
        left: 0,
        position: "absolute",
        overflow: "hidden",
      },
      image41Icon: {
        height: "98.54%",
        top: "1.67%",
        right: "0%",
        bottom: "-0.21%",
        maxWidth: "100%",
        maxHeight: "100%",
        left: "0%",
        position: "absolute",
        overflow: "hidden",
        width: "100%",
      },
      fotoPerfil: {
        left: 20,
        overflow: "hidden",
      },
      batteryIcon: {
        height: 11,
        right: 0,
        top: 0,
      },
      wifiIcon: {
        right: 29,
        width: 15,
        height: 11,
        top: 0,
        position: "absolute",
      },
      mobileSignalIcon: {
        right: 50,
        width: 17,
        height: 11,
        top: 0,
        position: "absolute",
      },
      rightSide: {
        top: 17,
        right: 19,
        width: 67,
        height: 11,
        position: "absolute",
      },
      text: {
        top: 1,
        fontSize:15,
        letterSpacing: 0,
        lineHeight: 20,
        fontFamily: "Inter-SemiBold",
        color:  "#000",
        textAlign: "center",
        fontWeight: "600",
        width: 54,
        left: 0,
        height: 20,
        position: "absolute",
      },
      time: {
        height: 21,
        width: 54,
        left: 0,
        top: 0,
      },
      leftSide: {
        left: 24,
        top: 12,
        position: "absolute",
      },
      statusBar: {
        right: 4,
        left: -4,
        height: 34,
        top: 0,
        position: "absolute",
        overflow: "hidden",
      },
      thisMonth: {
        top: 300,
        color: COLORS.hey,
        fontWeight: "600",
        lineHeight: 26,
        fontSize: 20,
        width: 327,
        textAlign: "left",
        fontFamily: "Source Sans Pro",
        left: 20,
      },
      groupChild: {
        left: 0,
        top: 0,
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 14,
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowColor: "rgba(19, 44, 74, 0.02)",
      },
      search: {
        left: 50,
        color: "#aeaeae",
        top: 16,
      },
      searchIcon: {
        left: 18,
        top: 16,
      },
      rectangleParent: {
        left: 12,
        top: 60,
        height: 48,
      },
      rectangleView: {
        backgroundColor: "#387a70",
        width: 48,
        borderRadius: 14,
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowColor: "rgba(19, 44, 74, 0.02)",
        left: 335,
        position: "absolute",
      },
      filterIcon1: {
        top: 75,
        left: 349,
        height: 20,
        width: 20,
      },
      fi2223615Icon: {
        width: 16,
        height: 16,
        transform: [
          {
            rotate: "-180deg",
          },
        ],
        overflow: "hidden",
      },
      icon: {
        top: 389,
        left: 355,
        borderStyle: "solid",
        borderColor: "#387a70",
        borderWidth: 1,
        width: 32,
        height: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        transform: [
          {
            rotate: "-180deg",
          },
        ],
        backgroundColor: "#387a70",
      },
      seeAll: {
        top: 300,
        left: 325,
        height: 19,
        width: 60,
        color: COLORS.hey,
        fontWeight: "600",
        lineHeight: 26,
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
        top: 0,
      },
      estatisticas: {
        top: 130,
        height: 26,
        left: 20,
      },
      groupItem: {
        backgroundColor: "#387a70",
        left: 0,
        top: 0,
        borderRadius: 14,
      },
      mobileDevelopement: {
        left: 4,
        width: 96,
        lineHeight: 26,
        top: 44,
      },
      text1: {
        top: 66,
        left: 28,
        lineHeight: 13,
        height: 30,
        width: 60,
      },
      graph01Icon: {
        top: 19,
        left: 39,
        height: 24,
        overflow: "hidden",
      },
      rectangleGroup: {
        left: 0,
        top: 0,
      },
      maskGroup: {
        top: 35,
        width: 102,
        left: 0,
      },
      maskGroup1: {
        left: 122,
        top: 35,
        width: 102,
      },
      maskGroup2: {
        left: 244,
        top: 35,
        width: 102,
      },
      maskGroup3: {
        left: 368,
        top: 35,
        width: 102,
      },
      maskGroup4: {
        left: 848,
        top: 0,
      },
      maskGroup5: {
        left: 1065,
        top: 0,
      },
      maskGroupParent: {
        left: 0,
        top: 0,
      },
      groupWrapper: {
        top: -16,
        left: 12,
      },
      frameView: {
        top: 204,
        left: 6,
        width: 393,
        height: 137,
        position: "absolute",
      },
      menuItensIcon: {
        top: 770,
        width: 375,
        height: 63,
        left: 0,
        position: "absolute",
      },
      rectangleShadowBox: {
        borderRadius: 8,
        elevation: 48,
        shadowRadius: 48,
        shadowColor: "rgba(0, 0, 0, 0.04)",
        height: 78,
        width: 335,
        left: 0,
        top: 0,
        backgroundColor: "#fff",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        position: "absolute",
      },
      mobile: {
        marginTop: -19,
        width: "64.42%",
        fontSize: 14,
        color: "#03314b",
        fontWeight: "600",
      },
      may2022: {
        marginTop: 5,
        width: "25.47%",
        color: "#8ca1a9",
        fontSize: 12,
      },
      menuVerticalIcon: {
        top: -5,
        left: 220,
        width: 29,
        height: 50,
        position: "absolute",
      },
      text8: {
        top: 20,
        left: 68,
        height: 38,
        overflow: "hidden",
      },
      folderIcon: {
        height: 53,
        left: 12,
        width: 48,
      },
      card: {
        top: 0,
      },
      card1: {
        top: 95,
      },
      card2: {
        top: 188,
      },
      card3: {
        top: 282,
      },
      card4: {
        top: 381,
      },
      card5: {
        top: 490,
      },
      card6: {
        top: 590,
      },
      cardParent: {
        top: 23,
        left: 29,
        height: 668,
        width: 335,
        position: "absolute",
      },
      homeInner1: {
        top: 395,
        left: -1,
        width: 376,
        height: 361,
        position: "absolute",
      },
      home: {
        borderRadius: 35,
        flex: 1,
        height: 833,
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#f9fbff",
      },
    
    });
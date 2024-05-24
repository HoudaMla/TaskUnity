import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, TextInput, Dimensions, TouchableOpacity, ScrollView, Modal, Button } from "react-native";
import COLORS from "../../config/COLORS";
import SPACING from "../../config/SPACING";
import OneLineCalendar from "./OneLineCalendar";

export default function HomeScr() {
  const WIDTH = Dimensions.get("screen").width;
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://192.168.1.7:3003/tasks?responsibleName=mlaouah`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginLeft: 5, marginRight: 5 }}>
          <Text
            style={{
              color: COLORS.hey,
              fontWeight: "500",
              lineHeight: 26,
              fontSize: 20,
              width: 327,
              textAlign: "left",
              fontFamily: "Source Sans Pro",
              left: 10,
              top: 10,
            }}
          >
            Hello,
          </Text>
          <TouchableOpacity>
            <ImageBackground
              source={require('../../assets/images/Avatar.png')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderColor: COLORS.hey, borderWidth: 2, borderRadius: 9, width: "94%", height: 120, marginTop: 80, marginLeft: 15 }}>
          <View>
            <Text style={{ fontSize: 18, color: COLORS.hey, marginLeft: 7, marginTop: 10, padding: 15 }}>You've got "{tasks.length}"</Text>
            <Text style={{ fontSize: 15, color: "#a58e74", marginLeft: 20 }}>
              Tasks for Today !!
            </Text>
          </View>
          <View>
            <ImageBackground
              source={require('../../assets/images/td.png')}
              style={{ width: 250, height: 119, marginRight: 150, padding: 10 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, marginLeft: 1 }}>
          <OneLineCalendar currentDay={new Date().getDate()} />
        </View>
        <View style={[styles.estatisticas, styles.thisLayout]}>
          <Text style={[styles.thisWeek, styles.thisLayout]}>My Tasks</Text>
        </View>
  
        <View style={{ marginTop: 50 }}>
          {tasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: WIDTH * 0.97,
                height: WIDTH * 0.25,
                overflow: "hidden",
                borderRadius: SPACING * 2,
                padding: SPACING,
                margin: SPACING,
                backgroundColor: "#fff",
                marginLeft: 5,
                marginRight: 5,
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
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../../assets/images/tasks.png')}
                    style={{ width: 70, height: 70, marginTop: 2 }}
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
                      marginTop: 15,
                      fontSize: SPACING * 2,
                      color: COLORS.hey,
                      fontWeight: "550",
                      marginLeft: 80,
                    }}
                  >
                    {task.task}
                  </Text>
                  {/* <Text
                    style={{
                      marginTop: 8,
                      fontSize: SPACING * 1.5,
                      color: "#C6C6D6",
                      fontWeight: "450",
                      marginLeft: 80,
                    }}
                  >
                    {task.task}
                  </Text> */}
                </View>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../../assets/images/more.png')}
                    style={{ width: 20, height: 25, marginTop: 25, marginRight: 0 }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:5,
  },
  serviceItem: {
    flex: 0.48,
    flexDirection: "column",
    alignItems: "center",
    borderColor:'#ffff',
    backgroundColor: '#ffff',
    borderWidth:3,
    borderRadius:10,
    margin:10,
    width:170,
    height:150
  },
  serviceText: {
    fontSize: 14,
    fontWeight:"bold",
    width: 100,
    color:COLORS.hey
  },
  serviceDate: {
    fontSize: 12,
    marginTop:30

  },
  thisLayout: {
    width: 327,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:120,
    backgroundColor:"#fff",
    width:150,
    height:150

  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop:220
  },
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
  }
  ,
  text8Layout: {
    width: 317,
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
  groupChild: {
    left: 0,
    top: 0,
    height: 48,
    width:250,
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
  },
  rectangleView: {
    backgroundColor: COLORS.hey,
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
    fontWeight: "500",
    lineHeight: 26,
    fontSize: 20,
    width: 327,
    textAlign: "left",
    fontFamily: "Source Sans Pro",
    left: 0,
    top: 190,
  },
  estatisticas: {
    top: 130,
    height: 26,
    left: 20,
  },
 
  rectangleGroup: {
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

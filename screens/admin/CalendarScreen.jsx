import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Button , StyleSheet,ScrollView, ImageBackground } from "react-native";
import { Calendar } from 'react-native-calendars';
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from "../../config/COLORS";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import RNPickerSelect from 'react-native-picker-select';
import { Card, Modal, TextInput} from 'react-native-paper';

import Font from "../../constants/Font";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState([]);
  const [inputDate, setInputDate] = useState('');
  const [agendaData, setAgendaData] = useState({ selectedDate: '', events: {} });

  const addEvent = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/meet/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Date: agendaData.selectedDate, meetName: inputDate, Responsible:selectedValue }),
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error adding event:', data.error);
        return;
      }
      console.log('New Event:', data);
      setAgendaData(prevState => ({
        ...prevState,
        events: {
          ...prevState.events,
          [data._id]: {
            Date: agendaData.selectedDate,
            meetName: data.meetName,
            Responsible:selectedValue

          },
        },
      }));
      setInputDate('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  useEffect(() => {
    fetchEventsFromBackend();
    fetchResponsables();
  }, []);

  const handleDrawerOpen = () => {
    navigation.openDrawer();
  };

  const fetchEventsFromBackend = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/meet/getmeet');
      const data = await response.json();
      console.log('Response from backend:', data);
      const eventsObject = data.reduce((acc, event) => {
        acc[event._id] = { Date: event.Date, meetName: event.meetName };
        return acc;
      }, {});
      setAgendaData(prevState => ({ ...prevState, events: eventsObject }));
    } catch (error) {
      console.error('Error fetching events from backend:', error);
    }
  };

  
  const fetchResponsables = async () => {
    try {
      const type = "responsible";
      const response = await fetch(`http://192.168.1.3:3000/user/${type}`);
      const data = await response.json();
      const formattedItems = data.map(item => ({
        label: item.Name,
        value: item.Name, 
      }));
      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };


  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://192.168.1.3:3000/meet/delete/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.error('Error deleting event');
        return;
      }
      const updatedEvents = { ...agendaData.events };
      delete updatedEvents[eventId];
      setAgendaData(prevState => ({
        ...prevState,
        events: updatedEvents,
      }));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.hey }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFEFCD" style={{ marginTop: 5 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: "#FFEFCD", marginTop: 5 }}>
          New meeting
        </Text>
        <TouchableOpacity onPress={handleDrawerOpen} >
          <ImageBackground
            source={require('../../assets/images/Avatar.png')}
            style={{ width: 35, height: 35 }}
            imageStyle={{ borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ borderTopStartRadius: 49, backgroundColor: "#fff", borderColor: "#132a13", borderWidth: 3, width: '100%', height: '90%', marginTop: 30 }}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => setAgendaData(prevState => ({ ...prevState, selectedDate: day.dateString }))}
            markedDates={{
              [agendaData.selectedDate]: { selected: true, selectedColor: '#FFB224' }
            }}
            theme={{
              calendarBackground: '#fff',
              textSectionTitleColor: '#e09132',
              dayTextColor: '#132a13',
              todayTextColor: '#132a13',
              arrowColor: '#e09132',
              selectedDayBackgroundColor: '#132a13',
              selectedDayTextColor: '#e09132',
              textDisabledColor: '#ccc',
              dotColor: '#e09132',
              selectedDotColor: '#fff',
              monthTextColor: '#e09132',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              textDayFontWeight: '500',
              textDayHeaderFontWeight: 'bold',
            }}
          />
        </View>
        <Card style={styles.item}>
          <View style={styles.rowView}>  
                  <View style={styles.rowView}>
                    <View>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Meet"
                          value={inputDate}
                          onChangeText={setInputDate}
                          placeholderTextColor="#31572c" 

                        />
                    </View>
                  </View>
                  <View style={styles.rowView}>
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      onValueChange={(value) => setSelectedValue(value)}
                      items={items}
                      value={selectedValue}
                      placeholder={{ label: 'Responsible', value: null}}
                      placeholderTextColor="#ccc"

                    />
                  </View>
                  <View style={styles.rowView}>
                  <FontAwesome5 name="chevron-right" size={20} onPress={addEvent} color="#e09132" />

                  </View>
          </View>
        </Card>
        <ScrollView>
          {Object.entries(agendaData.events).map(([eventId, eventData]) => (
                <Card key={eventId} style={styles.item}>
                  <View style={styles.rowView}>
                    <View>
                      <Text style={styles.title}>Date:{eventData.Date}</Text>
                      <Text style={{ color: "#132a13" }}>Meeting: {eventData.meetName}</Text>
                    </View>
                    <View style={styles.rowView}>
                      
                      <TouchableOpacity
                        onPress={() => deleteEvent(eventId)}
                      >
                        <FontAwesome5 name="trash" size={20} color="#e09132" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 10,
    padding: 20,

  },
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  

  eventItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    paddingTop: 20,
    shadowColor: "#FFEFCD",
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
    width: "90%",
    marginLeft:20,
    margin:5,
    backgroundColor:"#fffffa"
  },
  itemAdd:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: "#31572c"
  },
  input:{
    borderWidth: 1,
  borderColor: Colors.lightPrimary,
  borderRadius: 5,
  fontFamily: Font['poppins-regular'],
  fontSize: FontSize.small,
  marginVertical: Spacing,
  backgroundColor:"#fffffa",
  fontSize: 15,
    color: "#31572c"

}
  
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: Colors.lightPrimary,
    borderRadius: 5,
    padding: Spacing * 2,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    marginVertical: Spacing,
  },
  
  placeholder: {
    fontSize: 15,
    color: "#31572c"  }
});

export default CalendarScreen;

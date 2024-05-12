import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OneLineCalendar = () => {
  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Function to get the date for each day of the week
  const getDayDate = (dayIndex) => {
    const date = new Date(currentYear, currentMonth, currentDate.getDate() - currentDay + dayIndex);
    return date.getDate();
  };

  // Array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Map through the day names */}
      {dayNames.map((dayName, index) => (
        <View key={index} style={[styles.dayContainer, index === currentDay ? styles.currentDay : null]}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={styles.dateText}>{getDayDate(index)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
  },
  currentDay: {
    backgroundColor: 'yellow', // Change to the color you want for the current day
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default OneLineCalendar;

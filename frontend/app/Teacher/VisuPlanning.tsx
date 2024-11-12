import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  idClasse: number;
}

const CalendarScreen = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-05'); // Date par défaut

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5094/Planning/Classe/61');
      console.log(response.data)
      const tasksData: Task[] = response.data;

      const formattedTasks: { [key: string]: Task[] } = {};

      tasksData.forEach(task => {
        const date = task.date;
        if (!formattedTasks[date]) {
          formattedTasks[date] = [];
        }
        formattedTasks[date].push(task);
      });

      setTasks(formattedTasks);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching tasks');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTasks = (day: string) => {
    const tasksForDay = tasks[day];
    if (!tasksForDay || tasksForDay.length === 0) {
      return <Text>No tasks for this day</Text>;
    }
    return tasksForDay.map((task) => (
      <View key={task.id} style={styles.taskContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text>{task.description}</Text>
        <Text>{task.time}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
         <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString); // Met à jour la date sélectionnée
        }}
        markedDates={{
          ...Object.keys(tasks).reduce((acc, date) => {
            acc[date] = { marked: true };
            return acc;
          }, {} as { [key: string]: { marked: boolean } }),
        }}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tasks for the selected day:</Text>
        {renderTasks(selectedDate)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tasksContainer: {
    marginTop: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;

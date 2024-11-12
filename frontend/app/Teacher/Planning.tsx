import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const Planning = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [task, setTask] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fonction pour gérer la sélection de la date
  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  // Fonction pour afficher le time picker
  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  // Fonction pour gérer la sélection de l'heure
  const onTimeChange = (event: any, selectedDateTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDateTime) {
      setSelectedTime(selectedDateTime);
    }
  };

  // Fonction pour créer une tâche
  const createTask = async () => {
    if (!selectedDate || !task) {
      Alert.alert('Erreur', 'Veuillez sélectionner une date et entrer une tâche.');
      return;
    }

    const planningData = {
    title: task,
    description: description,
    idClasse: 61,
    date: selectedDate,
    time: selectedTime.toTimeString().split(' ')[0],
    };

    try {
      const response = await axios.post('http://10.0.2.2:5094/Planning/Create', planningData);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Impossible d'enregistrer la tâche. Veuillez vérifier la connexion à l'API.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un Planning</Text>

      {/* Composant du calendrier */}
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
        }}
      />

      <Text style={styles.label}>Date sélectionnée : {selectedDate || 'Aucune date sélectionnée'}</Text>

      {/* Bouton pour sélectionner l'heure */}
      <Button title="Sélectionner l'heure" onPress={showTimePickerModal} />
      <Text style={styles.label}>Heure sélectionnée : {selectedTime.toLocaleTimeString()}</Text>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      {/* Champ pour entrer la tâche */}
      
      <TextInput
        style={styles.input}
        placeholder="Entrez la tâche"
        value={task}
        onChangeText={setTask}
      />
      <TextInput
        style={styles.input}
        placeholder="Entrez la description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Bouton pour enregistrer la tâche */}
      <Button title="Enregistrer la tâche" onPress={createTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default Planning;

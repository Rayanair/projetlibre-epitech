import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const ClassePage = () => {
  const [user, setUser] = useState<any>(null);
  const [userClasse, setClasse] = useState<any>(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserClasse = async (classeId: string) => {
    try {
      const response = await axios.get(`http://10.0.2.2:5094/User/Classe/${classeId}`);
      console.log(response.data);
      setClasse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.classeId) {
      getUserClasse(user.classeId);
    }
  }, [user]);

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({pathname: 'Student/students', params: { param: JSON.stringify(item) }})} >
    <View style={styles.userItem}>
      <Text>{`${item.firstName} ${item.lastName}`}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Classe ID: {item.classeId}</Text>
      <Text>Code: {item.code}</Text>
    </View>
     </TouchableOpacity>
  );

  // Filtrer la liste des utilisateurs pour exclure l'utilisateur courant
  const filteredUserClasse = userClasse ? userClasse.filter(u => u.id !== user.id) : [];

  return (
    <View style={styles.container}>
      {user && (
        <>
        <View style={styles.currentUser}>
          <Text style={styles.title}>Vous</Text>
          <Text>{`${user.firstName} ${user.lastName}`}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Classe ID: {user.classeId}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('Student/planning')} >
    <View style={styles.userItem}>
      <Text>Mon planning</Text>
    </View>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => router.push('Student/ExerciceEnvoyer')} >
    <View style={styles.userItem}>
      <Text>Exercices envoyé</Text>
    </View>
     </TouchableOpacity>
        
        </>
      )}
      <Text style={styles.title}>Mes camarades</Text>
      <FlatList
        data={filteredUserClasse}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()} // Utiliser l'ID comme clé unique
      />
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
  },
  userItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  currentUser: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    backgroundColor: '#E3F2FD',
  },
  classeDetails: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#28A745',
    borderRadius: 5,
    backgroundColor: '#D4EDDA',
  },
});

export default ClassePage;

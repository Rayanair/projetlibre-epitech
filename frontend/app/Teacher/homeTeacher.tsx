import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router'; // Importation du router pour la navigation
import ProfilBubble from '../component/profilbulle';

interface Classe {
  id: string;
  name: string;
}

const TeacherPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [Classe, setClasse] = useState<Classe | null>(null);
  const scaleValue = useState(new Animated.Value(1))[0]; // État pour l'animation

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

console.log(user)

  useEffect(() => {
    if (user && user.classeId) {
      getClasse(user.classeId);
    }
  }, [user]);

  const getClasse = async (classeId: string) => {
    try {
      const response = await axios.get(`http://10.0.2.2:5094/Classe/Get?id=${classeId}`);
      setClasse(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erreur', 'Impossible de récupérer la classe');
    }
  };

 

  const handlePress = () => {
    if (Classe) {
      // Navigation vers la page "ClasseDetails"
      // router.push(`/ClasseDetails?id=${Classe.id}`);
      router.push(`Teacher/ClasseDetails`);
    }
  };

  const handlePressExo = () => {
    if (Classe) {
      // Navigation vers la page "ClasseDetails"
      // router.push(`/ClasseDetails?id=${Classe.id}`);
      router.push(`Teacher/ExerciceEnvoyer`);
    }
  };

  const handlePressPlan = () => {
    if (Classe) {
      // Navigation vers la page "ClasseDetails"
      // router.push(`/ClasseDetails?id=${Classe.id}`);
      router.push(`Teacher/Planning`);
    }
  };

  const handlePressVisuPlan = () => {
    if (Classe) {
      // Navigation vers la page "ClasseDetails"
      // router.push(`/ClasseDetails?id=${Classe.id}`);
      router.push(`Teacher/VisuPlanning`);
    }
  };

  const animatePress = () => {
    // Animation d'échelle pour un effet de clic
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => handlePress());
  };

  return (
    <View style={styles.container}>
      <ProfilBubble />
      {Classe && (
        <>
        <Animated.View style={[styles.classContainer, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity onPress={handlePressExo} style={styles.lepad}>
            <Text style={styles.classText}>Exercice envoyé</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.classContainer, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity onPress={animatePress} style={styles.lepad}>
            <Text style={styles.classText}>{Classe.nameClasse}</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.classContainer, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity onPress={handlePressPlan} style={styles.lepad}>
            <Text style={styles.classText}>Planning</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.classContainer, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity onPress={handlePressVisuPlan} style={styles.lepad}>
            <Text style={styles.classText}>Voir le planning</Text>
          </TouchableOpacity>
        </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Couleur de fond améliorée
  },
  classContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: '#4a90e2', // Couleur de fond dynamique
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  classText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Couleur de texte pour contraste
    textAlign: 'center',
  },
});

export default TeacherPage;

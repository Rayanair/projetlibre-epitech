import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from 'expo-router';

// Données des exercices par matière
const exercicesData = {
    1: { matiere: 'Français', id: 1 , exercices: [ { id: 1, title: 'Exo 1' }, { id: 2, title: 'Exo 2' } ] },
    2: { matiere: 'Math', id: 2  ,exercices: [ { id: 1, title: 'Exo 1' }, { id: 2, title: 'Exo 2' } ] },
    3: { matiere: 'Géographie', id: 3  ,exercices: [ { id: 1, title: 'Exo 1' }, { id: 2, title: 'Exo 2' } ] },
    4: { matiere: 'Culture Générale', id: 4  ,exercices: [ { id: 1, title: 'Exo 1' }, { id: 2, title: 'Exo 2' } ] }
};

const ExerciceList = () => {
    const [selectedExercice, setSelectedExercice] = useState<{ id: number; title: string } | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [idMatiere, setIdMatiere] = useState(null);

    let { param } = useLocalSearchParams();
    param = JSON.parse(param);
    console.log(param)

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
        fetchData()
      }, []);


    const handleExercicePress = (exercice: { id: number; title: string }, idmatiere) => {
        setSelectedExercice(exercice);
        setIdMatiere(idmatiere)
        setIsModalVisible(true);
    };

    const handleSendExercice = async () => {
        console.log(selectedExercice.id)
        console.log(idMatiere)
        console.log(param.id)
        try {
            const response = await axios.post('http://10.0.2.2:5094/EnvoieExercice/Create',{
            idProf: user.id,
            idEleve: param,
            exo: selectedExercice.id,
            matiere: idMatiere,
            valide: 0
            });
          } catch (error) {
            console.error(error);
          }
       
        
        setIsModalVisible(false);
        setSelectedExercice(null);
    };

    const renderExercice = (exercice: { id: number; title: string }, idmatiere) => (
        <TouchableOpacity style={styles.exerciceButton} onPress={() => handleExercicePress(exercice, idmatiere)}>
            <Text style={styles.exerciceText}>{exercice.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {Object.values(exercicesData).map(({ matiere, id,exercices }) => (
                <View key={matiere} style={styles.matiereContainer}>
                    <Text style={styles.matiereTitle}>{matiere}</Text>
                    <FlatList
                        data={exercices}
                        renderItem={({ item }) => renderExercice(item, id)}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                    />
                </View>
            ))}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Voulez-vous envoyer l'exercice {selectedExercice?.title}?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button title="Annuler" onPress={() => setIsModalVisible(false)} />
                            <Button title="Valider" onPress={handleSendExercice} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0'
    },
    matiereContainer: {
        marginBottom: 20,
    },
    matiereTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciceButton: {
        padding: 10,
        marginRight: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    exerciceText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default ExerciceList;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";



type Exercice = {
    id: number;
    idProf: number;
    idEleve: number;
    exo: number;
    matiere: number;
    valide: number;
};

const ProfExerciceList = () => {
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        // Fonction pour récupérer les exercices
        const fetchExercices = async () => {
            try {
                const response = await axios.get<Exercice[]>(`http://10.0.2.2:5094/EnvoieExercice/Prof/${user.id}`);
                setExercices(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des exercices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercices();
    }, []);

    const renderItem = ({ item }: { item: Exercice }) => (
        <View style={styles.exerciceContainer}>
            <Text style={styles.exerciceText}>ID Exercice: {item.id}</Text>
            <Text style={styles.exerciceText}>ID Prof: {item.idProf}</Text>
            <Text style={styles.exerciceText}>ID Élève: {item.idEleve}</Text>
            <Text style={styles.exerciceText}>Exercice N°: {item.exo}</Text>
            <Text style={styles.exerciceText}>Matière: {getMatiereName(item.matiere)}</Text>
            <Text style={styles.exerciceText}>Validé: {item.valide === 1 ? 'Oui' : 'Non'}</Text>
        </View>
    );

    const getMatiereName = (matiereId: number) => {
        switch (matiereId) {
            case 1:
                return 'Français';
            case 2:
                return 'Math';
            case 3:
                return 'Géographie';
            case 4:
                return 'Culture Générale';
            default:
                return 'Inconnue';
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
                <FlatList
                    data={exercices}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucun exercice trouvé</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    exerciceContainer: {
        padding: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 10,
    },
    exerciceText: {
        fontSize: 16,
        color: '#333',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ProfExerciceList;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import ProfilBubble from '../component/profilbulle';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Définition du type de l'objet enfant
interface Enfant {
    id: number;
    firstName: string;
    lastName: string;
}

export default function HomeParent() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [code, setCode] = useState('');
    const [enfants, setEnfants] = useState<Enfant[]>([]);
    const [user, setUser] = useState<any>(null);

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
    
    async function SearchChild(code: string) {
        try {
            const response = await axios.get<Enfant>(`http://10.0.2.2:5094/User/${code}`);
            AddChild(response.data.id)
        } catch (error) {
            console.log(error);
            alert("Pas d'enfant trouvé");
        }
    }

    async function getchild() {
        try {
            const response = await axios.get<Enfant>(`http://10.0.2.2:5094/ParentEleve/Get?parentid=${user.id}`);
            setEnfants(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    async function AddChild(id) {
        try {
            await axios.post(`http://10.0.2.2:5094/ParentEleve/Create`, {
                eleveId: id,  // À ajuster en fonction de votre logique métier
                parentId: user.id,  // À ajuster en fonction de votre logique métier
            });
            getchild()
        } catch (error) {
            console.log(error);
            alert("Création non réussie");
        }
    }

    useEffect(() => {
        if(user){
            getchild();
        }
      }, [user]);

    const renderItem = ({ item }: { item: Enfant }) => (
        <TouchableOpacity onPress={() => router.push({pathname: 'Parent/profilEnfant', params: { param: JSON.stringify(item.eleve) }})} >
        <View style={styles.enfantItem}  >
            <Text style={styles.enfantText}>Prénom: {item.eleve.firstName}</Text>
            <Text style={styles.enfantText}>Nom: {item.eleve.lastName}</Text>
        </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ProfilBubble />
            <Text>Bienvenue sur la page Parent</Text>
            <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.buttonText}>Ajouter votre enfant</Text>
            </TouchableOpacity>

            <FlatList
                data={enfants}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.enfantsList}
            />

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ajouter un enfant</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez le code"
                            value={code}
                            onChangeText={setCode}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.addButton} 
                                onPress={() => {
                                    SearchChild(code);
                                    setIsModalVisible(false);
                                }}
                            >
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    addButton: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#dc3545',
        borderRadius: 5,
    },
    enfantItem: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    enfantText: {
        fontSize: 16,
    },
    enfantsList: {
        flexGrow: 1,
        alignItems: 'center',
    },
});

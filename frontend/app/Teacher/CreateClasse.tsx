import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StyleSheet, View, Modal, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";
import ProfilBubble from "../component/profilbulle";
import { router } from "expo-router"
import axios from "axios";

export default function Index() {
    const [ClasseName, SetClasseName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [code, setCode] = useState("");

    function generateUniqueCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCode(result);
    }

    useEffect(() => {
        generateUniqueCode()
      }, []);

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


      async function handleConfirm(ClasseId) {
        try {
          const response = await axios.put(`http://10.0.2.2:5094/User/Update`, {
            id : user.id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password,
            avatar : user.avatar,
            classeId: ClasseId["id"],
            roleId : 2,
            code : "string"
          });
          console.log("avatar valider")
          await AsyncStorage.setItem("user", JSON.parse(JSON.stringify(response.config.data)))
          router.push('/Teacher/homeTeacher');
        } catch (error) {
          console.log(error);
          alert("Une erreur s'est produite lors de la connexion.");
        }
      }

    async function CreateClasse() {
        generateUniqueCode()
        console.log(code)
        console.log(ClasseName)
        console.log(user.id)
        try {
            const response = await axios.post(`http://10.0.2.2:5094/Classe/Create`, {
                user: user.id,
                nameClasse: ClasseName,
                code: code,
            });
            setModalVisible(false);
            handleConfirm(response.data)

        } catch (error) {
            console.log(error);
            alert("Impossible de créer la classe");
        }
    }


    return (
        <View style={styles.container}>
            <ProfilBubble />
            <Button mode="contained" onPress={() => setModalVisible(true)}>Créer une nouvelle classe</Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Créer une nouvelle classe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom de la classe"
                            value={ClasseName}
                            onChangeText={SetClasseName}
                        />
                        <Button mode="contained" onPress={CreateClasse}>Créer</Button>
                        <Button onPress={() => setModalVisible(false)}>Annuler</Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

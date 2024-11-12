import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Modal, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');
const avatarImages = {
  0: require("../../assets/images/pirate0.png"),
  1: require("../../assets/images/pirate1.png"),
  2: require("../../assets/images/pirate2.png"),
  3: require("../../assets/images/pirate3.png"),
  4: require("../../assets/images/pirate4.png"),
};

const badgeImages = {
  1: require("../../assets/images/badgeCg.jpg"),
  2: require("../../assets/images/badgeFrancais2.jpg"),
  3: require("../../assets/images/badgeGeo.jpg"),
  4: require("../../assets/images/badgeFrancais2.jpg"),
};

const ProfilePage = () => {
  const [fontsLoaded] = useFonts({
    "PirataOne": require("../../assets/images/bg-pirate.png"),
  });

  const [user, setUser] = useState(null);
  const [matiere, setMatiere] = useState([]);
  const [badge, setBadge] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Pour gérer la visibilité de la modale
  const [classeCode, setClasseCode] = useState(''); // Pour stocker le code de la classe

  const router = useRouter();
  let { param } = useLocalSearchParams();
  param = JSON.parse(param);
  console.log(param)

  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const userData = JSON.parse(value);
          setUser(userData);

          // Fetch user and matiere data
          const [userResponse, matiereResponse] = await Promise.all([
            axios.get(`http://10.0.2.2:5094/User/Get?id=${param.id}`),
            axios.get(`http://10.0.2.2:5094/Matiere/${param.id}`),
          ]);

          setUser(userResponse.data);
          setMatiere(matiereResponse.data);
        }
      } catch (e) {
        console.error('Erreur lors de la récupération des données', e);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const userData = JSON.parse(value);
          setUser(userData);

          // Fetch user badge data
          try {
            const response = await axios.get(`http://10.0.2.2:5094/Level/${param.id}`);
            setBadge(response.data);
          } catch (fetchError) {
          }
        } else {
          console.log('Aucune donnée utilisateur trouvée.');
        }
      } catch (e) {
      }
    };

    initialize();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>Loading user data...</Text>;
  }

  async function handleConfirm(elClasseId) {
    try {
      const response = await axios.put(`http://10.0.2.2:5094/User/Update`, {
        id : param.id,
        firstName : param.firstName,
        lastName : param.lastName,
        email : param.email,
        password : param.password,
        code : param.code,
        avatar : param.avatar,
        roleId : 1,
        classeId : elClasseId
      });
      console.log("Classe Ajouté")
      // Mettre à jour les données utilisateur
    } catch (error) {
      console.log(error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  }

  async function addclasse() {
    try {
        const response = await axios.get(`http://10.0.2.2:5094/Classe/${classeCode}`);
        console.log(response.data.id);
        handleConfirm(response.data.id)
        setModalVisible(false);
    } catch (error) {
        console.log(error);
    }
  }


  const avatar = avatarImages[user["avatar"]] || require("../../assets/images/adaptive-icon.png");

  const renderBadgeItem = ({ item }) => {
    const badgeImage = badgeImages[item.badge] || require("../../assets/images/adaptive-icon.png");
    return (
      <View style={styles.badgeContainer}>
        <Image source={badgeImage} style={styles.badgeImage} />
        <Text style={styles.badgeText}>Badge ID: {item.badge}</Text>
      </View>
    );
  };

  const renderMatiereItem = ({ item }) => (
    <View style={styles.matiereContainer}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{item.level}</Text>
      </View>
      <Text style={styles.matiereText}>Matiere ID: {item.matiereId}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={avatar} style={styles.profilePic} />
        <Text style={styles.username}>{param.firstName} {param.lastName}</Text>
        <Text style={styles.email}>{param.email}</Text>
        <Text style={styles.email}>{param.classeId}</Text>
      </View>
      
      <FlatList
        data={matiere}
        renderItem={renderMatiereItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.matiereList}
      />
      <FlatList
        data={badge}
        renderItem={renderBadgeItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.badgeList}
      />


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: 'Teacher/EnvoyerExo', params: { param: param.id}})}>
          <FontAwesome name="sign-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Envoyer un exercice</Text>
        </TouchableOpacity>
      </View>

      {/* Modale pour ajouter une classe */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Entrer le code de la classe</Text>
              <TextInput
                style={styles.input}
                placeholder="Code de la classe"
                placeholderTextColor="#ddd"
                value={classeCode}
                onChangeText={setClasseCode}
              />
              <TouchableOpacity style={styles.button} onPress={addclasse}>
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      padding: 20,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 30,
      borderColor: '#ffd700',
      borderWidth: 3,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#333',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#ffd700',
      marginBottom: 10,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'PirataOne',
      color: '#ffd700',
      textShadowColor: '#000',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
    },
    email: {
      fontSize: 16,
      color: '#ddd',
      fontFamily: 'PirataOne',
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ff6347',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderColor: '#ffd700',
      borderWidth: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    buttonText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'PirataOne',
    },
    matiereList: {
      width: '100%',
      marginTop: 20,
    },
    badgeList: {
      width: '100%',
      marginTop: 20,
    },
    matiereContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ffd700',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    circleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    matiereText: {
      fontSize: 16,
      color: '#fff',
      fontFamily: 'PirataOne',
    },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    badgeImage: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    badgeText: {
      fontSize: 16,
      color: '#fff',
      fontFamily: 'PirataOne',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#333',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      borderColor: '#ffd700',
      borderWidth: 2,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#ffd700',
      fontFamily: 'PirataOne',
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ffd700',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: '#fff',
    },
  });
  
  export default ProfilePage;
  

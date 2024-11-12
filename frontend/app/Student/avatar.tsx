import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const avatars = [
  require('../../assets/images/pirate0.png'),
  require('../../assets/images/pirate1.png'),
  require('../../assets/images/pirate2.png'),
  require('../../assets/images/pirate3.png'),
  require('../../assets/images/pirate4.png'),
];

const AvatarSelection: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      // Erreur lors de la récupération des données
      console.error('Erreur lors de la récupération des données', e);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index);
  };


  async function handleConfirm() {
    try {
      const response = await axios.put(`http://10.0.2.2:5094/User/Update`, {
        id : user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        password : user.password,
        code : user.code,
        avatar : selectedAvatar,
        roleId : 1,
      });
      console.log("avatar valider")
      router.push('/Student/homeStudent'); // Mettre à jour les données utilisateur
    } catch (error) {
      console.log(error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre Avatar</Text>
      <ScrollView contentContainerStyle={styles.avatarList}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.avatarContainer,
              selectedAvatar === index && styles.selectedAvatar,
            ]}
            onPress={() => handleAvatarSelect(index)}
          >
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b2f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#f5f5f5',
    marginBottom: 20,
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    backgroundColor: '#30336b',
    elevation: 5,
  },
  selectedAvatar: {
    borderColor: '#f39c12',
    backgroundColor: '#d35400',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  confirmButton: {
    marginTop: 30,
    backgroundColor: '#f39c12',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importer useRouter pour la navigation

const ProfilBubble: React.FC = () => {
  const router = useRouter(); // Initialiser useRouter

  const navigateToProfile = () => {
    router.push('/profil'); // Rediriger vers la page de profil
  };

  return (
    <TouchableOpacity style={styles.bubble} onPress={navigateToProfile}>
      <Image source={require('../../assets/images/iconprofil.jpg')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#f8c291',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
});

export default ProfilBubble;
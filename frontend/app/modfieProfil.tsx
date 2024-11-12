import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('example@mail.com');
  const [firstName, setFirstName] = useState<string>('John');
  const [lastName, setLastName] = useState<string>('Doe');

  const handleSaveChanges = () => {
    // Ici, vous pouvez gérer la sauvegarde des modifications
    Alert.alert('Modifications enregistrées', `Nom: ${firstName} ${lastName}\nEmail: ${email}`);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => Alert.alert('Compte supprimé') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prénom:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Prénom"
      />
      
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Nom"
      />
      
      <Text style={styles.label}>Adresse e-mail:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Adresse e-mail"
        keyboardType="email-address"
      />
      
      <Button title="Enregistrer les modifications" onPress={handleSaveChanges} />

      <View style={styles.separator} />

      <Button title="Supprimer le compte" color="red" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  separator: {
    marginVertical: 20,
  },
});

export default ProfileScreen;

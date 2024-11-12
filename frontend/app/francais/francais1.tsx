import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import InfoBubble from '../component/infobulle';

// Définition du type pour les mots
interface Mot {
  mot: string;
  reponse: string;
}

// Liste des mots avec leur réponse
const mots: Mot[] = [
  { mot: "chien", reponse: "niche" },
  { mot: "canard", reponse: "cadran" },
  { mot: "sac", reponse: "cas" },
  { mot: "sel", reponse: "les" },
  { mot: "nos", reponse: "son" },
  { mot: "mon", reponse: "nom" },
  { mot: "sec", reponse: "ces" },
  { mot: "tir", reponse: "rit" },
  { mot: "amis", reponse: "mais" },
  { mot: "voisin", reponse: "vision" },
  { mot: "dire", reponse: "ride" },
  { mot: "merci", reponse: "crime" },
  { mot: "soeur", reponse: "ourse" },
  { mot: "trier", reponse: "tirer" },
  { mot: "course", reponse: "source" },
  { mot: "rouge", reponse: "orgue" },
  { mot: "orange", reponse: "organe" },
  { mot: "coupe", reponse: "pouce" },
];

const Anagrammes: React.FC = () => {
  const [mot, setMot] = useState<string>('');
  const [com, setCom] = useState<number>(0);
  const [reponse, setReponse] = useState<string>('');
  const [motMelange, setMotMelange] = useState<string>('');
  const [lettreSelectionnee, setLettreSelectionnee] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [pointsDeVie, setPointsDeVie] = useState<number>(10);

  // Fonction pour mélanger les lettres du mot
  const melangerMot = () => {
    const motAleatoireObjet = mots[Math.floor(Math.random() * mots.length)];
    setReponse(motAleatoireObjet.reponse);
    setMot(motAleatoireObjet.mot);
    setMotMelange(motAleatoireObjet.mot);
  };

  // Fonction pour sélectionner une lettre et échanger sa position
  const selectionnerLettre = (index: number) => {
    if (lettreSelectionnee === null) {
      setLettreSelectionnee(index);
    } else {
      const nouveauMotMelange = swapPositions(motMelange, lettreSelectionnee, index);
      setMotMelange(nouveauMotMelange);
      setLettreSelectionnee(null);
    }
  };

  // Fonction pour échanger les positions de deux lettres
  const swapPositions = (chaine: string, index1: number, index2: number): string => {
    const tableau = chaine.split('');
    const temp = tableau[index1];
    tableau[index1] = tableau[index2];
    tableau[index2] = temp;
    return tableau.join('');
  };

  // Fonction pour réinitialiser le jeu
  const reinitialiser = () => {
    melangerMot();
  };

  // Fonction pour vérifier la réponse
  const verif = () => {
    if (motMelange === reponse) {
      setScore(score + 1);
      reinitialiser();
    } else {
      setPointsDeVie(pointsDeVie - 1);
      reinitialiser();
      if (pointsDeVie === 0) {
        Alert.alert("Game Over", "Vous avez perdu toutes vos vies.");
      } else {
        Alert.alert("Mauvaise réponse", "Essayez à nouveau!");
      }
    }
  };

  // Création des boutons pour chaque lettre
  const buttons = motMelange.split('').map((char, index) => (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => selectionnerLettre(index)}
    >
      <Text style={styles.buttonText}>{char}</Text>
    </TouchableOpacity>
  ));

  return (
    <ImageBackground
      source={require('../../assets/images/fondecrantresor.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
      <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
        <Text style={styles.title}>Jeu d'anagrammes des Pirates</Text>
        <Text style={styles.word}>{mot}</Text>
        <View style={styles.wordContainer}>{buttons}</View>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.pointsDeVie}>Points de vie: {pointsDeVie}</Text>
        {com === 0 ? (
          <TouchableOpacity style={styles.resetButton} onPress={() => { reinitialiser(); setCom(1); }}>
            <Text style={styles.resetButtonText}>Commencer</Text>
          </TouchableOpacity>
        ) : null}
        {com !== 0 ? (
          <TouchableOpacity style={styles.resetButton} onPress={verif}>
            <Text style={styles.resetButtonText}>Vérification</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajout d'une transparence pour bien voir le texte sur le fond
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', // Couleur dorée pour rappeler les trésors
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  word: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513', // Couleur marron pour rappeler le bois des bateaux
    padding: 15,
    margin: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700', // Bordure dorée pour le côté pirate
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  resetButton: {
    backgroundColor: '#B22222', // Rouge pour le bouton de vérification
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  pointsDeVie: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default Anagrammes;

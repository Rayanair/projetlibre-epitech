import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';

// Définition des mots et des indices
const mots = [
  { mot: "école", indice: "Un endroit où les enfants vont pour apprendre." },
  { mot: "chat", indice: "Un animal domestique qui miaule." },
  { mot: "livre", indice: "Un objet avec des pages que l'on peut lire." },
  { mot: "arbre", indice: "Une grande plante avec un tronc." },
  { mot: "maison", indice: "Un lieu où l'on habite." },
  { mot: "voiture", indice: "Un moyen de transport à quatre roues." },
  { mot: "mer", indice: "Une vaste étendue d'eau salée." },
  { mot: "soleil", indice: "L'étoile qui brille dans le ciel pendant la journée." },
];

const DevineLeMot: React.FC = () => {
  const [motCourant, setMotCourant] = useState<string>('');
  const [indice, setIndice] = useState<string>('');
  const [lettresDevinees, setLettresDevinees] = useState<string[]>([]);
  const [pointsDeVie, setPointsDeVie] = useState<number>(10); // Points de vie initialisés à 10
  const [score, setScore] = useState<number>(0);

  // Initialisation du jeu au montage du composant
  useEffect(() => {
    demarrerJeu();
  }, []);

  // Fonction pour démarrer ou réinitialiser le jeu
  const demarrerJeu = () => {
    const motAleatoire = mots[Math.floor(Math.random() * mots.length)];
    setMotCourant(motAleatoire.mot);
    setIndice(motAleatoire.indice);
    setLettresDevinees([]);
    setPointsDeVie(10); // Réinitialiser les points de vie à 10 pour chaque nouveau mot
  };

  // Gestion des clics sur les lettres
  const selectionnerLettre = (lettre: string) => {
    if (lettresDevinees.includes(lettre)) {
      return;
    }

    if (motCourant.includes(lettre)) {
      const nouvellesLettresDevinees = [...lettresDevinees, lettre];
      setLettresDevinees(nouvellesLettresDevinees);

      if (motCourant.split('').every(l => nouvellesLettresDevinees.includes(l))) {
        setScore(score + 1);
        Alert.alert("Bravo!", "Vous avez trouvé le mot!");
        demarrerJeu();
      }
    } else {
      const nouveauxPointsDeVie = pointsDeVie - 1;
      setPointsDeVie(nouveauxPointsDeVie);
      if (nouveauxPointsDeVie === 0) {
        Alert.alert("Perdu", `Le mot était: ${motCourant}`);
        demarrerJeu();
      }
    }
  };

  // Création des boutons pour chaque lettre
  const alphabet = 'abcdefghijklmnopqrstuvwxyzéàèùçâêîôûëïüÿ'.split('');
  const buttons = alphabet.map((lettre, index) => (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => selectionnerLettre(lettre)}
    >
      <Text style={styles.buttonText}>{lettre.toUpperCase()}</Text>
    </TouchableOpacity>
  ));

  // Affichage du mot avec les lettres devinées
  const afficherMot = () => {
    return motCourant.split('').map((lettre, index) => (
      <Text key={index} style={styles.letter}>
        {lettresDevinees.includes(lettre.toLowerCase()) ? lettre : '_'}
      </Text>
    ));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fondecranbateau.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Devine le Mot</Text>
        {indice ? <Text style={styles.indice}>Indice: {indice}</Text> : null}
        <View style={styles.wordContainer}>
          {afficherMot()}
        </View>
        <View style={styles.letterContainer}>
          {buttons}
        </View>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.life}>Points de Vie: {pointsDeVie} / 10</Text>
        <TouchableOpacity style={styles.resetButton} onPress={demarrerJeu}>
          <Text style={styles.resetButtonText}>Commencer un nouveau mot</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  indice: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  letter: {
    fontSize: 30,
    color: '#fff',
    marginHorizontal: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  letterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 10,
    margin: 3,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
    minWidth: 35,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  resetButton: {
    backgroundColor: '#B22222',
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
    textShadowRadius: 1,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  life: { // Nouveau style pour les points de vie
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default DevineLeMot;

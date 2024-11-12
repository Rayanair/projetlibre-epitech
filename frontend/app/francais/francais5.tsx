import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Animated, Alert, ImageBackground } from "react-native";

// Définition des types pour les mots et leurs synonymes
interface Synonyme {
  mot: string;
  synonymes: string[];
  reponse: string;
}

const TrouveLeSynonyme: React.FC = () => {
  // Liste des mots avec synonymes et réponse correcte
  const synonymes: Synonyme[] = [
    { mot: "rapide", synonymes: ["vite", "lent", "paresseux", "très"], reponse: "vite" },
    { mot: "content", synonymes: ["heureux", "triste", "fâché", "anxieux"], reponse: "heureux" },
    { mot: "grand", synonymes: ["petit", "énorme", "large", "immense"], reponse: "énorme" },
    { mot: "difficile", synonymes: ["facile", "simple", "compliqué", "aisé"], reponse: "compliqué" },
    { mot: "fort", synonymes: ["faible", "puissant", "fragile", "robuste"], reponse: "puissant" },
    { mot: "joyeux", synonymes: ["heureux", "triste", "mélancolique", "déprimé"], reponse: "heureux" },
    { mot: "beau", synonymes: ["joli", "laid", "désagréable", "repoussant"], reponse: "joli" },
    { mot: "bruyant", synonymes: ["silencieux", "calme", "chaud", "éveillé"], reponse: "silencieux" },
    { mot: "rapide", synonymes: ["lent", "vif", "claire", "bref"], reponse: "vif" },
    { mot: "chaud", synonymes: ["froid", "brûlant", "glaçant", "tempéré"], reponse: "brûlant" },
  ];

  const [currentSynonymeIndex, setCurrentSynonymeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [animation] = useState(new Animated.Value(0));
  const currentSynonyme: Synonyme = synonymes[currentSynonymeIndex];

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(0);
    });
  };

  const handleCheckAnswer = () => {
    if (selectedOption === currentSynonyme.reponse) {
      setScore(score + 1);
      setFeedback(score + 1 >= 10 ? "Félicitations ! Vous avez atteint le score maximum !" : "Bonne réponse !");
      setCurrentSynonymeIndex(currentSynonymeIndex + 1);
      setSelectedOption(null);
    } else {
      setLives(lives - 1);
      setFeedback(lives - 1 === 0 ? "Vous avez perdu toutes vos vies !" : "Mauvaise réponse, essayez encore !");
      if (lives - 1 === 0) {
        Alert.alert("Game Over", "Vous avez perdu toutes vos vies !", [
          { text: "Recommencer", onPress: () => resetGame() }
        ]);
      }
    }
  };

  const resetGame = () => {
    setLives(10);
    setScore(0);
    setCurrentSynonymeIndex(0);
    setSelectedOption(null);
    setFeedback("");
  };

  const handleNextSynonyme = () => {
    if (currentSynonymeIndex < synonymes.length - 1) {
      setCurrentSynonymeIndex(currentSynonymeIndex + 1);
      setSelectedOption(null);
      setFeedback("");
    } else {
      Alert.alert("Bravo !", `Vous avez terminé le jeu avec un score de ${score} !`, [
        { text: "Recommencer", onPress: () => resetGame() }
      ]);
    }
  };

  const animatedStyle = {
    transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }]
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fondecrantresor.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Trouve le Synonyme</Text>
        <Text style={styles.text}>Quel est le synonyme de : {currentSynonyme.mot} ?</Text>
        <View style={styles.optionsContainer}>
          {currentSynonyme.synonymes.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleSelectOption(option)}
              disabled={score >= 10 || lives === 0}
            >
              <Animated.Text style={[styles.optionText, selectedOption === option && animatedStyle]}>
                {option}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button onPress={handleCheckAnswer} title="Vérifier" disabled={selectedOption === null || score >= 10} color="#8B4513" />
        <Text style={styles.feedback}>{feedback}</Text>
        {lives === 0 || currentSynonymeIndex === synonymes.length - 1 ? (
          <Button onPress={resetGame} title="Recommencer" color="#8B4513" />
        ) : (
          <Button onPress={handleNextSynonyme} title="Synonyme suivant" color="#8B4513" />
        )}
        <Text style={styles.score}>Score : {score}</Text>
        <Text style={styles.lives}>Vies : {lives}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark translucent background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  feedback: {
    fontSize: 16,
    marginTop: 10,
    color: "darkred",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: 'green',
  },
  lives: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: 'red',
  },
});

export default TrouveLeSynonyme;

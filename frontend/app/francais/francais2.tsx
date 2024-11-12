import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Image, Animated, Alert } from "react-native";
import InfoBubble from "../component/infobulle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Définition des types pour les phrases
interface Phrase {
  text: string;
  options: string[];
  answer: string;
}

const TabOneScreen: React.FC = () => {
  const phrases: Phrase[] = [
    { text: "Le chat __ sur le tapis.", options: ["dors", "dort", "dorts", "dor"], answer: "dort" },
    { text: "Le soleil __ dans le ciel.", options: ["brille", "brilles", "brile", "brillent"], answer: "brille" },
    { text: "La fleur __ belle.", options: ["est", "es", "ai", "et"], answer: "est" },
    { text: "Il __ chaud en été.", options: ["fai", "fais", "faits", "fait"], answer: "fait" },
    { text: "Le chien __ dans le jardin.", options: ["cours", "courre", "court", "cour"], answer: "court" },
    { text: "Les enfants __ au parc.", options: ["jouent", "joue", "joues", "jous"], answer: "jouent" },
    { text: "Les papillons __ dans le ciel.", options: ["vole", "volent", "voles", "volle"], answer: "volent" },
    { text: "Les arbres __ des feuilles vertes.", options: ["s'ont", "s'on", "on", "ont"], answer: "ont" },
    { text: "Les éléphants __ grands et forts.", options: ["son", "sont", "sons", "est"], answer: "sont" },
    { text: "Les pommes sont rouges __ délicieuses.", options: ["et", "est", "es", "ai"], answer: "et" },
    { text: "Les __ roulent sur la route.", options: ["voiturre", "voitur", "voiture", "voitures"], answer: "voitures" }
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [animation] = useState(new Animated.Value(0));
  const currentPhrase: Phrase = phrases[currentPhraseIndex];
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
    fetchData();
  }, []);

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

  async function UpdateMatiere(level) {
    try {
      const response = await axios.put(`http://10.0.2.2:5094/Matiere/Update`, {
        userId: user.id,
        matiereId: 1,
        level: level,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Pas de matière mise à jour.");
    }
  }

  async function Winbadge() {
    try {
      const response = await axios.post(`http://10.0.2.2:5094/Level/Create`, {
        levelId: 2,
        userId: user.id,
        matieresId: 1,
        badge: 2,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de récupérer le badge.");
    }
  }

  const handleCheckAnswer = () => {
    if (selectedOption === currentPhrase.answer) {
      setScore(score + 1);
      setFeedback(score + 1 >= 10 ? "Félicitations ! Vous avez réussi !" : "Bravo !");
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setSelectedOption(null);
    } else {
      setLives(lives - 1);
      setFeedback("Désolé, essaie à nouveau !");
      if (lives - 1 === 0) {
        Alert.alert("Perdu", "Vous avez perdu toutes vos vies !");
        setLives(10); // Réinitialiser les PV
        setCurrentPhraseIndex(0);
        setScore(0);
        setSelectedOption(null);
      }
    }
  };

  const handleNextPhrase = () => {
    if (currentPhraseIndex < phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setSelectedOption(null);
      setFeedback("");
    }
  };

  const animatedStyle = {
    transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) }]
  };

  return (
    <View style={styles.container}>
      <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
      <Image source={require('../../assets/images/bg-pirate.png')} style={styles.backgroundImage} />
      <Text style={styles.text}>{currentPhrase.text}</Text>
      <View>
        {currentPhrase.options.map((option, index) => (
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
      <Button onPress={() => { UpdateMatiere(1); Winbadge(); }} title="Récupérer" disabled={score < 10} color="#8B4513" />
      <Text style={styles.feedback}>{feedback}</Text>
      {lives === 0 && score < 10 && (
        <View>
          <Text style={styles.feedback}>La bonne réponse était "{currentPhrase.answer}"</Text>
          <Button onPress={handleNextPhrase} title="Phrase suivante" color="#8B4513" />
        </View>
      )}
      <Text style={styles.score}>Score : {score}</Text>
      <Text style={styles.lives}>PV : {lives} / 10</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'serif',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  optionButton: {
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    minWidth: 200,
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  feedback: {
    fontSize: 16,
    marginTop: 10,
    color: "#FFD700",
    textAlign: 'center',
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lives: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: 'red',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TabOneScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Animated, Alert, ImageBackground } from "react-native";

// Définition des types pour les questions
interface Question {
  subject: string;
  verb: string;
  tense: string;
  options: string[];
  answer: string;
}

const ConjugaisonJeu: React.FC = () => {
  // Liste des questions avec sujet, verbe, temps, options et réponse correcte
  const questions: Question[] = [
    { subject: "Je", verb: "manger", tense: "présent", options: ["mange", "manges", "mangent", "mangé"], answer: "mange" },
    { subject: "Tu", verb: "aller", tense: "futur", options: ["iras", "irai", "ira", "iront"], answer: "iras" },
    { subject: "Il", verb: "être", tense: "présent", options: ["es", "sont", "est", "suis"], answer: "est" },
    { subject: "Nous", verb: "faire", tense: "imparfait", options: ["faisions", "faites", "faisaient", "ferons"], answer: "faisions" },
    { subject: "Vous", verb: "avoir", tense: "passé composé", options: ["avez eu", "aviez", "avons eu", "avez"], answer: "avez eu" },
    { subject: "Ils", verb: "parler", tense: "présent", options: ["parle", "parlent", "parlez", "parlaient"], answer: "parlent" },
    { subject: "Je", verb: "finir", tense: "futur", options: ["finiras", "finira", "finirai", "finirez"], answer: "finirai" },
    { subject: "Tu", verb: "venir", tense: "présent", options: ["viens", "vient", "venons", "viennent"], answer: "viens" },
    { subject: "Nous", verb: "prendre", tense: "imparfait", options: ["prendrons", "prenions", "prenons", "prenez"], answer: "prenions" },
    { subject: "Vous", verb: "voir", tense: "présent", options: ["voyez", "vois", "voit", "voient"], answer: "voyez" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lives, setLives] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [animation] = useState(new Animated.Value(0));
  const currentQuestion: Question = questions[currentQuestionIndex];

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
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback(score + 1 >= 10 ? "Félicitations ! Vous avez atteint le score maximum !" : "Bonne réponse !");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setFeedback("");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        <Text style={styles.title}>Conjugue le Verbe</Text>
        <Text style={styles.question}>Complétez la phrase :</Text>
        <Text style={styles.text}>{currentQuestion.subject} {currentQuestion.verb} ({currentQuestion.tense})</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
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
        {lives === 0 || currentQuestionIndex === questions.length - 1 ? (
          <Button onPress={resetGame} title="Recommencer" color="#8B4513" />
        ) : (
          <Button onPress={handleNextQuestion} title="Question suivante" color="#8B4513" />
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
  question: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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

export default ConjugaisonJeu;

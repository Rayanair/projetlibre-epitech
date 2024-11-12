import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const LandingPage = () => {
  const { param } = useLocalSearchParams();
  
  const images = [
    { src: require('../../assets/images/pirate-boat.png'), style: { top: 150, left: 130, zIndex: 1 }, route: '/' + param + '/' + param + '1' },
    { src: require('../../assets/images/pirate-boat.png'), style: { top: 150, right: 50, zIndex: 2 }, route: '/' + param + '/' + param + '2' },
  ];

  const [fontsLoaded] = useFonts({
    "Sunny-Spells": require("../../assets/fonts/Sunny_Spells.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground source={require('../../assets/images/bg-pirate.png')} style={styles.backgroundImage}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Study Quest</Text>
          </View>
          <View style={styles.container}>
            {images.map((image, index) => (
              <ImageComponent key={index} src={image.src} style={image.style} route={image.route} />
            ))}
          </View>
        </ImageBackground>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const ImageComponent = ({ src, style, route }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.imageWrapper, style, animatedStyle]}>
        <TouchableOpacity onPress={() => router.push(route)}>
          <Image source={src} style={styles.image} />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#ffd700', // Gold border to match pirate theme
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700', // Gold color to fit the pirate theme
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Sunny-Spells",
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: height * 1.2, // Make the background image taller than the screen for scrolling
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    position: 'absolute',
    width: 80,
    height: 80,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LandingPage;
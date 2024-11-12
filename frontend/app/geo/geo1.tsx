import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, GestureResponderEvent, LayoutChangeEvent } from 'react-native';

type CityCoordinates = {
  x: number;
  y: number;
};

type Cities = {
  [key: string]: CityCoordinates;
};

const cities: Cities = {
  Paris: { x: 41.8566, y: 25.3522 },
  Marseille: { x: 58.2965, y: 74.3698 },
  Lyon: { x: 57.7640, y: 51.8357 },
  Bordeaux: { x: 23.8378, y: 59.5792 },
};

export default function GameGeo() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<CityCoordinates | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [noSelectedCityStyle, setNoSelectedCityStyle] = useState<{ color: string }>({ color: 'black' });
  const [cityFinish, setCityFinish] = useState<string[]>([]);
  const [finishGame, setFinishGame] = useState<boolean>(false);

  const handleMapPress = (event: GestureResponderEvent) => {
    if (selectedCity) {
      const { locationX, locationY } = event.nativeEvent.touches[0];
      const xPercentage = (locationX / imageDimensions.width) * 100;
      const yPercentage = (locationY / imageDimensions.height) * 100;
      setUserLocation({ x: xPercentage, y: yPercentage });
    } else {
      setNoSelectedCityStyle({ color: 'red' });
    }
  };

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
  };

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setImageDimensions({ width, height });
  };

  useEffect(() => {
    if (selectedCity && userLocation) {
      const cityCoords = cities[selectedCity];
      const isCorrectLocation = 
        userLocation.x >= cityCoords.x - 5 &&
        userLocation.x <= cityCoords.x + 5 &&
        userLocation.y >= cityCoords.y - 5 &&
        userLocation.y <= cityCoords.y + 5;

      if (isCorrectLocation) {
        setCityFinish([...cityFinish, selectedCity]);
        setSelectedCity(null);
      }

      if (cityFinish.length + 1 === Object.keys(cities).length) {
        setFinishGame(true);
      }
    }
  }, [userLocation, selectedCity, cityFinish]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={handleMapPress}>
        <Image source={require('../../assets/images/carteFrance.png')} style={styles.country} onLayout={handleImageLayout} />
      </TouchableOpacity>
      {finishGame ? (
        <Text>Bravo, vous avez gagné !</Text>
      ) : (
        <>
          {selectedCity ? (
            <Text>{`Vous avez sélectionné: ${selectedCity}`}</Text>
          ) : (
            <Text style={{ ...styles.noSelectedCity, ...noSelectedCityStyle }}>Sélectionnez une ville sur la carte</Text>
          )}
        </>
      )}
      <View style={styles.cityOptions}>
        {Object.keys(cities).map((cityName) => (
          !cityFinish.includes(cityName) && (
            <TouchableOpacity key={cityName} onPress={() => handleCitySelection(cityName)}>
              <Text style={styles.cityOption}>{cityName}</Text>
            </TouchableOpacity>
          )
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  country: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  noSelectedCity: {
    color: 'black',
  },
  cityOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  cityOption: {
    margin: 5,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});
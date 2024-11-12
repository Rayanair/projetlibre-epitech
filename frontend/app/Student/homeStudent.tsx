import React from 'react';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { ImageBackground, View, Text, ScrollView } from 'react-native';
import ProfilBubble from '../component/profilbulle';
import InfoBubble from '../component/infobulle';
import axios from 'axios';

const Subjects: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string, param: string) => {
    router.push({ pathname: route, params: { param: param } });
  };
  

  return (
    <BackgroundImage source={require('../../assets/images/cartetresor.png')} resizeMode="cover">
      <SubjectsContainer>
        <ProfilBubble />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Title>Choisis ta Matière, Pirate!</Title>
          <SubjectsGrid>
            <SubjectBlock onPress={() => handleNavigation('/Student/matiere', "maths")}>
            <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
              <BackgroundContainer>
                <BlockBackgroundImage source={require('../../assets/images/pirate who does 94f45a61-d10f-4167-840f-b1cc2fc2614c.png')} />
                <TextContainer>
                  <SubjectTitle>Mathématiques</SubjectTitle>
                  <SubjectDescription>Maîtrise les chiffres comme un véritable corsaire!</SubjectDescription>
                </TextContainer>
              </BackgroundContainer>
            </SubjectBlock>
            <SubjectBlock onPress={() => handleNavigation('/Student/matiere', "francais")}>
            <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
              <BackgroundContainer>
                <BlockBackgroundImage source={require('../../assets/images/pirate_francais.jpg')} />
                <TextContainer>
                  <SubjectTitle>Français</SubjectTitle>
                  <SubjectDescription>Domine la langue des océans!</SubjectDescription>
                </TextContainer>
              </BackgroundContainer>
            </SubjectBlock>
            <SubjectBlock onPress={() => handleNavigation('/Student/matiere', 'geo')}>
            <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
              <BackgroundContainer>
                <BlockBackgroundImage source={require('../../assets/images/pirate_geo.jpg')} />
                <TextContainer>
                  <SubjectTitle>Géographie</SubjectTitle>
                  <SubjectDescription>Explore le monde comme un véritable pirate!</SubjectDescription>
                </TextContainer>
              </BackgroundContainer>
            </SubjectBlock>
            <SubjectBlock onPress={() => handleNavigation('/Student/matiere', "cg")}>
            <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
              <BackgroundContainer>
                <BlockBackgroundImage source={require('../../assets/images/pirate_cg.png')} />
                <TextContainer>
                  <SubjectTitle>Culture Générale</SubjectTitle>
                  <SubjectDescription>Découvre de divers trésors</SubjectDescription>
                </TextContainer>
              </BackgroundContainer>
            </SubjectBlock>
            <SubjectBlock onPress={() => handleNavigation('/Student/classe', "test")}>
            <InfoBubble infoText="Ceci est une information importante que vous devez connaître." />
              <BackgroundContainer>
                <BlockBackgroundImage source={require('../../assets/images/pirate_cg.png')} />
                <TextContainer>
                  <SubjectTitle>Culture Générale</SubjectTitle>
                  <SubjectDescription>Découvre de divers trésors</SubjectDescription>
                </TextContainer>
              </BackgroundContainer>
            </SubjectBlock>
          </SubjectsGrid>
        </ScrollView>
      </SubjectsContainer>
    </BackgroundImage>
  );
};

// Styles
const SubjectsContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  margin: 20px 0;
  color: black;
  text-shadow: 2px 2px #000;
  text-align: center;
`;

const SubjectsGrid = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubjectBlock = styled.TouchableOpacity`
  border: 2px solid #000;
  border-radius: 15px;
  width: 100%;
  height: 300px;
  box-shadow: 5px 5px 15px #000;
  elevation: 5;
  margin-bottom: 20px;
  overflow: hidden;
`;

const BackgroundContainer = styled.View`
  flex: 1;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
`;

const BlockBackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
`;

const TextContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 2;
`;

const SubjectTitle = styled.Text`
  font-size: 20px;
  color: white;
`;

const SubjectDescription = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  color: white;
`;

export default Subjects;

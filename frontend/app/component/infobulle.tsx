import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';

type Props = {
  infoText: string;
};

const InfoBubble: React.FC<Props> = ({ infoText }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("Bulle cliquée");
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity style={styles.bubble} onPress={toggleModal}>
        <Image source={require('../../assets/images/info.png')} style={styles.icon} />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{infoText}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
});

export default InfoBubble;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from './Flashcard';

const FlashcardScreen = () => {
  return (
    <View style={styles.container}>
      <Flashcard question="Apple" answer="ringo" />
      <Flashcard question="Banana" answer="banana" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default FlashcardScreen;
  
  
  
  
  
  
  
  
  
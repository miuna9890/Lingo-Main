import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from './Flashcard';
import FlashcardQnsData from './FlashcardQnsData';

const FlashcardScreen = ({route}) => {
  const { category } = route.params;
  const cards = FlashcardQnsData[category];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Flashcard key={index} question={card.question} answer={card.answer} imageUrl={card.imageUrl} />
      ))}
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
  
  
  
  
  
  
  
  
  
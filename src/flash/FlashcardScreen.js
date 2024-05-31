import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from './Flashcard';
import Swiper from 'react-native-deck-swiper'; // Import Swiper
import FlashcardQnsData from './FlashcardQnsData';

const FlashcardScreen = ({ route }) => {
  const { category } = route.params;
  const cards = FlashcardQnsData[category];

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards} //the data set
        renderCard={(card) => <Flashcard question={card.question} answer={card.answer} imageUrl={card.imageUrl} />}
        onSwiped={() => {}}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={2} //num of cards in stack
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
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

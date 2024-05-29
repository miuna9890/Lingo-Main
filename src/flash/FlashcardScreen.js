import React from 'react';
import { View, StyleSheet } from 'react-native';
import Flashcard from './Flashcard';

const flashcards = {
  Fruits: [
    { question: 'Apple', answer: 'ringo',  imageUrl: 'https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg' },
    { question: 'Banana', answer: 'banana', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrYhu9yuMOM-HWBIeYqA89H6Bqf9ccB1Eumw&s' },
  ],
  Alphabets: [
    { question: 'A', answer: 'あ(a)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Unicode_0x0041.svg/1200px-Unicode_0x0041.svg.png' },
    { question: 'B', answer: 'び (bī)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Unicode_0x0042.svg/800px-Unicode_0x0042.svg.png' },
  ],
  Animals: [
    { question: 'Dog', answer: '犬(inu)', imageUrl: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg' },
    { question: 'Cat', answer: '猫(neko)', imageUrl: 'https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg' },
  ],
};


const FlashcardScreen = ({route}) => {
  const { category } = route.params;
  const cards = flashcards[category];

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
  
  
  
  
  
  
  
  
  
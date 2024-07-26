import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';

const FlashcardScreen = ({ route, navigation }) => {
  const { category, language } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0); //keep track of the card


  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const { data, error } = await supabase
          .from('flashcards')
          .select('*')
          .eq('category', category) //filter by category
          .eq('language', language); //filter by language

        if (error) {
          console.error('Error fetching flashcards:', error.message);
        } else {
          setFlashcards(data);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error.message);
      }
    }

    fetchFlashcards();
  }, [category, language]);

  const handleNext = async () => { //function to handle the next button
    if (currentCard < flashcards.length - 1) { //within limit?
      setCurrentCard(currentCard + 1); //move to next
    } else { //end of flascard deck, update the lesson as completed
      navigation.navigate('Home'); // Navigate back to Home with updated lesson count
    }
  };

  const handlePrev = () => { //function to handle the previous button
    if (currentCard > 0) { //within limit?
      setCurrentCard(currentCard - 1); //move to previous
    }
  };

  const currentFlashCard = flashcards[currentCard]; //start from beginning

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{language} {category} Flashcards </Text>
      {/* Render the current flashcard if it exists */}
      {currentFlashCard && (
        <View style={styles.card}>
          <Text style={styles.question}>{currentFlashCard.question}</Text>
           {/* Render image if it exists */}
          {currentFlashCard.imageurl ? (
            <Image source={{ uri: currentFlashCard.imageurl }} style={styles.image} />
          ) : null}
          <Text style={styles.answer}>{currentFlashCard.answer}</Text>
        </View>
      )}
      {/* Navigation buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: '#E91E63',
  },card: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowRadius: 2,
    elevation: 2, // Elevation for Android
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    color: '#333',  // Dark gray text color
    marginBottom: 10,
  },
  answer: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  navigation: {
    flexDirection: 'row', // Layout buttons in a row
    justifyContent: 'space-between',
    width: '80%',
  },
  navButton: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FlashcardScreen; 

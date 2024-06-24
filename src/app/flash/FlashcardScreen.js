import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofuxcybiaalpnafsswou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXhjeWJpYWFscG5hZnNzd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTA5MzUsImV4cCI6MjAzMjgyNjkzNX0.RujmbMzYZv7V4vvUx06w8Z5e5NejLA8H_ZCs6hDYkOI';
const supabase = createClient(supabaseUrl, supabaseKey);


const FlashcardScreen = ({ route, navigation }) => {
  const { category, language } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0); //keep track of the card
  const [lessonsCompleted, setLessonsCompleted] = useState(0); // State to track lessons completed

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

  //fetch data from supabase table

  //display existing profile when sign in
  useEffect(() => {
    async function fetchProgress() {
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('lessons_completed')
        .single(); // Fetching the single profile for the current user

        if (error) {
          console.error('Error fetching progress:', error.message);
        } else {
          setLessonsCompleted(data?.lessons_completed || 0);
        }
      } catch (error) {
        console.error('Error fetching progress:', error.message);
      }
    }

    fetchProgress();
  }, []);

  const handleNext = async () => { //function to handle the next button
    if (currentCard < flashcards.length - 1) { //within limit?
      setCurrentCard(currentCard + 1); //move to next
    } else { //end of flascard deck, update the lesson as completed
      await updateProgress(); // Update progress when reaching the end of flashcards
      navigation.navigate('Home', { lessonsCompleted: lessonsCompleted + 1 }); // Navigate back to Home with updated lesson count
    }
  };

  const handlePrev = () => { //function to handle the previous button
    if (currentCard > 0) { //within limit?
      setCurrentCard(currentCard - 1); //move to previous
    }
  };

  const updateProgress = async () => {
    try {
      // Fetch the user profile to get the user ID
    const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('user_id')
    .single();

  if (profileError) {
    throw new Error('Error fetching user profile');
  }
  const { id: user_id } = profile;
   // Upsert (insert or update) the progress record for the user
      const { error } = await supabase
        .from('progress') //from the supabase table progress
        .upsert({user_id, lessons_completed: lessonsCompleted + 1}) // Increment lessons completed
        .eq('user_id', user_id); // Specify the WHERE clause here

      if (error) {
        console.error('Error updating progress:', error.message);
      }
    } catch (error) {
      console.error('Error updating progress:', error.message);
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

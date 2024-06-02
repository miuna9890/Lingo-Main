import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Image} from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofuxcybiaalpnafsswou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXhjeWJpYWFscG5hZnNzd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTA5MzUsImV4cCI6MjAzMjgyNjkzNX0.RujmbMzYZv7V4vvUx06w8Z5e5NejLA8H_ZCs6hDYkOI';
const supabase = createClient(supabaseUrl, supabaseKey);


const FlashcardScreen = ({ route }) => {
  const { category, language } = route.params;
  const [flashcards, setFlashcards] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{language} {category} </Text>
      <FlatList
      data = {flashcards} //data
      keyExtractor={(item) => item.question}
      renderItem={({item}) => (
        <View>
        <Text style={styles.categoryText}>{item.question}</Text>
        <Image source={{ uri: item.imageurl }} style={styles.image} />
        <Text style={styles.categoryText}>{item.answer}</Text>
        </View>

  )}
  contentContainerStyle={styles.listContent}
  />
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
  },
  categoryButton: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
  listContent: {
    width: '100%',  // Ensure the FlatList content takes up the full width
  },
  image: {
    width: 100, 
    height: 100,
    marginBottom: 10, 
  },
});

export default FlashcardScreen; 

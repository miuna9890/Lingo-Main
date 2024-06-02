import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofuxcybiaalpnafsswou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXhjeWJpYWFscG5hZnNzd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTA5MzUsImV4cCI6MjAzMjgyNjkzNX0.RujmbMzYZv7V4vvUx06w8Z5e5NejLA8H_ZCs6hDYkOI';
const supabase = createClient(supabaseUrl, supabaseKey);

const Quizzes = ({route, navigation }) => {
  const { languages } = route.params;
  const [QuizcategoryList, setQuizCategoryList] = useState([]);

  useEffect(() => {
      async function fetchCategories() {
          const { data, error } = await supabase.from('quizcategory').select('*').eq('language', languages);
          if (error) {
              console.error('Error fetching categories:', error.message);
          } else {
              setQuizCategoryList(data);
          }
      }

      fetchCategories();

  }, [languages]); //filter by language

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Quiz yourself! </Text>
        <Text style={styles.title}> {languages} Choose a Category </Text>
        <FlatList
        data = {QuizcategoryList}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
        <TouchableOpacity
        style = {styles.categoryButton}
        onPress={() => navigation.navigate(item.screen, {category: item.category_name, language: languages})}
        >
          <Text style={styles.categoryText}>{item.category_name}</Text>
        </TouchableOpacity>
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
      padding: 20
    },
    title: {
      fontSize: 24,
      marginBottom: 30,
      fontWeight: "bold",
      marginTop: 20,
      color: '#E91E63',
      textAlign: "center"
    },
    categoryButton: {
      backgroundColor: '#E91E63',
      paddingVertical: 15, // Increase vertical padding
    paddingHorizontal: 20, // Increase horizontal padding
    borderRadius: 10, // Add border radius for rounded corners
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
  });
  
  export default Quizzes; 
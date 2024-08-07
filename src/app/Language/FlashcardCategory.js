import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';

const FlashcardCategory = ({ route, navigation }) => {
    const { languages } = route.params;
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase.from('categories').select('*').eq('language', languages);
            if (error) {
                console.error('Error fetching categories:', error.message);
            } else {
                setCategoryList(data);
            }
        }

        fetchCategories();

    }, [languages]);

    //fetch data from supabase table

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{languages} Categories </Text>
        <FlatList
        data = {categoryList}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
        <TouchableOpacity
        style = {styles.categoryButton}
        onPress={() => navigation.navigate(item.screen, {category: item.name, language: languages})}
        >
          <Text style={styles.categoryText}>{item.name}</Text>
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
  });
  
  export default FlashcardCategory; 
 
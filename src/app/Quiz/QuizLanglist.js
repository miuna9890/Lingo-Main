import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';

const QuizLanglist = ({navigation}) => {
  const [languageList, setLanguageList] = useState([]);
  useEffect(() => {
    async function fetchLanguages() {
      const { data, error } = await supabase.from('quizlanguages').select('*');
      if (error) {
        console.error('Error fetching languages:', error.message);
      } else {
        setLanguageList(data);
      }
    }

    fetchLanguages();
  }, []);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Langauge!</Text>
        <FlatList
        data = {languageList}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
        <TouchableOpacity
        style = {styles.languageButton}
        onPress={() => navigation.navigate(item.screen, {languages: item.name})}
        >
          <Text style={styles.languageText}>{item.name}</Text>
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
    languageButton: {
      backgroundColor: '#E91E63',
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
    },
    languageText: {
      color: 'white',
      fontSize: 30,
      marginBottom: 20,
    },
    listContent: {
      width: '100%',  // Ensure the FlatList content takes up the full width
    },
  });
  
  export default QuizLanglist; 
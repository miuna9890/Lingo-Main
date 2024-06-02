import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofuxcybiaalpnafsswou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdXhjeWJpYWFscG5hZnNzd291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNTA5MzUsImV4cCI6MjAzMjgyNjkzNX0.RujmbMzYZv7V4vvUx06w8Z5e5NejLA8H_ZCs6hDYkOI';
const supabase = createClient(supabaseUrl, supabaseKey);


const Language = ({navigation}) => {
  const [languageList, setLanguageList] = useState([]);
  useEffect(() => {
    async function fetchLanguages() {
      const { data, error } = await supabase.from('languages').select('*');
      if (error) {
        console.error('Error fetching languages:', error.message);
      } else {
        setLanguageList(data);
      }
    }

    fetchLanguages();
  }, []);

  //fetching data from supabase table(languages) with id, name:langauge screen:category

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Langauge!</Text>
        
        <FlatList
        data = {languageList} //data is the list of languages
        keyExtractor={(item) => item.name}
        renderItem={({item}) => ( //for every item, its a button that navigates to the category screen
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
  
  export default Language; 
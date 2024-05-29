import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const categories = [
        { name: 'Fruits', screen: 'Quiz' },
        { name: 'Alphabets', screen: 'Quiz' },
        { name: 'Animals', screen: 'Quiz' },
      ];

const Quizzes = ({route, navigation }) => {
  const { languages } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Quiz yourself! </Text>
        <Text style={styles.title}> {languages} Choose a Category </Text>
        <FlatList
        data = {categories}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
        <TouchableOpacity
        style = {styles.categoryButton}
        onPress={() => navigation.navigate(item.screen, {category: item.name})}
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
  
  export default Quizzes; 
 

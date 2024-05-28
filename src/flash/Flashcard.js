import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

 const Flashcard = ({ question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);
  
    const toggleAnswer = () => {
      setShowAnswer(!showAnswer);
    };
  
    return (
      <TouchableOpacity onPress={toggleAnswer} style={styles.card}>
        <View style={styles.cardContent}>
        <Text style={styles.text}>{showAnswer ? answer : question}</Text>
        </View>
      </TouchableOpacity>
      
    );
  };



  const styles = StyleSheet.create({
    card: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
      borderRadius: 10,
      padding: 5,
      margin: 10,
      width: "100%",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 50,
      textAlign: 'center',
      fontWeight: "bold",
      color: "#E91E63"
    },
  });
  
  export default Flashcard;
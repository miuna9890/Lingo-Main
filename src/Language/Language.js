import React from 'react';
import { View, Text, Button } from 'react-native';
const Language = ({navigation}) => {
    return (
      <View>
        <Text>Welcome to New Language!</Text>
        <Button
        title="Go to Flashcards"
        onPress={() => navigation.navigate('Flashcards')}
      />
      </View>
    );
  };
  
  export default Language; 
 

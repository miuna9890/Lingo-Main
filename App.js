import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import FlashcardScreen from './src/flash/FlashcardScreen'
import Quizzes from './src/Quiz/Quizzes'
import Language from './src/Language/Language'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>

     <Stack.Navigator initialRouteName="Login">

     <Stack.Screen name="Login" component={LoginScreen} />
     <Stack.Screen name ="Home" component={HomeScreen} />
     <Stack.Screen name ="Flashcards" component={FlashcardScreen} />
     <Stack.Screen name ="Quizzes" component={Quizzes} />
     <Stack.Screen name ="New Language" component={Language} />

      </Stack.Navigator>

      </NavigationContainer>
  );
};

export default App;
